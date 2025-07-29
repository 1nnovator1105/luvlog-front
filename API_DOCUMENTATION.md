# API Documentation

이 문서는 luvlog-front 프로젝트에서 사용하는 모든 API 엔드포인트와 파라미터를 정리한 문서입니다.

## Base URL
- Development: `http://localhost:3000` (proxy to `http://luvlog.xyz/`)
- Production: `http://15.165.248.126:8080` (configured in vercel.json)

## API Endpoints

### 1. 로그인
**POST** `/api/login`

사용자 로그인을 처리합니다.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "USER_NAME": "string",
  "USER_ROLE": "string"
}
```

**사용 위치:** `/src/components/login/Login.jsx`

---

### 2. 게시글 목록 상태 조회
**GET** `/api/getListStatus`

게시글 목록의 전체 상태 정보를 조회합니다.

**Query Parameters:**
```
readLimit: number (한 페이지에 표시할 게시글 수, 기본값: 5)
role: string (사용자 권한, sessionStorage에서 가져옴)
```

**Response:**
```json
{
  "TOTAL_CNT": number,
  "TOTAL_PAGE": number
}
```

**사용 위치:** `/src/components/list/List.jsx`

---

### 3. 게시글 목록 조회
**GET** `/api/getList`

페이지별 게시글 목록을 조회합니다.

**Query Parameters:**
```
readLimit: number (한 페이지에 표시할 게시글 수)
totalCnt: number (전체 게시글 수)
page: number (현재 페이지 번호, 0부터 시작)
role: string (사용자 권한, sessionStorage에서 가져옴)
```

**Response:**
```json
[
  {
    "CONTENTS_ID": number,
    "CONTENTS_TITLE": "string",
    "CONTENTS_SUMMARY": "string",
    "CONTENTS_AUTHOR": "string",
    "CREATE_DATE": "string"
  }
]
```

**사용 위치:** `/src/components/list/List.jsx`

---

### 4. 게시글 상세 조회
**GET** `/api/post/{postId}`

특정 게시글의 상세 내용을 조회합니다.

**Path Parameters:**
- `postId`: 게시글 ID

**Response:**
```json
{
  "TITLE": "string",
  "CONTENTS": "string (HTML)",
  "AUTHOR": "string",
  "CREATE_DATE": "string",
  "ACCESS_LEVEL": number
}
```

**특이사항:**
- `ACCESS_LEVEL`이 1이고 사용자 권한이 '관리자'가 아닌 경우 접근 불가

**사용 위치:** `/src/components/post/Post.jsx`

---

### 5. 게시글 작성
**POST** `/api/write`

새로운 게시글을 작성합니다.

**Request Body:**
```json
{
  "title": "string",
  "author": "string (고정값: 'ysms')",
  "contents": "string (HTML)",
  "accessLevel": boolean
}
```

**Response:**
- 성공 시 리다이렉트 (`/list`)

**사용 위치:** `/src/components/write/Write.jsx`

---

### 6. 이미지 업로드
**POST** `/api/upload`

이미지 파일을 업로드하고 S3 URL을 반환합니다.

**Request:**
- Content-Type: `multipart/form-data`
- FormData with key `data` containing the image file

**Response:**
```
"string" (S3 이미지 URL)
```

**특이사항:**
- 이미지는 800x600으로 자동 리사이징됨
- PNG 포맷으로 변환됨

**사용 위치:** `/src/components/write/Write.jsx`

---

## 인증 정보

모든 API 호출 시 sessionStorage에 저장된 인증 정보를 사용합니다:
- `username`: 사용자 이름
- `role`: 사용자 권한 (예: '관리자', 'guest')

## 프록시 설정

개발 환경에서는 `package.json`에 설정된 프록시를 통해 API 호출이 이루어집니다:
```json
"proxy": "http://luvlog.xyz/"
```

프로덕션 환경(Vercel)에서는 `vercel.json`의 rewrites 설정을 통해 라우팅됩니다:
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "http://15.165.248.126:8080/api/:path*"
    }
  ]
}
```