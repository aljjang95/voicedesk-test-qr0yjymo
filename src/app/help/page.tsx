import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, HelpCircle, Mic, Volume2, MessageCircle, Settings } from 'lucide-react';
import Link from 'next/link';

export default function HelpPage() {
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
            도움말 및 사용 가이드
          </h1>
          <p className="text-xl text-gray-600">
            치과 AI 음성 상담 봇 사용법을 알아보세요
          </p>
        </div>

        {/* Quick Start Guide */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="w-6 h-6 text-blue-500 mr-2" />
              빠른 시작 가이드
            </CardTitle>
            <CardDescription>
              3단계로 간단하게 음성 상담을 받아보세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold mb-2">녹음 시작</h3>
                <p className="text-sm text-gray-600">
                  '녹음 시작' 버튼을 클릭하고 치과 관련 질문을 말씀하세요
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="font-semibold mb-2">녹음 완료</h3>
                <p className="text-sm text-gray-600">
                  질문을 마치면 '녹음 중지' 버튼을 누르고 'AI 상담 받기'를 클릭하세요
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="font-semibold mb-2">답변 확인</h3>
                <p className="text-sm text-gray-600">
                  AI의 전문적인 답변을 텍스트 또는 음성으로 확인하세요
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Instructions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mic className="w-6 h-6 text-red-500 mr-2" />
                음성 녹음 사용법
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">녹음 시작하기</h4>
                <p className="text-sm text-gray-600 mb-2">
                  1. '녹음 시작' 버튼을 클릭합니다
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  2. 마이크 권한 요청이 나타나면 '허용'을 선택합니다
                </p>
                <p className="text-sm text-gray-600">
                  3. 빨간색 녹음 표시등이 나타나면 말씀을 시작하세요
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">효과적인 질문하기</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 명확하고 구체적으로 질문하세요</li>
                  <li>• 증상이 있다면 언제부터 시작되었는지 말씀하세요</li>
                  <li>• 조용한 환경에서 녹음해주세요</li>
                  <li>• 너무 빠르거나 느리지 않은 속도로 말씀하세요</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Volume2 className="w-6 h-6 text-green-500 mr-2" />
                음성 재생 사용법
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">녹음 내용 재생</h4>
                <p className="text-sm text-gray-600 mb-2">
                  녹음이 완료되면 재생 버튼(▶️)을 눌러 녹음한 내용을 확인할 수 있습니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">AI 답변 듣기</h4>
                <p className="text-sm text-gray-600 mb-2">
                  AI 답변이 나타나면 '음성으로 듣기' 버튼을 클릭하여 음성으로 들을 수 있습니다.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">음성 제어</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 재생 중 일시정지 가능</li>
                  <li>• 언제든 정지 버튼으로 재생 중단 가능</li>
                  <li>• 볼륨은 기기 설정에 따라 조절됩니다</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="w-6 h-6 text-orange-500 mr-2" />
              자주 묻는 질문 (FAQ)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">Q: 마이크 권한을 허용했는데도 녹음이 안 돼요</h4>
              <p className="text-sm text-gray-600">
                A: 브라우저 설정에서 마이크 권한을 확인하고, 다른 앱에서 마이크를 사용하고 있지 않은지 확인해보세요. 
                페이지를 새로고침한 후 다시 시도해보세요.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">Q: AI 답변이 정확하지 않은 것 같아요</h4>
              <p className="text-sm text-gray-600">
                A: 본 서비스는 일반적인 정보 제공 목적입니다. 정확한 진단과 치료를 위해서는 
                반드시 치과 전문의와 직접 상담받으시기 바랍니다.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">Q: 녹음된 음성은 어떻게 처리되나요?</h4>
              <p className="text-sm text-gray-600">
                A: 녹음된 음성은 AI 분석을 위해 임시로 처리되며, 개인정보는 저장되지 않습니다. 
                상담 세션이 끝나면 관련 데이터는 삭제됩니다.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">Q: 응급상황일 때도 이 서비스를 사용해도 되나요?</h4>
              <p className="text-sm text-gray-600 text-red-600 font-medium">
                A: 아니요! 응급상황(심한 통증, 출혈, 외상 등)에는 즉시 응급실이나 치과 응급실을 방문하세요. 
                본 서비스는 응급치료를 대체할 수 없습니다.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-800">Q: 모바일에서도 사용할 수 있나요?</h4>
              <p className="text-sm text-gray-600">
                A: 네, 모바일 브라우저에서도 정상적으로 사용 가능합니다. 
                Chrome, Safari, Firefox 등 최신 브라우저에서 사용하시기 바랍니다.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Technical Requirements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-6 h-6 text-gray-500 mr-2" />
              시스템 요구사항
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">지원 브라우저</h4>
                <ul className="text-sm space-y-1">
                  <li>• Chrome 80 이상 (권장)</li>
                  <li>• Firefox 75 이상</li>
                  <li>• Safari 13 이상</li>
                  <li>• Edge 80 이상</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">필요 권한</h4>
                <ul className="text-sm space-y-1">
                  <li>• 마이크 접근 권한 (필수)</li>
                  <li>• 스피커/헤드폰 (음성 재생용)</li>
                  <li>• 안정적인 인터넷 연결</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Link href="/">
            <Button size="lg" className="text-lg px-8 py-3 mr-4">
              음성 상담 시작하기
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              서비스 소개
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}