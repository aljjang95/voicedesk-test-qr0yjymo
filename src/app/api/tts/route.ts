import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const TTSRequestSchema = z.object({
  text: z.string().min(1, '텍스트가 필요합니다').max(1000, '텍스트가 너무 깁니다'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = TTSRequestSchema.parse(body);

    if (!text.trim()) {
      return NextResponse.json(
        { success: false, error: '텍스트가 비어있습니다.' },
        { status: 400 }
      );
    }

    try {
      const ttsResponse = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY || 'dummy-key'}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'tts-1',
          input: text,
          voice: 'nova',
          response_format: 'mp3',
          speed: 1.0,
        }),
      });

      if (!ttsResponse.ok) {
        console.log('OpenAI TTS 사용 불가, 더미 오디오 생성');
        
        const dummyAudioBuffer = generateDummyAudio(text.length);
        
        return new NextResponse(dummyAudioBuffer, {
          status: 200,
          headers: {
            'Content-Type': 'audio/wav',
            'Content-Length': dummyAudioBuffer.byteLength.toString(),
          },
        });
      }

      const audioBuffer = await ttsResponse.arrayBuffer();
      
      return new NextResponse(audioBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Length': audioBuffer.byteLength.toString(),
        },
      });

    } catch (ttsError) {
      console.log('TTS 처리 중 오류, 더미 오디오 생성:', ttsError);
      
      const dummyAudioBuffer = generateDummyAudio(text.length);
      
      return new NextResponse(dummyAudioBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'audio/wav',
          'Content-Length': dummyAudioBuffer.byteLength.toString(),
        },
      });
    }

  } catch (error) {
    console.error('TTS API 오류:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'TTS 서비스를 이용할 수 없습니다.' },
      { status: 500 }
    );
  }
}

function generateDummyAudio(textLength: number): ArrayBuffer {
  const sampleRate = 22050;
  const duration = Math.max(1, Math.min(10, textLength * 0.1)); 
  const numSamples = Math.floor(sampleRate * duration);
  
  const headerSize = 44;
  const buffer = new ArrayBuffer(headerSize + numSamples * 2);
  const view = new DataView(buffer);
  
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, numSamples * 2, true);
  
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const frequency = 440 + (t * 100); 
    const amplitude = Math.max(0, 1 - t / duration); 
    const sample = Math.sin(2 * Math.PI * frequency * t) * amplitude;
    const intSample = Math.floor(sample * 32767);
    view.setInt16(headerSize + i * 2, intSample, true);
  }
  
  return buffer;
}