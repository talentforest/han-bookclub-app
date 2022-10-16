# <div align="center"><strong>한페이지 독서모임 기록관리 앱</strong></div>

### <div align="center">✨ <strong>프로젝트에 사용한 스택</strong> ✨</div>

<div align="center" >
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
  <img src="https://img.shields.io/badge/recoil-007af4?style=for-the-badge&logo=recoil&logoColor=white">

  <img src="https://img.shields.io/badge/styled component-DB7093?style=for-the-badge&logo=styled-component&logoColor=white">
  <img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white">

  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
</div>

<br/>

#### <div align="center">✨ <strong>기타 React 라이브러리</strong> ✨</div>

<div align="center">
  <img src="https://img.shields.io/badge/react quill-333?style=for-the-badge&logoColor=black">
  <img src="https://img.shields.io/badge/react slick-333?style=for-the-badge&logoColor=black">
</div>

<br/>
<div align="center">
  <h3>📍  프로젝트 살펴보기 
    <a href="https://talentforest.github.io/han-bookclub-app/"><strong>Demo</strong>
    </a> 👀
  </h3>
  <h5>(gh-pages로 배포하였습니다.)</h5>
</div>

<br/>

<div align="center">
  <h3>📍  프로젝트의 기획부터 개발 기간</h3>
  <h5>기획: 2022.04.20 ~ 2022.04.27</h4>
  <h5>개발: 2022.04.28 ~ 계속 기능 업데이트 중</h4>
</div>

<br/>

<div align="center">
  <h3>📍  버전 업데이트</h3>
  
  |버전|날짜|
|------|---|
|v0.0.0|22.06.30|
|v0.0.1|22.07.03|
|v0.1.1|22.08.31|
|v0.2.1|22.09.03|
</div>

<br/>

<div align="center">

### 목차

#### [목차 1. 한페이지 독서모임 기록관리 앱 프로젝트 계획 이유](#1-한페이지-독서모임-기록관리-앱-프로젝트-계획-이유)

#### 1-1. 한페이지 독서모임은 무엇인가요?

#### 1-2. 한페이지 독서모임 기록관리 앱을 계획한 이유

#### [목차 2. 프로젝트 스펙과 파일구조 살펴보기](#2-프로젝트-스펙과-파일구조-살펴보기)

#### [목차 3. 한페이지 독서모임 기록관리 앱의 기능 소개](#3-한페이지-독서모임-기록관리-앱의-기능-소개)

##### 3-0. 반응형 웹페이지

##### 3-1. 로그인 페이지

##### 3-2. 회원가입 페이지

##### 3-3. 홈 페이지

##### 3-4. 지난 책모임 페이지

##### 3-5. 이달의 책모임 페이지

##### 3-6. 투표하기 페이지

##### 3-7. 나의 책장 페이지

##### 3-8. 설정 페이지

#### [목차 4. 업데이트 계획](#4-업데이트-계획)

</div>

<br/>

<br/>

### [1. 한페이지 독서모임 기록관리 앱 프로젝트 계획 이유](#목차-1-한페이지-독서모임-기록관리-앱-프로젝트-계획-이유)

> #### 1-1. 한페이지 독서모임은 무엇인가요?

<br/>

한페이지는 멤버 한명 한명이 돌아가며 책을 선정하고, 멤버가 선정한 책에 대해 서로의 생각을 나누는 독서모임입니다. 매월 독서분야를 정해 다양한 분야의 책을 읽어보고자 하고 있습니다. 모임을 만든지 1년이 지났는데 열심히 기록하지 않으면 흘러가는 아까운 생각들을 담고, 모든 멤버가 다양한 기록을 볼 수 있도록 하기 위해 제작했습니다.

이곳에서 북클럽의 모든 정보(발제, 추천책, 후기)등등을 작성할 수 있습니다. 또한 모임을 운영하는데 필요했던 투표 기능도 포함되어 있습니다.

<br/>

