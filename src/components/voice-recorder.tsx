'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Square, Play, Pause, Volume2 } from 'lucide-react';
import { cn, formatTime } from '@/lib/utils';

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  onTranscriptionReceived?: (response: string) => void;
  isProcessing: boolean;
}

export default function VoiceRecorder({ 
  onRecordingComplete, 
  onTranscriptionReceived,
  isProcessing 
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [hasRecording, setHasRecording] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        }
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        setHasRecording(true);
        
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      setRecordingTime(0);

      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('음성 녹음을 시작할 수 없습니다:', error);
      alert('음성 녹음을 시작할 수 없습니다. 마이크 권한을 확인해주세요.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const playAudio = () => {
    if (audioUrl) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);
      audio.onended = () => setIsPlaying(false);

      audio.play().catch(console.error);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const sendRecording = () => {
    if (audioBlob) {
      onRecordingComplete(audioBlob);
    }
  };

  const resetRecording = () => {
    setAudioBlob(null);
    setHasRecording(false);
    setRecordingTime(0);
    setIsPlaying(false);
    
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6 space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">음성 녹음</h3>
          <p className="text-sm text-muted-foreground">
            {isRecording 
              ? '녹음 중... 말씀해주세요' 
              : hasRecording 
                ? '녹음이 완료되었습니다' 
                : '버튼을 눌러 녹음을 시작하세요'}
          </p>
        </div>

        {/* Recording Timer */}
        {(isRecording || hasRecording) && (
          <div className="text-center">
            <div className={cn(
              'text-2xl font-mono',
              isRecording && 'text-red-500'
            )}>
              {formatTime(recordingTime)}
            </div>
          </div>
        )}

        {/* Recording Controls */}
        <div className="flex justify-center space-x-2">
          {!isRecording && !hasRecording && (
            <Button
              onClick={startRecording}
              disabled={isProcessing}
              size="lg"
              className="flex items-center space-x-2"
            >
              <Mic className="w-5 h-5" />
              <span>녹음 시작</span>
            </Button>
          )}

          {isRecording && (
            <Button
              onClick={stopRecording}
              variant="destructive"
              size="lg"
              className="flex items-center space-x-2"
            >
              <Square className="w-5 h-5" />
              <span>녹음 중지</span>
            </Button>
          )}
        </div>

        {/* Playback Controls */}
        {hasRecording && !isRecording && (
          <div className="space-y-3">
            <div className="flex justify-center space-x-2">
              <Button
                onClick={isPlaying ? pauseAudio : playAudio}
                variant="outline"
                size="sm"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>
              <Button onClick={resetRecording} variant="outline" size="sm">
                다시 녹음
              </Button>
            </div>

            <Button
              onClick={sendRecording}
              disabled={isProcessing}
              className="w-full flex items-center space-x-2"
              size="lg"
            >
              <Volume2 className="w-5 h-5" />
              <span>{isProcessing ? '처리 중...' : 'AI 상담 받기'}</span>
            </Button>
          </div>
        )}

        {/* Recording Indicator */}
        {isRecording && (
          <div className="flex justify-center">
            <div className="flex items-center space-x-2 text-red-500">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">녹음 중</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}