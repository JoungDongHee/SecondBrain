---
title: JAVA 의 변수 기본형 과 참조형
create: 2024-01-26 20:54
keyword:
  - 기본형
  - 참조형
tags:
  - Java
  - 공부
  - Area
---

자바에는 총 2가지 타입이 존재한다. 

## 기본형

기본형 타입은 말 그대로 자바의 기본 형 이라고 할수 있는 타입이다. 
1. 논리형 : boolean
2. 문자형 : char
3. 정수형 : 
	1. byte 
	2. short
	3. int
	4. long
4. 실수형: 
	1. float
	2. double

위에서 언급한 것 모두 기본형 타입이며 기본형 타입의 경우 몇가지 특징이 존재한다.
1. 소문자로 시작 한다
2. 기본값이 존재한다. 
	1. ex) int 의 기본값은 0 이다. 
3. 변수의 선언과 동시에 생성된다.
4. 기본형은 더하기 , 빼기등 값을 그대로 계산에 사용할수 있다

## 참조형

참조형 타입은 위 에서 언급한 기본형 타입 이외에 모든 것을 참조형 이라고 한다 .

대표적인 참조형 은 `String` 이 될수 있다.

참조형 타입의 경우 기본형 과 다르게 메모리 의 주소를 가지는 타입을 의미한다. 

예를들어  기본형의 경우 `int i = 0` 이라고 선언 할경우 i 라는 변수에는 실제 `0` 이라는 값이 저장되어 있다.

```Java
int i = 0;
```

하지만 다음과 같이 `String` 타입의 참조형 변수를 선언 할경우 

```Java
String[] name = {"학생1","학생2"}
```

실제 name 이라는 변수 명 은 주소값을 가르키고 해당 주소 값 에 값이 들어가게 된다. 

다음 처럼 말이다.

```Java
String x001 = {"학생1","학생2"}
```

이처럼 참조형 타입에는 몇가지 특징이 존재한다
1. 대문자로 시작한다.
	1. ex)String , Array , List 등
2. 메모리 의 주소 값을 참조한다.
3. 참조형 변수는 null 이 존재한다.
	1. null 이 나오는 이유는 해당 메모리에 참조할수 있는게 아무것도 없기 때문에 null 이 나오는 것이다.
4. 참조형은 참조값을 그대로 사용할수 없다.

### 참조형 의 대입

참조형에 대입을 할경우 조심해야한다. 

```Java
package class1;  
  
public class test {  
    public static void main(String[] args) {  
        String[] name = {"학생1","학생2"};  
  
        String[] name1 = name;  
  
        System.out.println(name);  
        System.out.println(name1);  
    }  
}
```


위 와 같이 String 배열에 name 을 선언하고 name 이라는 변수에는 `{학생1,학생2}` 와 같이 값이 있다고 가정 한다.

이후 다시 String 배열에 name1 이라는 변수를 선언하고 해당 변수에 위에서 선언한 name 을 대입 한다고 가정한다.

이 경우 name 의 참조 값이 name1 에도 그대로 대입이 되기 때문에 서로 같은 값을 바라보게 된다.

```Java
[Ljava.lang.String;@2ef9b8bc
[Ljava.lang.String;@2ef9b8bc
```

그렇기 때문에 만약 `name1` 의 값을 임의로 바꿀경우 같은 참조값을 사용하고 있는`name` 의 값도 변경이 된다.

```Java
package class1;  
  
public class test {  
    public static void main(String[] args) {  
        String[] name = {"학생1","학생2"};  
  
        String[] name1 = name;  
  
        System.out.println(name[1]);  
        System.out.println(name1[1]);  
  
        System.out.println("----------------------");  
  
        name1[1] = "학생3";  
  
        System.out.println(name[1]);  
        System.out.println(name1[1]);  
    }  
}
```

```Java
학생2
학생2
----------------------
학생3
학생3
```

위 처럼 `name1[1]` 의 배열을 변경했지만 기존의 `name[1]` 의 배열도 같이 변경된 것을 확인할수 있 
## 정리

![[자바의 참조형 과 기본형.png]]
