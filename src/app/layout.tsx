import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '치과 음성 상담 봇',
  description: '치과 환자를 위한 AI 음성 상담 서비스',
  keywords: ['치과', '음성상담', 'AI', '의료상담'],
  authors: [{ name: 'VoiceDesk' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
          {/* Navigation */}
          <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-gray-900">
                  🦷 치과 AI 상담
                </Link>
                <div className="flex space-x-4">
                  <Link href="/about">
                    <Button variant="ghost" size="sm">
                      서비스 소개
                    </Button>
                  </Link>
                  <Link href="/help">
                    <Button variant="ghost" size="sm">
                      도움말
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          
          {/* Main Content */}
          {children}
          
          {/* Footer */}
          <footer className="bg-gray-50 border-t border-gray-200 mt-16">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center text-sm text-gray-600">
                <p className="mb-2">
                  © 2024 치과 AI 음성 상담 봇. 본 서비스는 일반적인 정보 제공 목적입니다.
                </p>
                <p className="mb-4">
                  정확한 진단과 치료를 위해서는 반드시 치과 전문의와 상담받으세요.
                </p>
                <div className="flex justify-center space-x-6">
                  <Link href="/about" className="hover:text-gray-800">
                    서비스 소개
                  </Link>
                  <Link href="/help" className="hover:text-gray-800">
                    도움말
                  </Link>
                  <span className="text-gray-400">|</span>
                  <span>응급상황 시 119 또는 가까운 응급실 방문</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}