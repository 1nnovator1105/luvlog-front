# Luvlog Frontend

## 개요

EC2에서 Vercel 포팅을 위해 만들어진 Repository입니다.

## 프로젝트 정보

React 기반의 블로그/콘텐츠 관리 시스템으로, Create React App을 사용하여 구축되었습니다.

## 기술 스택

- React 17
- React Router v5
- Axios (API 통신)
- Toast UI Editor (에디터)
- Bootstrap 4
- React Testing Library & Jest (테스트)

## 주요 기능

- 블로그 포스트 목록 및 페이지네이션
- 포스트 작성/수정 (인증 필요)
- 개별 포스트 조회
- 세션 기반 인증 시스템
- 역할 기반 접근 제어
- 게스트 모드 지원

## 설치 및 실행

### 개발 환경 설정

```bash
# 의존성 설치
yarn install
# 또는
npm install
```

### 개발 서버 실행

```bash
# 개발 서버 시작 (http://localhost:3000)
yarn start
# 또는
npm start
```

### 프로덕션 빌드

```bash
# 최적화된 빌드 생성 (/build 폴더)
yarn build
# 또는
npm run build
```

### 테스트 실행

```bash
# 테스트 실행 (watch 모드)
yarn test
# 또는
npm test
```

## 프로젝트 구조

```
src/
├── components/     # React 컴포넌트 (기능별 구성)
├── common/        # 공통 유틸리티 함수
├── static/        # 정적 파일 (이미지, 비디오)
└── App.js         # 메인 애플리케이션 컴포넌트
```

## 주요 라우트

- `/list` - 블로그 포스트 목록
- `/write` - 포스트 작성/수정
- `/post/:idx` - 개별 포스트 보기
- `/` - 기본 경로 (자동으로 `/list?page=0`로 리다이렉트)

## API 연동

개발 환경에서는 프록시 설정을 통해 `~`로 API 요청이 전달됩니다.

## 배포

Vercel을 통한 배포를 위해 최적화되어 있습니다.

## 라이선스

이 프로젝트는 개인 프로젝트입니다.
