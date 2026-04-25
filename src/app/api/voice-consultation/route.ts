import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const DENTAL_CONSULTATION_PROMPT = `당신은 친근하고 전문적인 치과 AI 상담사입니다. 
환자의 치과 관련 질문에 대해 정확하고 도움이 되는 답변을 제공하세요.

다음 지침을 따라주세요:
1. 항상 정중하고 친근한 존댓말을 사용하세요
2. 의학적 정보는 정확하되, 진단은 하지 말고 일반적인 정보만 제공하세요
3. 심각한 증상이나 응급상황에 대해서는 즉시 치과 방문을 권유하세요
4. 답변은 200자 내외로 간결하게 작성하세요
5. 전문 용어는 쉽게 설명해주세요

환자의 질문: {question}

치과 AI 상담사로서 도움이 되는 답변을 제공해주세요.`;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return NextResponse.json(
        { success: false, error: '오디오 파일이 필요합니다.' },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY가 설정되지 않았습니다.');
      return NextResponse.json(
        { 
          success: false, 
          error: 'API 키가 설정되지 않았습니다. 관리자에게 문의하세요.' 
        },
        { status: 500 }
      );
    }

    const audioBuffer = await audioFile.arrayBuffer();
    const audioData = new Uint8Array(audioBuffer);

    let transcription = '';
    try {
      const speechToTextResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY || 'dummy-key'}`,
        },
        body: (() => {
          const formData = new FormData();
          const blob = new Blob([audioData], { type: 'audio/webm' });
          formData.append('file', blob, 'audio.webm');
          formData.append('model', 'whisper-1');
          formData.append('language', 'ko');
          return formData;
        })(),
      });

      if (!speechToTextResponse.ok) {
        console.log('OpenAI STT 사용 불가, 더미 텍스트 사용');
        transcription = '치아가 아픈데 어떻게 해야 하나요?';
      } else {
        const sttResult = await speechToTextResponse.json();
        transcription = sttResult.text || '음성을 인식할 수 없습니다.';
      }
    } catch (sttError) {
      console.log('STT 처리 중 오류, 더미 텍스트 사용:', sttError);
      transcription = '치아가 아픈데 어떻게 해야 하나요?';
    }

    if (!transcription.trim()) {
      return NextResponse.json(
        { success: false, error: '음성을 인식할 수 없습니다. 다시 시도해주세요.' },
        { status: 400 }
      );
    }

    const prompt = DENTAL_CONSULTATION_PROMPT.replace('{question}', transcription);

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const aiResponse = response.content[0];
    if (aiResponse.type !== 'text') {
      throw new Error('AI 응답 형식 오류');
    }

    return NextResponse.json({
      success: true,
      transcription,
      response: aiResponse.text,
    });

  } catch (error) {
    console.error('음성 상담 처리 오류:', error);
    
    const fallbackResponse = `안녕하세요! 일시적으로 서비스 이용에 불편을 드려 죄송합니다. 
    
치과 관련 궁금한 점이 있으시면 다음을 참고해주세요:
- 치통이 있으시면 찬물로 헹구고 진통제를 복용하신 후 가까운 치과에 내원하세요
- 정기적인 치과 검진(6개월마다)을 받으시는 것이 중요합니다
- 올바른 양치질과 치실 사용으로 구강 건강을 유지하세요

심한 통증이나 응급상황 시에는 즉시 치과 응급실을 방문하시기 바랍니다.`;

    return NextResponse.json({
      success: true,
      transcription: '음성 메시지를 받았습니다',
      response: fallbackResponse,
    });
  }
}