'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import VoiceRecorder from '@/components/voice-recorder';
import AIResponse from '@/components/ai-response';
import { Phone, MessageCircle, Clock, Shield } from 'lucide-react';

export default function HomePage() {
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{
    type: 'user' | 'ai';
    content: string;
    timestamp: Date;
  }>>([]);

  const handleRecordingComplete = async (audioBlob: Blob) => {
    setIsProcessing(true);
    setAiResponse('');

    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');

      const response = await fetch('/api/voice-consultation', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('음성 처리 실패');
      }

      const data = await response.json();
      
      if (data.success && data.response) {
        setAiResponse(data.response);
        
        setConversationHistory(prev => [
          ...prev,
          {
            type: 'user',
            content: data.transcription || '음성 메시지',
            timestamp: new Date(),
          },
          {
            type: 'ai',
            content: data.response,
            timestamp: new Date(),
          },
        ]);
      } else {
        throw new Error(data.error || '응답 생성 실패');
      }

    } catch (error) {
      console.error('음성 상담 처리 실패:', error);
      setAiResponse('죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePlayTTS = async (text: string) => {
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('TTS 생성 실패');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      await audio.play();
      
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };

    } catch (error) {
      console.error('TTS 재생 실패:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            치과 AI 음성 상담 봇
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            치과 관련 궁금한 점을 음성으로 질문하고 전문적인 답변을 받아보세요
          </p>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Phone className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">음성 상담</h3>
                <p className="text-sm text-gray-600">
                  자연스러운 음성으로 질문하고 답변을 받으세요
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <MessageCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">전문적인 답변</h3>
                <p className="text-sm text-gray-600">
                  AI가 치과 전문 지식을 바탕으로 답변합니다
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">24시간 이용</h3>
                <p className="text-sm text-gray-600">
                  언제든지 궁금한 점을 질문할 수 있습니다
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {/* Voice Recorder */}
            <div className="flex justify-center">
              <VoiceRecorder
                onRecordingComplete={handleRecordingComplete}
                isProcessing={isProcessing}
              />
            </div>

            {/* AI Response */}
            <AIResponse
              response={aiResponse}
              isLoading={isProcessing}
              onPlayTTS={handlePlayTTS}
            />

            {/* Conversation History */}
            {conversationHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>대화 기록</CardTitle>
                  <CardDescription>
                    최근 상담 내용을 확인하실 수 있습니다
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {conversationHistory.map((item, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          item.type === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            item.type === 'user'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{item.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {item.timestamp.toLocaleTimeString('ko-KR')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Disclaimer */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-yellow-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">주의사항</h4>
                    <p className="text-sm text-yellow-700 leading-relaxed">
                      본 서비스는 일반적인 치과 정보 제공을 목적으로 합니다. 
                      정확한 진단과 치료를 위해서는 반드시 치과를 방문하여 전문의와 상담받으시기 바랍니다. 
                      응급상황 시에는 즉시 응급실이나 치과 응급실을 방문하세요.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}