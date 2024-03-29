# 📚 독서모임 한페이지 레코드북

### ❓ 독서모임 한페이지 레코드북이 무엇인가요?

> 제가 참여하고 있는 독서모임 한페이지를 위해 만든 어플리케이션입니다. 독서모임 한페이지는 매월 1회 모임을 진행하며, 매달 멤버들이 돌아가며 이달의 발제자가 되고, 이달의 발제자가 직접 선정한 모임책으로 서로의 생각을 나누는 독서모임입니다.
>
> 이런 독서모임 한페이지의 특성에 맞게 개발한 어플리케이션이 바로 독서모임 한페이지 레코드북입니다.

### ❓ 왜 개발했나요?

> 독서모임 한페이지 레코드는 그달의 발제문과 멤버들이 나누었던 다양한 관점과 생각들을 그냥 흘려보내지 않기 위해 개발했습니다. 다양한 배경을 가진 멤버들이 사용해야 하다보니, 노션이나 다른 모임관리 앱 같은 수단보다도 웹페이지이야말로 모든 멤버들에게 가장 접근성이 좋은 툴이라고 생각되었습니다.
>
> 그리고 독서모임 한페이지만의 특성을 담아 멤버들이 잘 이용할 수 있도록 개발했습니다. 독서모임 한페이지의 모든 기록(발제문, 추천하고 싶은 책, 모임 후기)등등을 작성하는 등, 독서모임 운영에 도움이 되는 기능들이 포함되어 있습니다.

<br/>

<div>
  <img alt="iPhone 5_SE" src="https://github.com/talentforest/han-bookclub-app/assets/91457443/54e29b44-42bf-4b32-9963-c4e39d3319c9" width="20%">
  <img alt="Nest Hub" src="https://github.com/talentforest/han-bookclub-app/assets/91457443/e46a1090-e61f-4cf7-9758-12403284f2a5" width="56%">
</div>


### [Demo 바로가기 👀](https://talentforest.github.io/han-bookclub-app/)

<br/>

## 프로젝트에 사용한 스택

<div>
  <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
  <img src="https://img.shields.io/badge/recoil-007af4?style=for-the-badge&logo=recoil&logoColor=white">
  <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled components&logoColor=white">
  <img src="https://img.shields.io/badge/github pages-222222?style=for-the-badge&logo=github pages&logoColor=white">
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/react quill-333?style=for-the-badge&logoColor=black">
</div>

<br/>

## 프로젝트의 기획부터 개발 기간

| 첫 기획                    | 개발 후 출시                         |
| ----------------------- | ----------------------------------- |
| 2022.04.20 ~ 2022.04.27 | 2022.04.28 ~ 22.06.30 (버전 v1.0.0) |

| 버전  | 날짜     | 업데이트 사항 |
| ----- | -------- |--------- |
| 1.0.0 | 22.06.30 |         |
| 2.0.0 | 24.01.20 | 전체 페이지 UI 변경, <br/> 발제문과 정리 기록 위치 변경, <br/> 챌린지 페이지, <br/> 직접 모임책 등록 기능 추가 <br/> 공유하고 싶은 문구 기능 추가 |

계속 업데이트중

<br/>

### 목차

> #### 목차 1. 독서모임 한페이지 레코드북의 대표 기능 소개
>
> - ##### 반응형 웹페이지
>
> - ##### 로그인과 회원가입, 프로필 수정
>
> - ##### 카카오 책 검색 API를 통한 책 검색 기능
>
> - ##### 이달의 모임에 대한 정보와 글 작성, 수정, 삭제 기능
>
> - ##### 카카오톡으로 공유 기능
>
> - ##### 투표 기능
>
> #### 목차 2. 프로젝트 스펙과 구조 살펴보기
>
> - ##### 스펙
>
> - ##### 파일 구조
>
> - ##### 데이터 구조
>
> #### 목차 3. 업데이트 계획

<br/>

### 1. 독서모임 한페이지 레코드북의 대표 기능 소개

#### 1) 반응형 웹사이트 제작
- styled components에서 미디어 쿼리를 활용하여 모바일 중심의 반응형 웹사이트로 제작하였습니다. 특히 데스크탑에서의 탑 네비게이션과 모바일의 바텀 네비게이션 컴포넌트를 구분하여 미디어 쿼리를 통해 각 화면에 맞게 적용하였습니다. 그 반응형 스타일로 grid 형식과 flex를 많이 활용하였습니다.

<div>
  <img alt="iPhone 5_SE 2" src="https://github.com/talentforest/han-bookclub-app/assets/91457443/f56f86b4-8b3a-4052-afe9-37b76596ecd0" width="22%">
  <img alt="Nest Hub" src="https://github.com/talentforest/han-bookclub-app/assets/91457443/b35b1d1b-5fac-4583-acde-6c9635f8f8af" width="56%">
</div>

<br/>

#### 2) 로그인과 회원가입

