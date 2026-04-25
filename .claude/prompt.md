[중요] 이 태스크는 GitHub Actions 자동화 환경에서 실행됩니다.
- 질문 금지. 확인 금지. 바로 코드를 작성하세요.
- 모든 결정을 스스로 내리세요. "어떻게 할까요?" 같은 되묻기 절대 금지.
- 빈 리포지토리 (README.md만 존재)에서 시작합니다.
- npm install && npm run build 가 성공해야 합니다 (자동 검증됨).

## 작업
`.claude/build-plan.json` 파일을 읽어 그 안의 스펙대로 완전한 MVP 프로젝트를 생성하세요.

## 빌드 플랜 위치
`.claude/build-plan.json` — JSON 형식. 다음 필드 포함:
- project_name, one_liner
- mvp_spec.core_features, mvp_spec.non_goals, mvp_spec.success_criteria
- tech_stack (frontend/backend/ai/deploy/reason)
- week1_plan (Day별 작업)
- first_revenue_path

## 필수 요구사항
1. **TypeScript strict mode** 필수
2. **한국어 UI** (존댓말, 존중하는 톤)
3. **모바일 퍼스트** 반응형
4. `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.js` 등 모든 설정 파일 생성
5. 모든 페이지/라우트/컴포넌트/타입 파일 작성 (껍데기 금지, 실제 동작 코드)
6. `README.md` 한국어로 작성 — 실행 방법, 환경변수, 배포 안내
7. `.env.example` — 필요한 환경변수 목록
8. `.gitignore` — node_modules, .next, .env*, dist 등
9. 외부 API 키가 필요한 부분은 환경변수로 분리 + .env.example에 명시
10. 키 없이도 `npm run build` 성공해야 함 — 빌드 시점 검증은 process.env에 의존하지 않게
11. 페이지 최소 3개 이상 (홈 + 기능 페이지 2개 이상)
12. API Route 최소 2개 이상 (각 라우트는 zod로 입력 검증)
13. UI: Tailwind CSS 4 (PostCSS 설정 포함). shadcn 스타일 카드/버튼 권장
14. 에러/로딩/빈 상태 처리 UI 포함
15. 코드 100% 동작. TODO/FIXME/임시 코드 금지.

## 작업 흐름
1. `.claude/build-plan.json`을 Read로 읽어서 spec 파악
2. 파일 트리 설계 → 한꺼번에 Write로 작성
3. `npm install` 실행 — 모든 의존성 정상 설치 확인
4. `npm run build` 실행 — 빌드 성공 확인. 실패하면 코드 수정 후 재실행 (반복)
5. README.md 작성
6. 완료
