# <div align="center"><strong>한페이지 독서모임 기록관리 앱</strong></div>

### <div align="center">✨ <strong>프로젝트에 사용한 스택</strong> ✨</div>

<div align="center">
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

#### <div align="center">✨ <strong>기타 라이브러리</strong> ✨</div>

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
  <h3>📍  프로젝트의 기획과 개발 기간</h3>
  <h4>기획: 2022.04.28 ~ 2022.05.09</h4>
  <h4>개발: 2022.05.10 ~ 계속 업데이트 중</h4>
</div>

<br/>

<div align="center">
  <h3>📍  버전 업데이트</h3>
  <h4>v2.0.0 | 2022.10.11</h4>
  <h4>개발: 2022-05-10 ~ </h4>
</div>

<br/>

###

---

<br/>

## <div align="center">🔗 목차</div>

<div align="center">

> ### [✨1. 한페이지 독서모임 기록관리 앱 프로젝트 계획 이유](#1-한페이지-독서모임-기록관리-앱-프로젝트-계획-이유)
>
> #### 1-1. 한페이지 독서모임은 무엇인가요?
>
> #### 1-2. 한페이지 독서모임 기록관리 앱을 계획한 이유
>
> ### [✨2. 프로젝트 스펙 살펴보기](#2-프로젝트-스펙-살펴보기)
>
> ### [✨3. 한페이지 독서모임 기록관리 앱의 기능 소개](#3-한페이지-독서모임-기록관리-앱의-기능-소개)
>
> #### 3-0. 반응형 앱
>
> #### 3-1. 로그인 페이지
>
> #### 3-2. 회원가입 페이지
>
> #### 3-3. 홈 페이지
>
> #### 3-4. 지난 책모임 페이지
>
> #### 3-5. 이달의 책모임 페이지
>
> #### 3-6. 투표하기 페이지
>
> #### 3-7. 나의 책장 페이지
>
> #### 3-8. 설정 페이지
>
> ### [✨4. 앞으로의 계획](#4-앞으로의-계획)

</div>

<br/>

---

<br/>

## 1. 한페이지 독서모임 기록관리 앱 프로젝트 계획 이유

> ### 1-1. 한페이지 독서모임은 무엇인가요?

<br/>

한페이지는 멤버 한명 한명이 돌아가며 책을 선정하고, 멤버가 선정한 책에 대해 서로의 생각을 나누는 독서모임입니다. 매월 독서분야를 정해 다양한 분야의 책을 읽어보고자 하고 있습니다. 모임을 만든지 1년이 지났는데 열심히 기록하지 않으면 흘러가는 아까운 생각들을 담고, 모든 멤버가 다양한 기록을 볼 수 있도록 하기 위해 제작했습니다.

이곳에서 북클럽의 모든 정보(발제, 추천책, 후기)등등을 작성할 수 있습니다. 또한 모임을 운영하는데 필요했던 투표 기능도 포함되어 있습니다.

<br/>

> ### 1-2. 한페이지 독서모임 기록관리 앱을 계획한 이유

<br/>

<strong>1. 좀 더 체계적인 기록 관리가 필요하다.</strong>

먼저 멤버들이 독서모임에서 나눈 이야기를 여기저기 중구난방으로 기록한다는 점과, 기록물을 카톡으로만 공유하다보니 나중에 기록물을 찾아보려할 때 시간이 걸리는 점 또한 문제였습니다. 또한 발제문, 추천책에 대한 글, 모임장소에 대한 글 등등 글의 분류 없이 멤버가 이야기하고 싶은 것들을 공유하니 독서모임에 체계적인 기록 시스템이 필요하다고 느꼈습니다.

<strong>2. 모두가 쉽게 이용할 수 있는 도구여야 한다.</strong>

하지만 대표적인 문서 도구인 노션 같은 경우에는 사용하지 않는 사람도 있고 구글 문서도구 같은 경우는 전체 모임 상황을 공유하기에는 적합하지 않았습니다. 또한 독서모임 관련 애플리케이션도 찾아봤지만 "독서모임"에 최적화된 애플리케이션을 찾기 어려웠습니다. 모든 멤버들이 쉽게 독서모임에 최적화된 애플리케이션을 이용하려면 직접 만드는 것이 더 좋겠다고 판단하여 기획, 개발이 이루어졌습니다.

<strong>3. "독서모임 기록물"을 위한 애플리케이션이 없다.</strong>

처음에는 독서모임 잘 운영하기 위해 관련 앱을 찾아보았습니다. 하지만 독서모임 운영에 특화된 앱을 찾기는 어려웠습니다.

<br/>

