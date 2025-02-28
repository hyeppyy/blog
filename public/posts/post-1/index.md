---
title: '[React] useRef'
description: '날씨가 좋당'
date: '2024년 02월 27일'
thumbnail: '/images/thumbnail/1.png'
tags: ['react', 'useRef']
---

# useRef의 기능

useState의 장점은 값이 업데이트되지만 화면에 보여줘야하기 때문에 **매번 리랜더링이 일어난다는 것**이다. useState가 너무 많으면 성능에 좋지는 않다.
반면에 변수는 랜더링되지는 않지만, 성능면에서는 useState보다 더 좋다. 그래서 등장한 것이 useRef로, **useRef는 값을 유지시켜주는 변수이다. useState 처럼 UI를 업데이트 하지는 않는다.**

## 1. 저장 공간으로서의 기능

useRef가 주는 값은 '객체'이다. 그리고 객체안에 current라는 값이 들어있다. **즉, 객체에 있는 값에 접근하기 위해서 current라는 값을 이용해야 한다.**
![](https://velog.velcdn.com/images/hjkwon/post/44f5fa8b-6b6e-4675-9a3c-e27a4612016e/image.png)

변수처럼 값을 저장할 필요가 있는 변수. UI에 보일 필요가 없는 애들은 useRef를 사용하면 된다.
불필요한 서버 호출을 막고싶을때. 예를들면 검색창에서 이전에 검색한 단어는 다시 검색하지 못하도록 막을 때 사용할 수 있다.

### 예제

prevInputValueRef는 UI에 보여줄 필요가 없기 때문, 전에 입력한 검색값을 단순히 저장하는 용도이다.

```
function Search() {
	const [inputValue, setInputValue] = useState('');
    const prevInputValueRef = useRef('');
    const fetchSearch = () => {
    	console.log('api호출 시작')
        //호출 내용
    }

    const handleSearch = () =>{
    	if (prevInputValueRef.current !== inputValue) {
        	fetchSearch();
            prevInputValueRef.current = inputValue;
        }
        //값이 같으면 검색하지 않는다.
    }

    return (
    	<div>
        	<input
            	type='text'
                value={inputValue}
                onChange={(e)=>{setInputValue(e.target.value)}}
                placeholder='검색어를 입력해주세요.'
            />
            <button onClick={handleSearch}>검색</button>
        </div>
    )
}
```

## 2. Dom요소를 선택하는 기능

리액트를 사용하면 js + html = JSX 이기때문에 document.queryselector같이 직접 돔을 잡을일이 거의 없다. 하지만 Dom을 잡을 일이 아예 필요없는 것은 아니다. 애니메이션이나 포커스를 줄 때 사용할 수 있다.

### 예제1

검색버튼을 클릭하면 input에 포커스를 주는 예제이다.

```
function App() {
    const InputEl = useRef('');

	const handleFocus= () => {
    	InputEl.current.focus()
    }

    return (
    	<div>
        	<input
            	type='text'
                ref={InputEl}
            />
            <button onClick={handleFocus}>검색</button>
        </div>
    )
}
```

### 예제2

Top버튼을 누르면 화면 위로 올라가는 예제이다.

> **scrollIntoView 매소드**
> scrollIntoView가 호출하면 호출된 요소가 사용자에게 보여지도록 상위 요소의 스크롤이 이동된다.
> https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView

```
function ScrollToTop() {
    const topRef = useRef(null);

	const scrollToTop= () => {
    	if(topRef.current) {
        	topRef.current.scrollIntoView({behavior:'smooth'})
        }
    }

    return (
    	<div>
        	<div
            	ref={topRef}
            >
            	페이지 상단
        	</div>
            <button onClick={scrollToTop}>Top</button>
        </div>
    )
}
```

https://www.youtube.com/watch?v=kllWOdnU1Fg&t=61s
