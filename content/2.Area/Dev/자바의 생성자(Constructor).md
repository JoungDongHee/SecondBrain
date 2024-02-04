---
title: 자바의 생성자(Constructor)
create: 2024-01-31 20:54
keyword: Constructor
tags:
  - Java
  - 공부
  - Area
---
## 생성자 사용이유

객체를 생성함과 동시에 필요한 작업이 있을 경우 생성자(Constructor) 를 사용하면 된다.

예를들어 객체에 값을 할당 하고 할당한 내용을 보여준다고 가정하자

```Java
public static void main(String[] args) {  
    MemberInit member1 = new MemberInit();  
    initMember(member1,"user1",15,90);  
  
    MemberInit member2 = new MemberInit();  
    initMember(member2,"user2",16,80);  
  
    MemberInit[] memberInits = {member1,member2};  
  
    for(MemberInit s : memberInits){  
        System.out.println("이름"+s.name+" 나이 : "+s.age+" 성적 : "+s.grade);  
    }  
  
}  
  
static void initMember(MemberInit member , String name , int age , int grade){  
    member.name = name;  
    member.age = age;  
    member.grade = grade;  
}

```

하지만 이 경우 initMember 메서드에서 Member 의 객체를 직접 변경하고 있다. 

이 것은 객체지향 하는 코드는 아니기 때문에 `MemberInit` 객체 에서 직접 변경 할수 있도록 코드를 수정해야 한다. 변경된 코드는 다음과 같다.

```Java
public class MemberInit {
 String name;
 int age;
 int grade;

	 void initMember(String name, int age, int grade) {
		 this.name = name;
		 this.age = age;
		 this.grade = grade;
	 }
}
```

```Java
public class MethodInitMain3 {
	 public static void main(String[] args) {
		 MemberInit member1 = new MemberInit();
		 member1.initMember("user1", 15, 90);
		 MemberInit member2 = new MemberInit();
		 member2.initMember("user2", 16, 80); 
		 MemberInit[] members = {member1, member2};
		 for(MemberInit s: members){
		  System.out.println("이름:" + s.name + " 나이:" + s.age + " 성적:" +
s.grade);
		 }
	}
}
```

위 코드에서 처음보는 구문이 존재한다. 

>[!result]
이름user1 나이 : 15 성적 : 90
이름user2 나이 : 16 성적 : 80

## this 문

위 코드에서 보면 `this.name` 과 같이 this 가 추가된 것을 볼수 있다.

this 라는 것 은 해당 객체 내의 자기 자신을 가르키는 문법이다.

```Java
 void initMember(String name, int age, int grade) {
	 this.name = name;
	 this.age = age;
	 this.grade = grade;
 }
```

`initMember` 에서는 어떻게 인자 값 으로 받은 변수 와 객체 안의 변수를 구분 할수 있을까? 
그것은 바로 this 의 존재 유무 이다.

```Java
//1. 오른쪽의 name은 매개변수에 접근
this.name = name; 

//2. 인자 값으로 전달 받은 매개 변수 사용
this.name = "user"; 

//3. this.은 인스턴스 자신의 참조값을 뜻함, 따라서 인스턴스의 멤버 변수에 접근
x001.name = "user"; 
```

만약 여기서 `this` 가 빠진다면  어떠한 결과가 생길까?

```Java
void initMember(String name , int age , int grade){  
    name = name;  
    age = age;  
    grade = grade;  
}
```

이 경우 다음과 같이 아무런 변화가 없는걸 확인할수 있다. 

이유는 너무 간단하다 왜냐 하면 결국 System.out.println 를 통해 객체를 호출하여 객체안의 저장된 변수를 호출 하였지만 

this 가 빠진 initMember 메서드는 자기자신에게 재 할당 하는 역할이 전부이기 때문이며 이로인해 MemberInit 에는 아무런 할당된 변수가 없기에 ==초기값==이 호출 되는 것 이다. 

>[!result]
>이름null 나이 : 0 성적 : 0
이름null 나이 : 0 성적 : 0

## this() 문법

`this.` 은 객체 안에 자기 자신을 가르킨다. 이 것 말고도 `this()` 문법이 존재하는데 이 것은 자신 의 객체안에 생성자 메서드를 가르키게 된다.

