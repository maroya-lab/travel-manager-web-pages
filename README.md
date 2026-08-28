# Travel Manager Pro Web

휴대폰 전체 화면 사용을 우선으로 만든 정적 PWA 웹앱입니다. 별도의 빌드 과정이나 서버 데이터베이스 없이 GitHub Pages에 바로 배포할 수 있습니다.

## 로컬 실행

파일을 직접 열지 말고 로컬 HTTP 서버로 실행해야 서비스 워커와 PWA 설치 기능을 테스트할 수 있습니다.

PowerShell에서 이 폴더로 이동한 뒤 Node.js 서버를 실행합니다.

```powershell
node serve.mjs
```

브라우저에서 `http://localhost:4173`을 엽니다.

정적 파일과 JavaScript 구성을 검사하려면 다음 명령을 실행합니다.

```powershell
node verify.mjs
```

같은 Wi-Fi의 휴대폰에서 화면을 확인하려면 PC 방화벽과 네트워크 설정이 허용된 경우 `http://PC의-로컬-IP:4173`으로 접속할 수 있습니다. 단, Service Worker와 홈 화면 설치는 보안 연결이 필요하므로 실제 PWA 테스트는 GitHub Pages 배포 후 HTTPS 주소로 접속하는 방식이 가장 확실합니다.

## GitHub Pages 배포

1. `travel-manager-web` 폴더의 파일을 GitHub 저장소 루트에 업로드합니다.
2. GitHub 저장소에서 `Settings → Pages`를 엽니다.
3. `Deploy from a branch`를 선택합니다.
4. 배포 브랜치와 `/ (root)`를 선택해 저장합니다.
5. 생성된 HTTPS 주소를 휴대폰에서 엽니다.

하위 폴더로 배포해도 모든 경로가 상대 경로로 작성되어 있어 동작합니다.

## 휴대폰 홈 화면 설치

- Android Chrome: 주소창 또는 브라우저 메뉴의 `앱 설치`를 선택합니다.
- iPhone Safari: 공유 버튼을 누르고 `홈 화면에 추가`를 선택합니다.

설치 후에는 브라우저 주소창 없이 독립 앱처럼 전체 화면으로 실행됩니다.

## 현재 데이터 저장 방식

- 일정과 설정: `localStorage`
- 첨부 파일: 작은 파일을 Data URL 형태로 `localStorage`에 저장
- 오프라인 앱 파일: Service Worker Cache Storage
- 백업: JSON 다운로드 및 복원

브라우저 저장 데이터를 삭제하면 앱 데이터도 삭제됩니다. 중요한 내용은 백업 메뉴에서 JSON 파일로 내려받아 보관하세요.

## 실제 앱 개발 시 교체할 부분

- 사용자 로그인: Firebase Authentication
- 실시간 공유: Cloud Firestore
- 바우처 및 이미지: Firebase Storage
- 지도 좌표 조회: Google Places API 또는 Geocoding API
- 푸시 알림: Firebase Cloud Messaging
- Flutter 앱은 동일한 데이터 모델을 기준으로 재구현

## 주요 파일

- `index.html`: 모바일 웹앱 전체 기능
- `manifest.webmanifest`: 홈 화면 설치 정보
- `sw.js`: 오프라인 캐시
- `offline.html`: 최초 접속 실패용 오프라인 안내
- `icons/`: PWA 앱 아이콘