- 로그인과 익명 로그인, 비밀번호 찾기 기능
  - 모두 Firebase 인증 기능을 활용하였습니다.
  - 가입한 회원만이 모든 기능을 이용 가능하며, 익명 로그인을 통해 입장이 가능하지만 익명 로그인에서는 작성, 보기, 투표 기능 등등이 제한됩니다.
    - 가입된 회원인지 검증하는 custom hook을 만들어 인증이 필요한 기능을 이용하려 할 때마다 활용하였습니다. 익명의 사용자는 로그인을 요청하거나 적절한 alert 메시지를 받게 됩니다.

<div>
  <img src="https://github.com/talentforest/han-bookclub-app/assets/91457443/0351b912-5471-4248-9f41-cfa74ac93a7f" width="25%">
</div>

<br/>

#### 3) 이달의 책에 대한 글 작성, 수정, 삭제, 공유 기능

- 독서모임 한페이지는 가장 중요한 기록으로 <strong>발제문과 정리 기록</strong> 두가지가 있습니다. 이달의 발제자가 모임 전 책에 대한 발제문을 올리고, 모임 후 모임에서 나눴던 이야기를 정리하는 정리 기록을 작성하고 있습니다. 이외에도 모든 멤버들이 작성할 수 있는 추천책, 모임 후기 기능도 있습니다. 물론 모든 글이 작성뿐만 아니라 수정, 삭제가 가능하며 카카오톡으로 공유가 가능합니다.
- 발제문과 정리 기록과 같은 글을 react-quill 라이브러리를 이용하였습니다.

<div>
  <img src="https://github.com/talentforest/han-bookclub-app/assets/91457443/7b7a27d9-2a75-44d0-8b28-94227e6c8a35" width="55%">
  <img src="https://github.com/talentforest/han-bookclub-app/assets/91457443/691520a6-12be-450a-9716-f2373d31d950" width="20%">
</div>

<br/>

#### 4) 카카오 책 검색 API를 통한 책 검색 기능

- 책 정보를 검색하는 API로 카카오 책 검색 API를 사용하였습니다. 책 정보가 필요한 일이 3가지가 있는데, 멤버들이 소개하고 싶은 책, 도전하는 챌린지 책, 다음달에 등록할 책 이렇게 3가지가 있습니다. 카카오 책 검색 api로 정보를 찾아 해당 책정보를 찾고 등록할 수 있습니다.

<div>
  <img src="https://github.com/talentforest/han-bookclub-app/assets/91457443/030b1bf2-8f83-486f-81bb-eab7a81b5827" width="25%">
</div>

<br/>

[Demo 👀](https://talentforest.github.io/han-bookclub-app/)를 보시면 더 다양한 기능들을 보실 수 있습니다.

<br/>
<br/>

### 2. 프로젝트 스펙과 구조 살펴보기

> 스펙

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> React의 hook과 컴포넌트, 상태, 렌더링 등에 대해 더욱 깊이 있는 공부를 하고 싶었고, 또한 이 프로젝트는 다수의 사람들이 대상이 아니라 특정 멤버들을 위한 웹페이지이기 때문에 SEO가 중요하지 않았습니다.

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> 규모가 있는 프로젝트에서는 유지보수와 추후 기능 업데이트적인 부분에서 타입스크립트는 필수라고 생각했습니다.

<img src="https://img.shields.io/badge/recoil-007af4?style=for-the-badge&logo=recoil&logoColor=white"> Recoil은 일단 React 전용 전역 상태 관리 라이브러리로 React에 가장 최적화되어 있고, Redux와 달리 보일러플레이트가 많이 필요 없이 굉장히 직관적이어서 사용했습니다.

<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black"> 독서모임의 기록물들을 저장할 곳으로 파이어베이스가 서버리스에서 가장 입문하기 좋다고 생각되어 공부하며 사용해보았습니다.

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

프로젝트 규모가 점점 커지다 보니 효율적인 파일 구조에 대한 필요성을 많이 느끼게 되었고, 좋은 파일 구조란 무엇일지에 대한 고민을 많이 했는데요. 일단 파일 구조에서 폴더는 저마다의 확실한 기준을 갖고자 노력했습니다. 그러면서 아토믹 디자인 시스템을 한번 활용해 보았는데, 확실히 이전의 라우트 기반 파일 구조보다 좀더 생산성과 유지보수적인 측면에서 개선되었다는 느낌이 받았습니다. 하지만 아토믹 디자인 원칙을 활용하면서 아쉬운 부분이 조금 있었는데요. 제가 고민했던 효율적인 파일 구조에 대해 더 읽어보고 싶으신 분들은 [여기 노션](https://www.notion.so/jellieplanet/4d703d89a3f14640a69e84f60aa1de94?pvs=4)에서 읽어보셔도 좋을 것 같습니다.

<br/>

### 3. 업데이트 계획

> 계속해서 독서모임 멤버들과의 논의를 통해 업데이트를 할 예정입니다!
