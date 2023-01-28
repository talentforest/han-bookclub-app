# 📚 한페이지 독서모임 기록장

### 한페이지 독서모임은 무엇인가요?

> 한페이지 독서모임은 매달 멤버 한명 한명이 돌아가며 분야에 맞게 책을 선정하고, 멤버가 선정한 책에 대해 서로의 생각을 나누는 독서모임입니다.

### 한페이지 독서모임 기록장?

> 한페이지 독서모임 기록장 앱은 멤버들이 나누었던 다양한 생각을 기록하기 위해 개발했습니다. 이곳에서 한페이지 독서모임의 모든 기록(발제문, 추천하고 싶은 책, 모임 후기)등등을 작성하는 등, [독서모임 운영에 도움이 되는 기능](#1-한페이지-독서모임-기록관리-앱의-대표-기능-소개) 들이 포함되어 있습니다.

### [Demo 👀](https://talentforest.github.io/han-bookclub-app/)

<div>
  <img src="https://user-images.githubusercontent.com/91457443/214667631-d1b0bdf4-55b1-4bdc-8365-495a7157b794.png" width="30%">
  <img src="https://user-images.githubusercontent.com/91457443/214668136-bce02d97-831f-4744-a513-32862ce99a4a.png" width="65%">
</div>

<br/>

## 프로젝트에 사용한 스택

<div>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
  <img src="https://img.shields.io/badge/recoil-007af4?style=for-the-badge&logo=recoil&logoColor=white">
  <img src="https://img.shields.io/badge/styled component-DB7093?style=for-the-badge&logo=styled-component&logoColor=white">
  <img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white">
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black">
  <img src="https://img.shields.io/badge/react quill-333?style=for-the-badge&logoColor=black">
</div>

<br/>

## 프로젝트의 기획부터 개발 기간

| 기획                    | 개발                                |
| ----------------------- | ----------------------------------- |
| 2022.04.20 ~ 2022.04.27 | 2022.04.28 ~ 22.06.30 (버전 v1.0.0) |

- 계속 기능 업데이트중

| 버전  | 날짜     |
| ----- | -------- |
| 1.0.0 | 22.06.30 |
| 1.0.1 | 22.07.03 |
| 1.1.1 | 22.08.31 |
| 1.1.2 | 22.09.03 |
| 1.2.2 | 22.10.11 |
| 1.3.2 | 22.11.03 |

[진행과정](https://jellieplanet.notion.site/c7cdb25ca7804e75953655c7e95c1acc)

<br/>

## 목차

> ### [목차 1. 한페이지 독서모임 기록관리 앱의 대표 기능 소개](#1-한페이지-독서모임-기록관리-앱의-대표-기능-소개)
>
> - #### 반응형 웹페이지
>
> - #### 로그인과 회원가입
>
> - #### 이달의 도서에 대한 글 작성, 수정, 삭제 기능
>
> - #### 카카오 도서 검색 API를 통한 도서 검색 기능
>
> - #### 카카오톡으로 공유 기능
>
> - #### 투표 기능
>
> - #### 프로필 수정 기능
>
> ### [목차 2. 프로젝트 스펙과 구조 살펴보기](#2-프로젝트-스펙과-구조-살펴보기)
>
> - #### 스펙
>
> - #### 파일 구조
>
> - #### 데이터 구조
>
> ### [목차 3. 업데이트 계획](#3-업데이트-계획)

<br/>

### [1. 한페이지 독서모임 기록관리 앱의 대표 기능 소개](#목차-1-한페이지-독서모임-기록관리-앱의-대표-기능-소개)

### 반응형 웹사이트 제작

- 모바일 중심의 반응형 웹사이트로 제작하였습니다.

<div>
  <img src="https://user-images.githubusercontent.com/91457443/214667631-d1b0bdf4-55b1-4bdc-8365-495a7157b794.png" width="30%">
  <img src="https://user-images.githubusercontent.com/91457443/214668136-bce02d97-831f-4744-a513-32862ce99a4a.png" width="65%">
</div>

### 로그인과 회원가입

- 로그인과 익명 로그인, 비밀번호 찾기 기능

  - 모두 Firebase 인증 기능을 이용하였습니다. 회원가입한 회원이 아니더라도 익명 로그인을 통해 앱을 둘러볼 수 있습니다.(하지만 익명 로그인에서는 작성, 투표 기능 등등이 제한됩니다.)

<div>
  <img src="https://user-images.githubusercontent.com/91457443/214671999-732e61dd-4fb5-4f7d-bf02-4b6054076d6b.png" width="25%">
  <img src="https://user-images.githubusercontent.com/91457443/214672709-715d9cb3-12f0-46af-9fcc-a78b4d38d06c.png" width="25%">
  <img src="https://user-images.githubusercontent.com/91457443/214672815-7e42307b-716c-456a-8847-945790d3eb12.png" width="25%">
</div>

- 회원가입 절차를 통한 회원들의 정보 등록
  - 각 멤버의 이름과 성별, 좋아하는 책분야 정보를 Firebase에 database에 저장합니다.

### 이달의 도서에 대한 글 작성, 수정, 삭제 기능

- <strong>추천한 책 | 발제문 | 모임 후기</strong> 이렇게 세가지 작성 카테고리로 구분되어 있습니다.

<div>
  <img src="https://user-images.githubusercontent.com/91457443/214677737-888c587c-55c8-437c-9362-b19a4e52a972.png" width="40%">
  <img src="https://user-images.githubusercontent.com/91457443/214678075-a9c5b318-80b7-4bf1-8cca-341514016e8f.png" width="25%">
</div>

### 카카오 도서 검색 API를 통한 도서 검색 기능

- 추천한 책 카테고리에서 추천하고 싶은 책은 카카오 도서 검색 api로 정보를 찾아 해당 정보를 등록할 수 있습니다.

<div>
  <img src="https://user-images.githubusercontent.com/91457443/214673665-0b047c4c-96e6-447e-84c9-910ca8c88c78.png" width="25%">
  <img src="https://user-images.githubusercontent.com/91457443/214673785-001ff35e-8b17-4316-be2f-84870f8a060c.png" width="25%">
</div>

### 투표하기 기능

- 투표함을 등록할 수 있는 페이지
  - 모든 멤버는 투표함을 등록하거나 자신이 등록한 투표함을 삭제할 수 있습니다.
  - 투표 항목에 대해 중복 선택이 가능합니다.
  - 퍼센테이지로 득표율이 나타납니다.
  - 하단에 투표를 완료한 멤버의 아이디가 나타납니다.

<div>
  <img src="https://user-images.githubusercontent.com/91457443/214675710-065c4e2e-e9a4-42d0-80bd-b553874a7274.png" width="25%">
  <img src="https://user-images.githubusercontent.com/91457443/214675800-91cf8e0f-8840-474d-b951-562a301bbe48.png" width="25%">
</div>

### 프로필 수정 기능

- 설정의 프로필 수정하기 페이지로 들어가서, 이름, 좋아하는 책분야를 수정할 수 있습니다.
- 프로필 이미지를 변경할 수 있습니다.
  - 이미지를 저장하는 Firebase의 Storage는 한정되어 있기에 유저가 프로필 이미지를 변경하면 이전 이미지는 삭제되고 새로운 이미지가 저장됩니다.

### 카카오톡으로 공유 기능

- 작성된 글과 모임 시간, 장소는 카카오톡으로 공유할 수 있습니다.

<br/>

[Demo 👀](https://talentforest.github.io/han-bookclub-app/)를 보시면 더 다양한 기능들을 보실 수 있습니다.

<br/>
<br/>

### [2. 프로젝트 스펙과 구조 살펴보기](#목차-2-프로젝트-스펙과-구조-살펴보기)

> 스펙

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> React의 hook과 컴포넌트, 상태, 렌더링 등에 대해 더욱 깊이 있는 공부를 하고 싶었고, 또한 이 프로젝트는 다수의 사람들이 대상이 아니라 특정 멤버들을 위한 앱이어서 SEO가 그렇게 중요하지 않다고 생각해 React를 선택했습니다.

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> 조금 규모가 있는 프로젝트에서는 타입스크립트가 유지보수와 추후 기능 업데이트에 도움이 된다고 생각해 선택했습니다.

<img src="https://img.shields.io/badge/recoil-007af4?style=for-the-badge&logo=recoil&logoColor=white"> Recoil은 일단 React 전용 전역 상태 관리 라이브러리로 React에 가장 최적화되어 있고, Redux와 달리 보일러플레이트가 많이 필요 없이 굉장히 직관적이어서 사용했습니다.

<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black"> 독서모임의 기록물들을 저장하고 관리하고 싶어 서버리스의 파이어베이스를 공부하며 사용해보았습니다.

> 파일 구조

```bash
.root
├── node_modules
├── public
├── src
│   ├── api  # 서버와 통신하는 API, (ex.카카오톡 도서 검색, Firebase 문서 데이터 검색)
│   ├── component
│   │   ├── atom  # 전역에서 재사용되는 가장 작은 컴포넌트
│   │   ├── organisms  # 여러개의 atom들을 조합한 컴포넌트
│   │   │   ├── bookclubhistory
│   │   │   ├── bookclubthismonth
│   │   │   ├── home
│   │   │   ├── login
│   │   │   ├── mybookshelf
│   │   │   ├── search
│   │   │   ├── setting
│   │   │   ├── vote
│   │   │   ├── votedetail
│   │   ├── template  # 페이지의 한 부분을 차지하는 컴포넌트
│   │   ├── App.tsx
│   ├── data  # recoil 상태 관련 데이터를 담은 폴더
│   ├── hooks
│   ├── layout
│   ├── routes
│   ├── theme
│   ├── util
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

> 데이터 구조

데이터가 필요한 컴포넌트에서 firebase의 실시간 수신 리스너 API를 통해 데이터를 불러오는 구조입니다. 모임 후기를 보여주는 컴포넌트에서 `useEffect`를 통해 데이터를 불러 클라이언트 상의 recoil 상태에 저장합니다. 하지만 컴포넌트가 재랜더링되었을 때 이미 필요한 데이터가 상태에 있다면 firebase에서 데이터를 불러오지 않는 구조로 불필요한 데이터 요청을 막았습니다. 또한 어떤 값을 서버에 업데이트 했을 때에도 이미 클라이언트 상의 recoil 상태에서 업데이트가 되어 있기 때문에 서버에서 업데이트된 값을 또 불러오지 않으며 `useEffect`의 의존성 배열을 통해 값의 변화를 재랜더링합니다.

#### Example

```Typescript
  const Home = () => {
    const [thisMonthClub, setThisMonthClub] = useRecoilState(thisMonthClubState);
    // recoil의 상태에 이번달 클럽 데이터 저장한다.

    useEffect(() => {
      if (!existDoc(thisMonthClub)) { // recoil에 이번달 클럽 데이터가 없는 경우에만 서버에서 데이터 가져온다.
        getDocument(THIS_YEAR_BOOKCLUB, `${thisYearMonthIso}`, setThisMonthClub);
      }
    }, [thisMonthClub]); // 이번달 클럽 데이터 값이 바뀌면 useEffect가 재실행되지만 recoil에 이미 이전 데이터가 있고, 그 데이터가 업데이트된 상태를 사용하므로 서버에서 불러오지 않는다.

    return (
      {/* ... */}
    )
  }

```

<br/>

### [3. 업데이트 계획](#목차-3-업데이트-계획)

> 계속해서 독서모임 멤버들과의 논의를 통해 업데이트를 할 예정입니다!
>
> [여기서 프로젝트 진행계획과 상황을 확인하실 수 있습니다.](https://jellieplanet.notion.site/c7cdb25ca7804e75953655c7e95c1acc)