> #### 1-2. 한페이지 독서모임 기록관리 앱을 계획한 이유

<strong>1. 좀 더 체계적인 기록 관리가 필요하다.</strong>

먼저 멤버들이 독서모임에서 나눈 이야기를 여기저기 중구난방으로 기록한다는 점과, 기록물을 카톡으로만 공유하다보니 나중에 기록물을 찾아보려할 때 시간이 걸리는 점 또한 문제였습니다. 또한 발제문, 추천책에 대한 글, 모임장소에 대한 글 등등 글의 분류 없이 멤버가 이야기하고 싶은 것들을 공유하니 독서모임에 체계적인 기록 시스템이 필요하다고 느꼈습니다.

<strong>2. 모두가 쉽게 이용할 수 있는 도구여야 한다.</strong>

다양한 사람들이 모여있다보니 공통적으로 사용하는 문서 도구가 없었습니다. 또한 팀으로 문서 관리가 이루어져야 하다보니 더욱더 공통적으로 사용할 수 있는 문서 도구가 필요했습니다.

<strong>3. "독서모임"에 최적화된 애플리케이션이 없다.</strong>

독서모임 운영에 도움이 될만한 앱을 찾아보았으나, 마땅히 없어서 우리의 독서모임에 최적화된 애플리케이션을 만들어보고 싶다는 생각을 하게되었습니다!

<br/>

### [2. 프로젝트 스펙과 파일구조 살펴보기](#목차-2-프로젝트-스펙과-파일구조-살펴보기)

> 스펙

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> React의 hook과 컴포넌트, 상태, 렌더링 등에 대해 더욱 깊이 있는 공부를 하고 싶었고, 또한 이 프로젝트는 다수의 사람들이 대상이 아니라 특정 멤버들을 위한 앱이어서 SEO가 그렇게 중요하지 않다고 생각해 React를 선택했습니다.

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> 타입스크립트는 공부를 막 시작한 상태에서, 한번 프로젝트에 적용하며 공부해보고 싶어 사용해보았습니다.🤩

<img src="https://img.shields.io/badge/recoil-007af4?style=for-the-badge&logo=recoil&logoColor=white"> Recoil은 일단 React 전용 전역 상태 관리 라이브러리로 React에 가장 최적화되어 있고, Redux와 달리 보일러플레이트가 많이 필요 없이 굉장히 직관적이어서 사용했습니다.

<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black"> 백엔드를 잘 모르는 상태에서 독서모임의 기록물들을 저장하고 관리하고 싶어 파이어베이스를 공부하며 사용해보았습니다!

<img src="https://img.shields.io/badge/styled component-DB7093?style=for-the-badge&logo=styled-component&logoColor=white"><img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white"> CSS 라이브러리로는 Styled Component를 사용했고, 아이콘은 MUI를 이용했습니다.

> 파일 구조