[🔗목차로 돌아가기](#div-aligncenter🔗-목차div)

---

<br/>

## 2. 프로젝트 스펙 살펴보기

  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  
  React의 hook과 컴포넌트, 상태, 렌더링 등에 대해 더욱 깊이 있는 공부를 하고 싶었고, 또한 이 프로젝트는 다수의 사람들이 대상이 아니라 특정 멤버들을 위한 앱이어서 SEO가 그렇게 중요하지 않다고 생각해 React를 선택했습니다.

  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">

타입스크립트는 이제 막 공부를 시작한 상태인데, 한번 프로젝트에 적용하며 공부해보고 싶어서 사용하게 되었습니다.

  <img src="https://img.shields.io/badge/recoil-007af4?style=for-the-badge&logo=recoil&logoColor=white">

Recoil은 일단 React 전용 전역 상태 관리 라이브러리로 React에 가장 최적화되어 있고, Redux와 달리 보일러플레이트가 많이 필요 없이 굉장히 직관적이어서 사용했습니다.

 <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black">

백엔드를 잘 모르는 상태에서 독서모임의 기록물들을 저장하고 관리하고 싶어 파이어베이스를 공부하며 사용해보았습니다!

  <img src="https://img.shields.io/badge/styled component-DB7093?style=for-the-badge&logo=styled-component&logoColor=white">
  <img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white">

CSS 라이브러리로는 Styled Component를 사용했고, 아이콘은 MUI에서 이용했습니다.

<br/>

[🔗목차로 돌아가기](#div-aligncenter🔗-목차div)

---

<br/>

## 3. 한페이지 독서모임 기록관리 앱의 기능 소개

### 3-0. 반응형 제작

✔️ 모바일 중심의 반응형

<br/>

### 3-1. 로그인 페이지

✔️ 로그인 모드와 게스트 모드

- 회원가입한 회원들은 Firebase 인증을 통해 로그인할 수 있으며, 회원이 아니더라도 익명 로그인을 통해 게스트로서 앱을 둘러볼 수 있습니다.(하지만 게스트 모드에서는 쓰기 기능이 제한됩니다!)

✔️ 비밀번호 찾기

- 회원 멤버들은 회원가입할 때 사용한 계정 이메일을 통해 비밀번호 재설정 링크를 전달받을 수 있습니다.

<br/>

### 3-2. 회원가입 페이지

✔️ 회원가입 절차를 통한 회원 정보 등록

- 각 멤버의 정말 간단한 개인정보(이름, 성별)와 좋아하는 책분야를 서버에 등록합니다.

<br/>

### 3-3. 홈 페이지

✔️ 독서모임의 전체적인 일정과 정보들을 한눈에 볼 수 있는 페이지

<br/>

### 3-4. 지난 책모임 페이지

✔️ 지난 모임의 기록들을 볼 수 있는 페이지

- 지난 모임의 기록들을 볼 수 있으며, 기록물들을 수정하거나 삭제할 수 있습니다.

<br/>

### 3-5. 이달의 책모임 페이지

✔️ 이달의 책과 관련된 글을 작성하는 페이지

- <strong>추천책 | 발제문 | 모임 후기</strong> 이렇게 세가지 작성 카테고리로 구분되어 있습니다.
- 추천책 카테고리에서 추천하고 싶은 책은 카카오 도서 검색 api로 정보를 찾아 해당 정보를 등록할 수 있습니다.

<br/>

### 3-6. 투표하기 페이지

✔️ 투표함을 등록할 수 있는 페이지

- 모든 멤버는 투표함을 등록하거나 등록한 투표함을 삭제할 수 있습니다.
- 투표 항목에 대해 중복 선택이 가능합니다.
- 다시 투표하기가 가능합니다.
- 퍼센테이지로 득표율이 나타납니다.
- 하단에 투표를 완료한 멤버의 아이디가 나타납니다.

<br/>

### 3-7. 나의 책장 페이지

✔️ 내가 작성한 기록물들을 볼 수 있는 페이지

- 내가 추천한 책이나 발제문, 모임 후기 등을 볼 수 있습니다.

<br/>

### 3-8. 설정 페이지

- 프로필을 업데이트할 수 있습니다.
- 비밀번호를 업데이트할 수 있습니다.
- 업데이트 요청글을 작성할 수 있습니다.
- 로그아웃 기능과 탈퇴 기능이 있습니다.

<br/>

<br/>

[🔗목차로 돌아가기](#div-aligncenter🔗-목차div)

---

<br/>

## 4. 앞으로의 계획

> 계속해서 독서모임 멤버들과의 논의를 통해 업데이트를 할 예정입니다!

- 북클럽 책에 대한 멤버의 평점
- 다른 멤버의 프로필 보기
- 댓글 기능 등등...

<br/>

[🔗목차로 돌아가기](#div-aligncenter🔗-목차div)