```Java
public class MemberConstruct {  
    String name;  
    int age;  
    int grade;  
    MemberConstruct(String name,int age){  
        this.name = name;  
        this.age = age;  
        this.grade = 50;  
        System.out.println("오버로딩 생성자 호출 name="+name+", age="+age);  
    }  
    MemberConstruct(String name,int age,int grade){  
        System.out.println("생성자 호출 name="+name+", age="+age+", grade"+grade);  
        this.name = name;  
        this.age = age;  
        this.grade = grade;  
    }  
}
```

위  처럼 총 2 개의 MemberConstruct 생성자가 존재한다 MemberConstruct 의 인자값은 name 과 age 를 받는 생성자 1 개와  name, age , grade 3개의 인자값을 받는 생성자 가 존재한다.

여기서 우리는 중복 코드가 존재하게 되는데 바로 `this.name = name ` 과 `this.age = age` 이다 해당 중복 코드를  제거하기 위해서는 `this()` 문법을 사용하여 자기 자신의 생성자를 호출하면 해결이 가능하다.

```Java
public class MemberConstruct {  
    String name;  
    int age;  
    int grade;  
    MemberConstruct(String name,int age){  
        this(name,age,50);  
        System.out.println("오버로딩 생성자 호출 name="+name+", age="+age);  
    }  
    MemberConstruct(String name,int age,int grade){  
        System.out.println("생성자 호출 name="+name+", age="+age+", grade"+grade);  
        this.name = name;  
        this.age = age;  
        this.grade = grade;  
    }  
}
```


위 처럼 `this(name,age,50);` 부분은 MemberConstruct 생성자 를 호출 하여 변수 할당 을 진행  하였다.

## 생성자 가 생긴이유

생성자가 생긴 이유는 무엇일까? 우리는 코딩을 하다보면 결국에는 해당 객체에 값을 할당해야만 사용할수 있다.  

그렇다면 위에서 언급한 initMember 같은 메서드를 매번 호출 해야하는 것 을 내부에 생성해줘야 한다. 

```Java
public class MemberConstruct {  
    String name;  
    int age;  
    int grade;  
    
    MemberConstruct(String name,int age,int grade){  
        System.out.println("생성자 호출 name="+name+", age="+age+", grade"+grade);  
        this.name = name;  
        this.age = age;  
        this.grade = grade;  
    }  
}
```

위 코드는 생성자를 만든 MemberConstruct 객체이다. 

생성자는 몇 가지 규칙이 존재한다.
1. 생성자의 이름은 클래스 명과 같아야 한다 따라서 첫 글자도 대문자 여야만 한다.
	1. MemberConstruct 클래스 의 생성자 이름 또한 MemberConstruct 
2. 생성자는 반환 타입이 없다.
3. 나머지는 메서드 와 동일하게 작성할수 있다.

다음은 생성자를 활용한 코드이다.

```Java
public class ConstructMain1 {  
    public static void main(String[] args) {  
        MemberConstruct member1 = new MemberConstruct("user1",19,80);  
        MemberConstruct member2 = new MemberConstruct("user2",60,80);  
  
        MemberConstruct[] memberInits = {member1,member2};  
  
        for(MemberConstruct s : memberInits){  
            System.out.println("이름"+s.name+" 나이 : "+s.age+" 성적 : "+s.grade);  
        }  
    }  
}
```

`new MemberConstruct` 에서 보시다 시피 기존( ) 괄호 안에 인자값을 넣어줌으로서  MemberConstruct 의 생성과 동시에 MemberConstruct 메서드를 호출하여 값을 할당하게 된다.

이 외에도 생성자 함수를 활용하면 다양한 방식의 객체지향 프로그래밍이 가능하게 된다.
### 생성자의 장점
* 생성자 라는 기능이 생겨남과 동시에 코드의 가독성이 높아지며 중복코드 또한 상당 부분 압축이 가능하게 된다. 
* 생성자 로 인해 값을 할당 하는 것에 **제약** 이 생겨난다. 
	* 예를 들어 `MemberConstruct member1 = new MemberConstruct()` 를 생성한뒤 값을 할당하지 않은 채로 사용한다면 문법 오류나 이런 부분에 문제가 없기 때문에 컴파일 등 이 가능할 것이다. 하지만 생성자를 사용함으로써 객체에 값 을 넣도록 강제할경우 이 때에는 값을 할당하지 않을 경우 이미 컴파일 단계에서 오류를 주기 때문에 오류 해결이 쉽게 가능하다.
* 생성자는 필수이다. 
	* 생성자는 필수로 들어가게 된다. 만약 개발자가 생성자를 따로 추가 하지 않는다면기본생성자가 생성되어 동작하게 된다.

