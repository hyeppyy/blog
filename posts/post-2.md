---
title: '[Typescript]  함수 오버로딩(Function Overloading)'
description: '123'
date: '2024년 2월 22일'
thumbnail: '/images/example.png'
tags: ['Typescript', 'react', '코딩']
---

# 함수 오버로딩

기본적인 구조는 같지만 매개변수가 다를 때 오버로딩을 이용해서 두 함수를 하나로 만들 수 있다.

## 예시

**예시 1**

```
// 함수 시그니처 선언
function add(a: number, b: number): number;
function add(a: string, b: string): string;

// 실제 함수 구현
function add(a: any, b: any): any {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  } else if (typeof a === 'string' && typeof b === 'string') {
    return a + b;
  }
  throw new Error('Invalid arguments');
}

// 함수 호출
console.log(add(1, 2)); // 3
console.log(add('hello', ' world')); // 'hello world'

```

**예시 2**

```
// 함수 시그니처 선언
function getInfo(name: string): string;
function getInfo(age: number): string;
function getInfo(name: string, age: number): string;

// 실제 함수 구현
function getInfo(arg1: any, arg2?: any): string {
  if (typeof arg1 === 'string' && typeof arg2 === 'number') {
    return `Name: ${arg1}, Age: ${arg2}`;
  } else if (typeof arg1 === 'string') {
    return `Name: ${arg1}`;
  } else if (typeof arg1 === 'number') {
    return `Age: ${arg1}`;
  }
  throw new Error('Invalid arguments');
}

// 함수 호출
console.log(getInfo('Alice')); // 'Name: Alice'
console.log(getInfo(30)); // 'Age: 30'
console.log(getInfo('Alice', 30)); // 'Name: Alice, Age: 30'

```

## 함수 오버로딩의 구현 원칙

### 시그니처 선언

함수의 여러 버전을 선언한다. 각 시그니처는 서로 다른 매개변수 타입이나 반환 타입을 가질 수 있다.

### 구현부 작성

실제 함수 구현부는 모든 시그니처를 처리할 수 있어야 한다. 이 구현부는 타입 검사에서는 any 타입을 사용하여 유연하게 작성할 수 있다.

### 타입 검사

함수 내부에서 매개변수의 타입을 검사하여 각각의 시그니처에 맞는 로직을 실행한다.
