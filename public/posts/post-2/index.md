---
title: '나의 기술 블로그 제작기'
description: 'Next.js로 만들었습니다.'
date: '2025년 03월 10일'
thumbnail: '/images/thumbnail/2.png'
tags: ['Typescript', 'Next.js']
---

## 블로그를 제작하게 된 이유

부트캠프를 통해 여러 프로젝트를 진행하면서 **기록의 중요성**에 대해 깨달았다. 그때 발생한 트러블슈팅이나 느낀점을 바로바로 적어 놓지 않으면 나중에 기억하기가 힘들다. 그래서 노션으로 트러블슈팅 등 개발과 관련된 문서를 정리했었지만, 개인 노션이라 많은 사람들과 글 공유가 힘들었다. 확실히 여러 사람에게 공유되는 편이 책임감을 높이는데 좋다는 생각이 들어 개인 블로그를 만들어야겠단 결심이 생겼다.

## 기술 스택과 선정 이유

<img src="https://img.shields.io/badge/Next.js-000000.svg?style=for-the-badge&logo=Next.js&logoColor=white">

기술 블로그를 만들기 전, 스터디를 통해 Next.js에 대해 공부했었는데 그때 아래의 이유들로 블로그에 Next.js를 사용해 봐야겠다는 생각을 했다.

### 1. 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)

기본적으로 React는 CSR(Client-Side Rendering) 기반이라 브라우저에서 모든 렌더링이 이루어진다. 하지만 Next.js는 SSR, CSR, ISR, SSG 등 다양한 렌더링 방식을 제공한다. **즉, 개발자는 각 페이지의 특성과 요구사항에 맞는 최적의 렌더링 방식을 선택할 수 있다.**

- SEO(검색 엔진 최적화)에 유리
- 초기 페이지 로딩 속도 향상
- 다양한 렌더링 방식 제공(SSR, CSR, ISR, SSG 등)

기존 React였다면 SSR이나 SSG를 사용하기 위해 추가적으로 작업을 해줘야 했겠지만 Next.js는 쉽게 여러 렌더링 방식을 적용할 수 있었다. **특히 블로그 포스트 데이터를 받아오는 부분을 SSG를 통해 처리하여 눈에 띄는 로딩속도 개선을 만들었다.(로딩속도는 SSG가 가장 빠르며, SEO 최적화 또한 SSG가 가장 유리하다.)**

---

\*서버 사이드 렌더링(SSR): 웹 페이지를 서버에서 미리 렌더링하여 클라이언트에게 전송하는 방식

\*정적 사이트 생성(SSG): 웹 페이지를 빌드 시점에 미리 생성하여 정적 HTML 파일로 저장하는 방식

### 2. 파일 시스템 기반의 경로 설정

폴더 구조가 자동으로 라우팅 구조로 변환되기 때문에 React Router나 다른 라우팅 라이브러리에서 필요한 별도의 라우팅 설정 파일이나 코드가 필요 없다.
**이전 React 프로젝트에서 계속 바뀌는 라우팅에 고통받다가 Next.js의 자동 라우팅을 경험해보니 천국이 따로 없었다..**

- **자동 라우팅**: **app** 디렉토리 내의 폴더 구조가 그대로 URL 경로가 된다. 예를 들어, **app/products/category/page.js** 파일은 자동으로 **/products/category** URL에 매핑된다.
- **동적 라우팅**: **[paramName]** 형식의 폴더명을 사용하여 동적 라우팅도 쉽게 구현할 수 있다.

### 3. TypeScript, Tailwind CSS 지원

Next.js는 **기본적으로 TypeScript와 Tailwind CSS를 지원한다.** 설치 과정 중에 TypeScript, Tailwind CSS를 사용할지 묻는 옵션이 제공되며 이때 'Yes'를 선택하면 프로젝트에 자동으로 설정되기 때문에 따로 깔아줄 필요가 없어서 편리하다.

<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=black">

타입스크립트는 여태 프로젝트에서 꾸준히 써왔다. **프로젝트 시 타입이 명확하여 코드의 안정성이 높아지고 코드 작성 중에 타입 오류를 사전에 발견하여 런타임 오류를 줄일 수 있다는 장점이 있어 사용했다.**

<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?&style=for-the-badge&logo=TailwindCSS&logoColor=white">

원래도 CSS 라이브러리는 사용할 생각이었다. 개인 블로그 프로젝트이기 때문에 퍼블리싱에 지나치게 긴 시간을 사용하고 싶지 않았기 때문이다. 하지만 그중, 테일윈드를 선택한 이유 **첫 번째는 Next.js와의 호완성** 때문이다. 위에서 말했듯이 Next.js는 기본적으로 Tailwind CSS을 제공하여 따로 설치할 필요가 없었다.

**두 번째는 다크 모드 및 반응형 디자인이 편리하기 때문**이다. dark: 프리픽스로 다크 모드 지원 가능하고 sm, md, lg, xl 유틸리티 클래스 제공하여 미디어 쿼리 없이 반응형 디자인 가능하다. 실제로 블로그를 제작하며 해당 기능에서 큰 편리함을 느꼈다.

<img src="https://img.shields.io/badge/Vercel-000000.svg?style=for-the-badge&logo=Vercel&logoColor=white">

Next.js는 Vercel이 만든 프레임워크이다. 따라서 Vercel에서 최적화된 배포 환경을 제공하고 있다. 블로그 같은 작은 프로젝트는 Next.js를 배포하기 가장 쉬운 플랫폼인 Vercel을 사용하는 게 좋다고 판단했다.

## 마치며

블로그의 완성된 모습을 보니 역시 만들길 잘했다는 생각이 든다. 특히 Next.js와 테일윈드를 한 번 써보니 너무너무 편해서 앞으로도 계속 사용해야겠다는 생각이 들었다. 블로그를 만들며 발생한 트러블슈팅과 배운 점은 앞으로 포스트로 써내려내 갈 생각이다.

**앞으로 이 블로그를 통해 '기록하는 습관'을 키워, 같은 문제를 반복해서 겪지 않도록 정리하면서 문제 해결 능력을 키웠나갈 수 있었으면 좋겠다.**