```bash
.root
├── node_modules
├── public
├── src
│   ├── api                       # 카카오 도서 검색 api 함수 폴더
│   ├── component                 # 공통으로 사용하는 컴포넌트와 페이지별로 폴더 구분
│   │   ├── appsetting            # 앱 설정 관련(프로필 수정, 업데이트 요청, 로그아웃, 탈퇴 설정)
│   │   ├── bookclub              # 이달의 책모임 페이지 관련
│   │   ├── bookclubhistory       # 지난 책모임 페이지 관련
│   │   ├── common                # 전역 공통 컴포넌트
│   │   ├── login                 # 로그인 페이지 관련
│   │   ├── mybookshelf           # 나의 책장 페이지 관련
│   │   ├── search                # 추천책 찾기 페이지 관련
│   │   ├── template              # 여러 작은 컴포넌트가 결합된 템플릿
│   │   ├── vote                  # 투표 목록 페이지 관련
│   │   ├── votedetail            # 투표 상세 페이지 관련
│   │   ├── App.tsx
│   ├── data                      # recoil 상태 관련 데이터를 담은 폴더
│   ├── hooks                     # firebase로 문서를 다루거나 투표하기 같은 특정 로직들을 담은 폴더
│   ├── routes
│   ├── theme
│   ├── util                      # 전역에서 사용하는 간단한 함수를 담은 폴더
│   ├── firebase.tsx              # firebase 설정 파일
│   ├── index.tsx
│   └── Router.tsx
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

<br/>

### [3. 한페이지 독서모임 기록관리 앱의 기능 소개](#목차-3-한페이지-독서모임-기록관리-앱의-기능-소개)

#### 3-0. 반응형 웹사이트 제작

✔️ 모바일 중심의 반응형 웹사이트로 제작하였습니다.

![무제 3 001](https://user-images.githubusercontent.com/91457443/196038864-2ff80c22-798d-42f0-99f0-1a02e3205c68.jpeg)

#### 3-1. 로그인 페이지

✔️ 로그인 모드와 게스트 모드

- 회원가입한 회원들은 Firebase 인증을 통해 로그인할 수 있으며, 회원이 아니더라도 익명 로그인을 통해 게스트로서 앱을 둘러볼 수 있습니다.(하지만 게스트 모드에서는 쓰기 기능이 제한됩니다!)

✔️ 비밀번호 찾기

- 회원 멤버들은 회원가입할 때 사용한 계정 이메일을 통해 비밀번호 재설정 링크를 전달받을 수 있습니다.

#### 3-2. 회원가입 페이지

✔️ 회원가입 절차를 통한 회원 정보 등록

- 각 멤버의 정말 간단한 개인정보(이름, 성별)와 좋아하는 책분야를 서버에 등록합니다.

#### 3-3. 홈 페이지

✔️ 독서모임의 전체적인 일정과 정보들을 한눈에 볼 수 있는 페이지

#### 3-4. 지난 책모임 페이지

✔️ 지난 모임의 기록들을 볼 수 있는 페이지

- 지난 모임의 기록들을 볼 수 있으며, 기록물들을 수정하거나 삭제할 수 있습니다.

#### 3-5. 이달의 책모임 페이지

✔️ 이달의 책과 관련된 글을 작성하는 페이지

- <strong>추천책 | 발제문 | 모임 후기</strong> 이렇게 세가지 작성 카테고리로 구분되어 있습니다.
- 추천책 카테고리에서 추천하고 싶은 책은 카카오 도서 검색 api로 정보를 찾아 해당 정보를 등록할 수 있습니다.

#### 3-6. 투표하기 페이지

✔️ 투표함을 등록할 수 있는 페이지

<img width="50%" src="https://user-images.githubusercontent.com/91457443/196051874-ff50a234-9c2d-4b0a-85f6-703f42503111.gif">

- 모든 멤버는 투표함을 등록하거나 등록한 투표함을 삭제할 수 있습니다.
- 투표 항목에 대해 중복 선택이 가능합니다.
- 다시 투표하기가 가능합니다.
- 퍼센테이지로 득표율이 나타납니다.
- 하단에 투표를 완료한 멤버의 아이디가 나타납니다.

#### 3-7. 나의 책장 페이지

✔️ 내가 작성한 기록물들을 볼 수 있는 페이지

- 내가 추천한 책이나 발제문, 모임 후기 등을 볼 수 있습니다.

#### 3-8. 설정 페이지

- 프로필을 업데이트할 수 있습니다.
- 비밀번호를 업데이트할 수 있습니다.
- 업데이트 요청글을 작성할 수 있습니다.
- 로그아웃 기능과 탈퇴 기능이 있습니다.

<br/>

<br/>

### [4. 업데이트 계획](#목차-4-업데이트-계획)

> 계속해서 독서모임 멤버들과의 논의를 통해 업데이트를 할 예정입니다!
>
> [여기서 프로젝트 진행계획과 상황을 확인하실 수 있습니다.](https://jellieplanet.notion.site/c7cdb25ca7804e75953655c7e95c1acc)
