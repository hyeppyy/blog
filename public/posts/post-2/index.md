---
title: '[Typescript] 제너릭(Generics)'
description: '제네릭에 대한 글'
date: '2024년 02월 22일'
thumbnail: '/images/thumbnail/2.png'
tags: ['typescript', 'Generics']
---

# 제너릭(Generics)

제너릭은 타입을 매개변수처럼 사용하는 기능이다. 즉, 특정 타입을 나중에 지정할 수 있는 타입 매개변수를 정의하고, 이를 통해 다양한 타입에 대해 동작할 수 있는 코드를 작성할 수 있다.

## 제너릭 함수

제너릭 함수를 사용하면 다양한 타입의 매개변수를 받아들일 수 있는 함수를 정의할 수 있다. 제너릭 타입 매개변수는 함수의 타입에 전달되어 함수 호출 시 구체적인 타입으로 대체된다.

```
// 제너릭 함수 예시
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("hello"); // 타입이 string으로 지정됨
let output2 = identity<number>(42); // 타입이 number으로 지정됨

```

T 말고 다른 문자를 넣어도 되지만, 관습적으로 T를 사용한다.

## 제너릭 인터페이스

인터페이스에서 제너릭을 사용하여 다양한 타입을 지원하는 구조를 정의할 수 있다.

```
interface GenericIdentity<T> {
  value: string;
  option: T;
}

const numberIdentity: GenericIdentity<{price: number}> = {
  value: "hello",
  option: {
  	price: 1000
  }
};

const booleanIdentity: GenericIdentity<boolean> = {
  value: "a",
  option: true
};

```

## 제너릭 클래스

클래스에서도 제너릭을 사용할 수 있다. 이를 통해 다양한 타입을 지원하는 클래스 정의가 가능하다.

```
class Box<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

let stringBox = new Box<string>("hello");
console.log(stringBox.getValue()); // "hello"

let numberBox = new Box<number>(42);
console.log(numberBox.getValue()); // 42

```

## 제너릭 제약 조건

제너릭 타입에 제약 조건을 추가하여 특정 타입만 허용하도록 할 수 있다. 이는 제너릭이 특정 인터페이스나 클래스의 속성을 가져야 하는 경우에 유용하다.

```
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(item: T): void {
  console.log(item.length);
}

logLength("hello"); // 문자열은 length 속성이 있음
logLength([1, 2, 3]); // 배열은 length 속성이 있음
// logLength(123); // 오류: 숫자는 length 속성이 없음

```
