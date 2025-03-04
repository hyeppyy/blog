---
title: 'Next.js PageProps 타입 에러'
description: '블로그 제작 중, 해당 에러가 발생했다. 에러 메시지를 보면 컴포넌트의 params 속성이 예상된 타입과 일치하지 않는다고 한다.'
date: '2024년 03월 04일'
thumbnail: '/images/thumbnail/1.png'
tags: ['트러블슈팅', 'Typescript', 'Next.js']
---

# PageProps 타입 에러

블로그 제작 중, 해당 에러가 발생했다. 에러 메시지를 보면 컴포넌트의 params 속성이 예상된 타입과 일치하지 않는다고 한다.

```
src/app/[slug]/page.tsx
Type error: Type '{ params: { slug: string; }; }' does not satisfy the constraint 'PageProps'.
  Types of property 'params' are incompatible.
    Type '{ slug: string; }' is missing the following properties from type 'Promise<any>': then, catch, finally, [Symbol.toStringTag]
```

## 발생 원인

프로젝트에서 Next.js 15 버전 사용 중이었는데, app 폴더 하위에서 post 페이지를 동적으로 불러오는 동적 라우팅의 타입이 **13버전 부터 Promise 타입으로 변경**되어서 발생하는 문제이다.

Next.js 13 이상부터는 'params'와 'searchParams'가 비동기적으로 로드되는 데이터를 포함해야 할 경우, Promise 타입으로 처리해야 한다.

아래 코드에서는 **params 객체의 타입을 Promise가 아닌 { slug: string }로 지정하고 있어 문제가 발생한다.**

**문제 코드**

```
// src/app/[slug]/page.tsx
import { getPost } from '@/utils/posts';


const DetailPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const post = await getPost(slug);
  const toc = await extractTableOfContents(post.content);

  const flattenedHeadings = toc.flatMap((item) => {
    const result = [item];
    if (item.children) {
      result.push(...item.children);

      item.children.forEach((child) => {
        if (child.children) {
          result.push(...child.children);
        }
      });
    }
    return result;
  });
```

### Next.js 12 및 이전 버전 (Pages Router)

Next.js 12 및 이전 버전에서는 params를 처리할 때 동기적으로 전달되며, getStaticProps 또는 getServerSideProps에서 데이터를 받아오는 방식으로 사용되었다. params는 단순히 URL 파라미터로 제공되며, 비동기 처리가 필요하지 않았다.

```
// Next.js 12 이하에서는 `params`가 비동기 처리가 없이 직접적으로 전달됨
export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPost(slug);

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  // 경로를 동적으로 생성할 때 사용
  const paths = getAllPosts().map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}
```

### Next.js 13+ (App Router 도입)

Next.js 13 이후부터 App Router가 도입되었다. params가 async 함수에서 처리되며, 해당 값은 Promise로 반환된다. 이로 인해 params를 처리할 때 비동기적으로 데이터를 가져오는 형태로 바뀌었다.

```
// Next.js 13 이상에서는 `params`가 비동기적으로 처리되며,
// `async` 함수 안에서 `params`를 사용할 때 `Promise`가 반환됨
export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params; // 여기서 params는 비동기적으로 해결됨
  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.description,
  };
};

```

## 해결 방법

params 타입을 Promise 타입으로 변경해주었다.
불러온 값을 사용하기 위해서는 서버 컴포넌트인 경우, await 키워드를 사용해 필요한 값을 추출하고 클라이언트 컴포넌트인 경우, use 훅을 사용해 필요한 값을 추출한다. 예시 코드에서는 서버 컴포넌트이기 때문에 await 키워드를 사용했다.

**수정된 코드**

```
type Params = { slug: string };

export const generateMetadata = async ({
  params,
}: {
  params: Params;
}): Promise<Metadata> => {
  const { slug } = params;
  const post = await getPost(slug).catch(() => null);
};

const DetailPage = async ({ params }: { params: Params }) => {
  const { slug } = params;

  let post;
  try {
    post = await getPost(slug);
  } catch {
    return <div>포스트를 찾을 수 없습니다</div>;
  }
```
