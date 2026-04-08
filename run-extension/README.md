# 출근→퇴근 달리기 🏃

브라우저 탭 제목과 주소창(해시)에서 귀여운 캐릭터가
**출근시간 → 퇴근시간**으로 천천히 달려가는 Chrome/Edge/Firefox 확장입니다.

![preview](https://via.placeholder.com/600x80?text=🏢···🐹······🏠+4h9m)

---

## ✨ 기능

- 탭 제목에 `🏢···🐹······🏠 4h9m` 처럼 캐릭터가 흐름
- 주소창 해시(`#출근...퇴근`)에도 같이 표시
- 시간이 흐를수록 캐릭터가 회사 → 집으로 이동
- 팝업에서 캐릭터/출퇴근 시각/트랙 길이/갱신 주기 설정
- 설정은 Google 계정 동기화(`chrome.storage.sync`)로 다른 컴퓨터와 자동 공유

---

## 📦 설치 방법 (개발자 모드)

### 1. 코드 받기
```bash
git clone https://github.com/<본인아이디>/run-to-home.git
```

### 2. Chrome / Edge
1. 주소창에 `chrome://extensions` (Edge는 `edge://extensions`) 입력
2. 우측 상단 **"개발자 모드(Developer mode)"** 토글 ON
3. 좌측 상단 **"압축해제된 확장 프로그램을 로드합니다 (Load unpacked)"** 클릭
4. 방금 clone한 `run-to-home` 폴더 선택
5. 툴바 퍼즐 아이콘 → 압정 클릭해 **확장 아이콘을 툴바에 고정**

### 3. Firefox
1. 주소창에 `about:debugging#/runtime/this-firefox` 입력
2. **"임시 부가 기능 로드 (Load Temporary Add-on)"** 클릭
3. clone한 폴더 안의 `manifest.json` 선택
   *(Firefox는 재시작하면 사라집니다 — 영구 설치는 서명 필요)*

---

## ⚙️ 사용법

1. 브라우저 우상단 **확장 아이콘** 클릭 → 팝업 설정창
2. 캐릭터 선택, 출근/퇴근 시각 입력
3. 아무 웹페이지(예: naver.com) 새로고침 → 탭 제목/주소창에 캐릭터가 등장
4. 시간이 지나면 캐릭터가 자동으로 회사 → 집으로 이동

---

## 🔄 업데이트

```bash
cd run-to-home
git pull
```
→ `chrome://extensions`에서 확장 카드의 **🔄 재로드** 클릭

---

## 📁 파일 구성

```
manifest.json   확장 정의
content.js      탭 제목/해시 갱신 (모든 페이지에 주입)
popup.html      설정 팝업 UI
popup.js        설정 저장/로드
```

---

## ⚠️ 동작하지 않는 페이지

브라우저 정책상 다음 페이지에는 주입되지 않습니다:
- `chrome://`, `about:`, `chrome-extension://`
- Chrome 웹스토어
- 일부 PDF 뷰어

---

제작자: 김정윤
