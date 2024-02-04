---
title: 오버라이딩(Overriding) 과 오버로딩(Overloading)
create: 2024-02-03 20:54
keyword:
  - Overriding
  - Overloading
tags:
  - Java
  - 공부
  - Area
---

자바에서는 간단하지만 많이 햇 갈려 하는 단어 두가지가 있다 바로 메서드 의 ``오버로딩(Overloading)`` 과 ``오버라이딩(Overriding)`` 이다.

## 오버로딩(Overloading)

^1d5596

오버로딩 은 메서드의 이름은 같지만 파라메터 수 , 타입 등 이 다른 것을 의미 하며 같은 클래스 내부에 같은 메서드의 이름이 등장 할수 있다.

### 특징
1. ``메서드(method)``의 이름이 같다
2. ``리턴(return)``이 다를 수 도 있으며 같을 수 도 있다.
3. ``파라미터(parameter)``의 개수는 달라야 한다.
4. ``파라미터(parameter)``의 개수가 같다면 데이터 타입이 달라야 한다.

### Example Code

다음 과 같이 여러개의 ``select`` 메서드 가 BoardClass 내부에서 여러개 존재할수 있다.

각 select 메서드는 인자값에 따라 구분이 된다. 
이처럼 같은 메서드 의 이름에서 인자값에 같은 이름의 ``method`` 를 정의 하는 것을 **오버로딩(Overloading)** 이라고 한다 

```java
public class BoardClass {  
  
    // 파라메터 가 없는 select 메서드  
    public void select(){  
        System.out.println("게시판 전체 조회");  
    }  
  
    // 파라메터 가 한개인 select 메서드  
    public void select(int count){  
        System.out.println("게시판 n 개 만큼 조회 :"+count);  
    }  
  
    // 파라메터 두개인 select 메서드  
    public void select(int count,int total){  
        System.out.println("게시판 n 개 만큼 조회 :"+count+"게시판 총 갯수 + "+total);  
    }  
}
```

```java
public class BoardMain {  
    public static void main(String[] args) {  
        BoardClass boardClass = new BoardClass();  
  
        boardClass.select();  
        boardClass.select(1);  
        boardClass.select(1,10);  
    }  
}
```

> [!Note] 결과
> 게시판 전체 조회
> 게시판 n 개 만큼 조회 :1 
> 게시판 n 개 만큼 조회 :1 게시판 총 갯수 + 10

## 오버라이딩(Overriding)

오버라이딩 은 오버로딩 과 다르게 [[상속|상속 관계]] 에 있는 클래스간 같은 이름의 메서드를 **재정의** 하는 것을 의미 한다.

여기서 키워드는 [[상속|상속 관계]]  와 **재정의** 이다. 

### 특징

1. 오버라이드 하고자 하는 메서드가 상위 클래스에 존재해야한다.
2. 메서드의 이름이 같아야 한다.
3. 파라메터의 개수 , 자료형이 같아야 한다.
4. 메서드의 리턴형이 같다.

### Example Code

다음과 같이 ``Car`` 라는 클래스 를 선언 하였고 ``car`` 객체 를 파라메터로 받아 실행하는 ``move`` 메서드를 정의 하였습니다.

```java
public class Car {  
    public String category;  
    public void move(Car car){  
        System.out.println(car.category+"자동차가 움직입니다.");  
    }  
}
```

두번째는 `GasCar` 라는 클래스를 만들었고 ``GasCar`` 클래스는 `Car` 클래스 로 부터 상속 받습니다.  

그리고 상속받은 `Car` 클래스 내부의 `move` 메서드 를 내부에서 재정의 합니다. 여기서 
**@Override** 를 사용하면 오버라이딩 을 하겠다는 것을 의미 하며 가독성을 높입니다. 

```java
public class GasCar extends Car {  
    int total;  
  
    @Override  
    public void move(Car car) {  
        System.out.println(car.category+"자동차가 움직입니다.");  
  
        // 추가  
        System.out.println("총 기름량 :"+total);  
    }  
}
```

마지막 으로 `CarMain` 클래스에서 다음 과 같이 `Car` 의 인스턴스를 생성하여 차량종류(category) 를 변수로 저장 하고 

`GasCar` 인스턴스도 생성하여 `total`기름 양 을 변수로 저장한뒤 `GasCar` 의 move 메서드에
생성한 `car`  인스턴스 를 넘겨줌으로서 **Overriding** 으로 재정의 한 코드를 실행합니다.


```java
public class CarMain {  
    public static void main(String[] args) {  
        Car car = new Car();  
        car.category = "가스";  
  
        GasCar gasCar = new GasCar();  
        gasCar.total = 10;  
        gasCar.move(car);  
    }  
}
```

>[!Note] 결과
>가스자동차가 움직입니다.
>총 기름량 :10

## 결론

* [[오버라이딩(Overriding) 과 오버로딩(Overloading)#^1d5596|오버로딩]] 은 같은 클래스 내부에 여러개의 같은 이름을 정의할수 있는 기술 을 말하며 이를 통해 가독성을 높일수 있다.
* [[오버라이딩(Overriding) 과 오버로딩(Overloading)| 오버라이딩]] 은 부모클래스 로 부터 상속 받은 메서드를 재정의 할수 있는 기술을 의미하며 객체지향 언어의 특징 중 하나인 다향성을 의미한다.

___

## 참조

[대학생을 위한 강의](https://brunch.co.kr/@kimkm4726/2)
[김영한의 실전 자바](https://www.inflearn.com/course/%EA%B9%80%EC%98%81%ED%95%9C%EC%9D%98-%EC%8B%A4%EC%A0%84-%EC%9E%90%EB%B0%94-%EA%B8%B0%EB%B3%B8%ED%8E%B8)