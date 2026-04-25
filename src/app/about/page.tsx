import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Target, Award, Heart } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              홈으로 돌아가기
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            치과 AI 음성 상담 봇 소개
          </h1>
          <p className="text-xl text-gray-600">
            최신 AI 기술로 치과 상담을 더욱 쉽고 편리하게
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="w-6 h-6 text-red-500 mr-2" />
              우리의 미션
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">
              치과 AI 음성 상담 봇은 누구나 쉽게 치과 관련 정보를 얻을 수 있도록 도와드립니다. 
              음성 인식과 AI 기술을 활용하여 24시간 언제든지 치과 상담을 받을 수 있는 
              혁신적인 서비스를 제공합니다.
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-6 h-6 text-blue-500 mr-2" />
                사용자 중심 설계
              </CardTitle>
              <CardDescription>
                모든 연령층이 쉽게 사용할 수 있는 직관적인 인터페이스
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• 간단한 버튼 클릭으로 음성 녹음</li>
                <li>• 명확하고 이해하기 쉬운 답변 제공</li>
                <li>• 모바일 최적화된 반응형 디자인</li>
                <li>• 음성으로 답변을 들을 수 있는 TTS 기능</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-6 h-6 text-green-500 mr-2" />
                전문성과 정확성
              </CardTitle>
              <CardDescription>
                치과 전문 지식을 바탕으로 한 신뢰할 수 있는 정보 제공
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Claude AI를 활용한 정확한 답변 생성</li>
                <li>• 치과 전문 프롬프트 최적화</li>
                <li>• 안전하고 신뢰할 수 있는 의료 정보</li>
                <li>• 응급상황 시 적절한 조치 안내</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Technology Stack */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-6 h-6 text-purple-500 mr-2" />
              기술 스택
            </CardTitle>
            <CardDescription>
              최신 웹 기술과 AI를 활용한 안정적인 서비스
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">프론트엔드</h4>
                <ul className="text-sm space-y-1">
                  <li>• Next.js 15</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• React Hooks</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">백엔드</h4>
                <ul className="text-sm space-y-1">
                  <li>• Next.js API Routes</li>
                  <li>• Zod 입력 검증</li>
                  <li>• RESTful API 설계</li>
                  <li>• 서버사이드 처리</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">AI & 음성</h4>
                <ul className="text-sm space-y-1">
                  <li>• Claude 3.5 Sonnet</li>
                  <li>• Web Speech API</li>
                  <li>• 음성-텍스트 변환</li>
                  <li>• 텍스트-음성 변환</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-800">면책사항</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-yellow-700 space-y-2">
              <p>
                • 본 서비스는 일반적인 치과 정보 제공 목적으로 개발되었으며, 
                전문적인 의료 진단이나 치료를 대체하지 않습니다.
              </p>
              <p>
                • 정확한 진단과 치료를 위해서는 반드시 치과 전문의와 직접 상담받으시기 바랍니다.
              </p>
              <p>
                • 응급상황이나 심각한 증상이 있는 경우 즉시 응급실이나 치과 응급실을 방문하세요.
              </p>
              <p>
                • 서비스 이용 중 발생한 문제에 대해서는 관리자에게 문의해주세요.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link href="/">
            <Button size="lg" className="text-lg px-8 py-3">
              음성 상담 받기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}