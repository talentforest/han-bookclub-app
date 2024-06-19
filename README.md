# 📚 독서모임 한페이지

### ❓ 독서모임 한페이지가 무엇인가요?

> 제가 참여하고 있는 "독서모임 한페이지"를 위해 만든 어플리케이션입니다. 독서모임 한페이지는 매월 1회 모임을 진행하며, 매달 멤버들이 돌아가며 이달의 발제자가 되고, 이달의 발제자가 직접 선정한 모임책으로 서로의 생각을 나누는 독서모임입니다.
>
> 이런 모임의 특성에 맞게 개발한 어플리케이션이 바로 독서모임 한페이지입니다.

### ❓ 왜 개발했나요?

독서모임 한페이지를 개발한 이유에는 크게 세가지가 있었습니다.

1. 그달의 발제문과 멤버들이 나누었던 다양한 관점과 생각들을 **기록**하기 위해
2. **모임 지속과 운영에 도움**이 되기 위해
3. 다양한 배경을 가진 멤버들에게 **가장 접근성이 좋은 툴은 웹페이지**라고 생각해서

<br/>

[Demo 바로가기 👀](https://talentforest.github.io/han-bookclub-app/)

<div> 
  <img alt="독서모임 한페이지 데스크탑 홈화면" src="https://github.com/talentforest/han-bookclub-app/assets/91457443/affaadf7-4255-4540-9b08-75fb1ee639eb" width="56%">
  <img alt="독서모임 한페이지 모바일 홈화면" src="https://github.com/talentforest/han-bookclub-app/assets/91457443/edc4cee4-ae59-4334-a428-0e5e7fb7f2d1" width="20%">
</div>

<br/>

## 프로젝트에 사용한 스택

<div>
  <img src="https://img.shields.io/badge/pwa-5A0FC8?style=for-the-badge&logoColor=black">
  <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
  <img src="https://img.shields.io/badge/recoil-007af4?style=for-the-badge&logo=recoil&logoColor=white">
  <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled components&logoColor=white">
  <img src="https://img.shields.io/badge/github pages-222222?style=for-the-badge&logo=github pages&logoColor=white">
  <img src="https://img.shields.io/badge/react quill-333?style=for-the-badge&logoColor=black">
</div>

<br/>

## 프로젝트 개발 기간

| 첫 기획                 | 첫 배포까지 개발 기간             |
| ----------------------- | --------------------- |
| 2022.04.20 ~ 2022.04.27 | 2022.04.28 ~ 22.06.30 |

<br/>

## 프로젝트 버전

**계속 유지보수와 업데이트 중입니다.**

| 버전   | 배포 날짜 | 업데이트 사항                                                                                                                                                                                |
| ------ | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| v1.0.0 | 22.06.30  | <ol><li>이달의 모임 정보</li><li>발제문 / 추천책 / 모임 후기 등록 기능</li><li>모임 히스토리 페이지</li><li>모임 관련 투표 페이지</li><li>나의 프로필, 선호하는 책분야 설정 페이지</li></ol> |
| v2.0.0 | 24.01.20  | <ol><li>전체 페이지 UI 변경</li><li>직접 모임책 등록 기능 추가</li><li>챌린지 페이지 추가</li><li>공유하고 싶은 문구 기능 추가</li><li>불참 멤버 설정 페이지</li></ol>                       |
| v3.0.0 | 24.06.14  | <ol><li>PWA 앱, 푸시 알림 설정</li><li>카카오톡 공유하기 기능 삭제</li><li>독서모임 한페이지 월별 정보 페이지</li><li>페널티 자동 부과</li><li>이전 투표 버그 수정</li><li>일반 투표에서 모임책 투표로 변경</li></ol>

<br/>

## 목차

> 1. [독서모임 한페이지 기능 소개](#1-독서모임-한페이지-기능-소개)
>
>    - [반응형 웹페이지](#반응형-웹페이지)
>
>    - [PWA 애플리케이션](#PWA-애플리케이션)
>
>    - [로그인과 회원가입, 익명 로그인](#로그인과-회원가입-익명-로그인)
>
>    - [이달의 모임 정보, 모임책 기록에 대한 Firebase CRUD 기능](#이달의-모임-정보-모임책-기록에-대한-Firebase-CRUD-기능)
>   
>    - [책 검색 기능](#책-검색-기능)
>   
>    - [모임책 투표](#모임책-투표)
>
> 2. [프로젝트 스펙과 구조 살펴보기](#2-프로젝트-스펙과-구조-살펴보기)
>
> 3. [프로젝트에서 배운 점](#3-프로젝트에서-배운-점)

<br/>

## 1. 독서모임 한페이지 대표 기능 소개

### 반응형 웹페이지

- styled components에서 미디어 쿼리를 활용하여 모바일 중심의 반응형 웹사이트로 제작하였습니다. 특히 데스크탑에서의 탑 네비게이션과 모바일의 바텀 네비게이션 컴포넌트를 구분하여 미디어 쿼리를 통해 각 화면에 맞게 적용하였습니다. 그 반응형 스타일로 `grid` 형식과 `flex`를 많이 활용하였습니다.

<div>
  <img alt="독서모임 한페이지 데스크탑 모바일 화면" src="https://github.com/talentforest/han-bookclub-app/assets/91457443/5330292d-7d99-4a03-baf0-1f5f4ada36b2" width="20%">
  <img alt="독서모임 한페이지 데스크탑 히스토리 화면" src="https://github.com/talentforest/han-bookclub-app/assets/91457443/a2925a52-936f-4e2d-8214-42c550abaa0b" width="56%">
</div>

### PWA

- 위의 반응형 웹페이지로 만든 것을 기반으로 버전 3.0.0 업데이트 시 PWA 애플리케이션으로 만들었습니다. 홈화면에 추가할 수 있는 웹앱으로 만들어 해당 앱에 들어가면 실제 네이티브 앱처럼 보이게 만들었고, 서비스 워커를 통해 웹앱에서 푸시 알림을 받을 수 있도록 구현했습니다. 자세한 PWA와 푸시 알림 구현 후기는 아래 블로그 글에서 확인하실 수 있습니다.
  
  [FCM과 Firebase Functions으로 PWA 웹에서 푸시 알림 기능 구현하기](https://jellieblog.dev/posts/how-to-implement-push-notifications-with-fcm-and-firebase-functions)

### 로그인과 회원가입, 익명 로그인

- 로그인과 익명 로그인, 비밀번호 찾기 기능

  - Firebase 인증 기능을 활용하였습니다.

  - 가입한 회원만이 모든 기능을 이용 가능하며, 익명 로그인을 통해 입장이 가능하지만 익명 로그인에서는 모든 기록에 대한 작성, 보기, 투표 기능 등등이 제한됩니다.

    - 가입된 회원인지 검증하는 custom hook을 만들어 인증이 필요한 기능을 이용하려 할 때마다 활용하였습니다. 익명의 사용자는 로그인을 요청하거나 적절한 `alert` 메시지를 받게 됩니다.

<br/>

### 이달의 모임 정보, 모임책 기록에 대한 Firebase CRUD 기능

- 독서모임에서는 작성해야하는 여러가지 글이 있습니다. 웹에서 모든 글은 CRUD가 가능하며 Firebase 데이터베이스에 저장됩니다.
    - 발제문, 추천책, 정리기록, 모임후기
    - 챌린지 정보, 공유하고 싶은 문구
 
    등등

<br/>

  <img src="https://github.com/talentforest/han-bookclub-app/assets/91457443/e8c9dcc2-0594-4a27-a0a1-8fb1201589cd" alt="발제문" width="20%" />
  <img alt="챌린지 데스크탑 페이지" src="https://github.com/talentforest/han-bookclub-app/assets/91457443/1504a2ee-1e18-40f6-ad53-a4e936a4cb13" width="50%" />


### 책 검색 기능

- 독서모임 한페이지에서는 책 정보를 검색할 수 있습니다. 책 정보가 필요한 일이 크게 4가지가 있는데,
    - 추천할 책
    - 도전할 챌린지 책
    - 다음달 모임책 등록
    - 모임책 투표 등록
      
  이때 카카오 책 검색 API를 통해 책정보를 검색하고 등록할 수 있습니다.

### 모임책 투표

- 원래는 일반적인 투표 기능이었지만, 전부 다음달 모임책을 위한 투표로 올리고 있어서 아예 **책투표**에 더 특화되게 만들었습니다. 이전에는 유저가 책정보 링크를 같이 첨부하고 싶다면 따로 외부에서 복사해서 가져와야했는데, 이제 간단하게 책을 검색하고 등록하기만 하면 책 정보 링크가 같이 첨부됩니다. 

<div>
  <figure>이전</figure>
  <img alt="모임책 투표 화면" width="20%" src="https://github.com/talentforest/han-bookclub-app/assets/91457443/b0c91233-3153-492e-a798-340bc12c4a2b" />
  <figure>이후</figure>
  <img width="20%" alt="이전 투표 화면" src="https://github.com/talentforest/han-bookclub-app/assets/91457443/f8697eba-12a0-49e4-8e7b-cd65c3aa6b81">
</div>

<br/>

위의 기능 이외에도 페널티 자동 부과, 불참 설정 등등 더 다양한 기능이 있다.

[Demo 👀](https://talentforest.github.io/han-bookclub-app/)를 보시면 더 다양한 기능들을 확인할 수 있습니다.

<br/>

[목차로 돌아가기](#목차)

<br/>

### 2. 프로젝트 스펙과 구조 살펴보기

> 스펙 선정 이유

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> React의 hook과 컴포넌트, 상태, 렌더링 등에 대해 더욱 깊이 있는 공부를 하고 싶었고, 또한 이 프로젝트는 다수의 사람들이 대상이 아니라 특정 멤버들을 위한 웹페이지이기 때문에 SEO가 중요하지 않았습니다.

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> 규모가 있는 프로젝트에서는 유지보수와 추후 기능 업데이트적인 부분에서 타입스크립트는 필수라고 생각했습니다.

<img src="https://img.shields.io/badge/recoil-007af4?style=for-the-badge&logo=recoil&logoColor=white"> Recoil은 일단 React 전용 전역 상태 관리 라이브러리로 React에 가장 최적화되어 있고, Redux와 달리 보일러플레이트가 많이 필요 없이 굉장히 직관적이어서 사용했습니다.

<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black"> 독서모임의 기록물들을 저장할 곳으로 파이어베이스가 서버리스에서 가장 입문하기 좋다고 생각되어 공부하며 사용해보았습니다. 버전을 업하면서 푸시 알림을 구현하며 Firebase Cloud Messaging, Firebase Functions 서비스를 같이 이용했습니다.

> 파일 구조

```bash
.root
├── node_modules
├── public
├── src
│   ├── api  # 서버와 통신하는 API, (ex.카카오톡 책 검색, Firebase 문서 데이터 검색)
│   ├── components
│   │   ├── atoms  # 전역에서 재사용되는 가장 작은 컴포넌트
│   │   ├── molecules # 여러개의 atom들을 조합한 컴포넌트
│   │   ├── organisms  # 페이지의 컨텍스트가 담겨지는 컴포넌트
│   │   ├── App.tsx
│   ├── constants # 유용한 상수들을 담은 폴더 ex. 파이어베이스 컬렉션 이름
│   ├── data  # recoil 상태 관련 데이터를 담은 폴더
│   ├── hooks
│   ├── layout # 탑 헤더 네비게이션, 모바일 바텀 네비게이션
│   ├── routes
│   ├── theme
│   ├── util # 전역에서 사용되는 유용한 함수들
│   ├── firebase.tsx  # firebase 설정 파일
│   ├── index.tsx
│   └── Router.tsx
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

프로젝트 규모가 점점 커지다 보니 효율적인 파일 구조에 대한 필요성을 많이 느끼게 되었고, 좋은 파일 구조란 무엇일지에 대한 고민을 많이 했는데요. 일단 파일 구조에서 폴더는 저마다의 확실한 기준을 갖고자 노력했습니다. 그러면서 아토믹 디자인 시스템을 한번 활용해 보았는데, 확실히 이전의 라우트 기반 파일 구조보다 좀더 생산성과 유지보수적인 측면에서 개선되었다는 느낌이 받았습니다. 하지만 아토믹 디자인 원칙을 활용하면서 아쉬운 부분이 조금 있었는데요. 제가 고민했던 효율적인 파일 구조에 대해 더 자세한 내용은 [블로그에 작성한 글](https://jellieblog.dev/posts/consideration-of-file-structure)에서 읽어보실 수 있습니다.

<br/>

[목차로 돌아가기](#목차)

### 3. 프로젝트에서 배운 점

첫 기획부터 출시, 그리고 계속되는 업데이트에서 정말 배운 것이 많았던 것 같습니다. IT 관련 배경을 전혀 갖고 있지 않은 분들과 함께 기획을 하면서 프로토타입을 보여주며 그들의 의견을 더 이끌어내기 위해 적극적으로 소통하며 행동했고 무사히 기획을 잘 마칠 수 있었습니다.

첫 출시를 하고 이후 유지보수를 하면서 프로젝트에 대한 윤곽을 잡고 제대로 된 형상을 만들어 나가는 데 온 힘을 쏟았는데요. 그 과정에서 더 효율적인 Firebase 데이터베이스 구조와 프로젝트 파일 구조에 대해 많은 고민을 했던 것 같습니다. 또한 렌더링을 최적화하고, 커스텀 훅들을 만들면서 React에 대해서도 한단계 더 올라선 것을 느낄 수 있었습니다.

[목차로 돌아가기](#목차)
