# 📚HanPage Book club App

## 한페이지 소개

> 한페이지는 멤버 한명 한명이 돌아가며 책을 선정하고, 멤버가 선정한 책에 대해 서로의 생각을 나누는 독서모임입니다. 매월 독서분야를 정해 다양한 분야의 책을 읽어보고자 하고 있습니다. 모임을 만든지 1년이 지났는데 열심히 기록하지 않으면 흘러가는 아까운 생각들을 담고, 모든 멤버가 다양한 기록을 볼 수 있도록 하기 위해 제작했습니다.
>
> 이곳에서 북클럽의 모든 정보(발제, 추천책, 후기)등등을 작성할 수 있습니다. 또한 모임을 운영하는데 필요했던 투표 기능도 포함되어 있습니다.

<br/>

---

<br/>

## 한페이지 프로젝트 계획 이유

> 1. 좀 더 체계적으로 기록하는 것이 필요하다.
>
> 독서모임을 하며 나눴던 인상적이었던 말들이 기록하지 않았더니 기억이 나지 않는 것을 깨닫자 기록의 필요성을 강하게 느꼈습니다. 기록했다 하더라도 여기저기 중구난방으로 기록하고 공유하다보니 나중에 찾아보려할 때 시간이 걸리는 점 또한 개선되어야 할 사항이었습니다. 또한 분류 없이 이것저것 개인이 이야기하고 싶은 것들을 공유하니 독서모임에 체계적인 기록 시스템이 필요하다고 느꼈습니다.
>
> 2. 모두가 쉽게 이용할 수 있는 도구 만들기
>
> 하지만 대표적인 문서 도구인 노션 같은 경우에는 사용하지 않는 사람도 있고 구글 문서도구 같은 경우는 전체 모임 상황을 공유하기에는 적합하지 않았습니다. 또한 독서모임 관련 애플리케이션도 찾아봤지만 "독서모임"에 최적화된 애플리케이션을 찾기 어려웠습니다. 모든 멤버들이 쉽게 독서모임에 최적화된 애플리케이션을 이용하려면 직접 만드는 것이 더 좋겠다고 판단하여 기획, 개발이 이루어졌습니다.
>
> 3. 가장 최종적으로 "독서모임"에 최적화된 애플리케이션이 없다.
>
> 처음에는 독서모임을 잘 유지하고 진행하기 위해 모임 관련 애플리케이션을 찾아보았습니다. 하지만 비슷한 관심을 가진 사람들의 모임을 연결해주는 앱이 많았으며 그 모임이 꾸준히 오래 잘 진행되고 기록물을 관리할 수 있게 만들어줄 수 있는 앱은 찾기 쉽지 않았습니다. 또한 도서 관련 앱도 기록할 수 있다는 점에서는 좋았으나 '팀'으로 관리해주는 앱은 찾기 힘들었습니다.

<br/>

---

<br/>

## 한페이지 기능 소개

> 한페이지는 웹앱을 중점으로 반응형으로 제작되었습니다.
>
> 모든 기록물들은 firebase에 저장됩니다.

<br/>

### 로그인 화면

---

#### 로그인

#### 회원가입

- 각 멤버의 간단한 개인정보와 취향 서버에 등록

#### 게스트 모드

>

<br/>

### 홈

---

#### 모임의 전체적인 일정 파악 가능합니다.

- 이달의 책정보
- 이달의 모임 일정
- 독서 분야 일정
  <br/>
  <br/>

### 이달의 책모임

---

- 이달의 책에 대한 글을 작성, 수정, 삭제할 수 있습니다.
- `발제문 | 추천책 | 모임 후기` 카테고리 구분되어 있습니다.
- 추천책 카테고리에서 추천하고 싶은 책은 카카오 도서 검색 api로 정보를 찾아 해당 정보를 등록할 수 있습니다.

<br/>
<br/>

### 지난 책모임 기록

---

- 지난 모임의 기록들을 볼 수 있습니다.
- 지난 모임의 기록물들을 수정, 삭제할 수 있습니다.

<br/>
<br/>

### 투표하기

---

- 모든 멤버는 원하는 투표 생성이 가능합니다.
- 중복 투표가 가능합니다.
- 다시 투표하기가 가능합니다.
- 퍼센테이지로 득표율이 나타납니다.
- 밑에 투표를 완료한 멤버의 아이디가 나타납니다.

<br/>
<br/>

### 나의 책장

---

- 내가 작성한 기록물들을 볼 수 있습니다.
- 내가 추천한 책들을 볼 수 있습니다.

<br/>
<br/>

### 설정

---

- 프로필 업데이트 기능
- 비밀번호 업데이트 기능
- 업데이트 요청글 작성
- 로그아웃 기능
- 탈퇴 기능

<br/>

---

<br/>

## 🔎 Spec

- ReactJS
  - NextJS를 사용할까 생각했지만 React를 좀 더 연습하고자 했고, 다수의 사람들이 아닌 특정 멤버들을 위한 북클럽앱이기에 SEO가 중요하지 않다고 판단해 React프레임워크를 선택하였습니다.
- Typescript

  - 여기에서 타입스크립트를 처음 사용해봤는데 정말 만족스러웠습니다. 타입스크립트 덕분에 에러가 날 뻔한 다수의 상황을 막을 수 있었습니다. 이번에 처음 사용해본 거라 타입 정의와 interface등만 쓰고, 제네릭 등은 사용하진 못했습니다. 의외로 제네릭까지 쓸 일은 없었습니다. 다음에는 좀 더 다양한 문법들을 활용해보고 타입스크립트에 좀 더 익숙해지고자 합니다.

- Kakao 책검색 api
  - 책 검색 api 에는 네이버, 알라딘 카카오 api가 있습니다. 이중 카카오가 가장 접근성이 좋고 json형식이 깔끔해 보여서 카카오 api를 선택했습니다. 하지만 책에 대한 보다 더 많은 상세정보가 필요할 시에는 알라딘 api를 사용하는 것이 좋을 듯 합니다.
- Recoil
  - 상태관리로는 recoil을 선택했는데, recoil cashing 기능을 좋아하기 때문입니다. 하지만 그래서 선택한 것 치고는 기능을 만드느라 급급해서 recoil의 selector를 제대로 활용하지 못했습니다. 이부분은 다시 코드 리팩토링을 거칠 생각입니다.
- Axios

---

## 앱 살펴보기

### [Demo](https://talentforest.github.io/han-bookclub-app/)

- gh-pages로 배포하였습니다.

---

## 추가사항

> 일단, 먼저 계속해서 리팩토링을 하고, 렌더링 최적화를 할 예정입니다.
>
> 또한 계속해서 업데이트가 이루어질 예정입니다.
>
> - 북클럽 책에 대한 멤버의 평점
> - 다른 멤버의 프로필 보기
