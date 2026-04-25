'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Volume2, VolumeX, Play, Pause, Loader2 } from 'lucide-react';

interface AIResponseProps {
  response: string;
  isLoading: boolean;
  onPlayTTS: (text: string) => Promise<void>;
}

export default function AIResponse({ response, isLoading, onPlayTTS }: AIResponseProps) {
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayTTS = async () => {
    if (isPlayingTTS || !response.trim()) return;

    try {
      setIsPlayingTTS(true);
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }

      const ttsResponse = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: response.trim() }),
      });

      if (!ttsResponse.ok) {
        throw new Error('TTS 생성 실패');
      }

      const audioBlob = await ttsResponse.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlayingTTS(false);
      };

      audio.onerror = () => {
        setIsPlayingTTS(false);
        console.error('오디오 재생 실패');
      };

      await audio.play();

    } catch (error) {
      console.error('TTS 재생 실패:', error);
      setIsPlayingTTS(false);
      alert('음성 재생에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleStopTTS = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlayingTTS(false);
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-center text-muted-foreground">
              AI가 답변을 생성하고 있습니다...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!response) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>AI 치과 상담사</span>
          <div className="flex space-x-2">
            {!isPlayingTTS ? (
              <Button
                onClick={handlePlayTTS}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Volume2 className="w-4 h-4" />
                <span>음성으로 듣기</span>
              </Button>
            ) : (
              <Button
                onClick={handleStopTTS}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <VolumeX className="w-4 h-4" />
                <span>정지</span>
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {response}
          </div>
        </div>
        
        {isPlayingTTS && (
          <div className="mt-4 flex items-center space-x-2 text-primary">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm font-medium">음성 재생 중...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}