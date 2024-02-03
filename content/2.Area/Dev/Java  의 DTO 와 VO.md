---
title: Java 의 DTO 와 VO
tags:
  - 공부
  - Java
  - Dev
  - 개발
  - Java컨벤션
draft:
---
자바에서는 DTO 와 VO 클래스를 생성하여 데이터 객체를 담거나 사용합니다. 

하지만 인터넷에 검색을 하다보면  VO 와 DTO 를 혼용하여 사용하거나 잘못 사용하는 경우가 보이는거 같아서 제 나름대로 정리를 해봅니다. 

## DTO (**Data Transfer Object**)

DTO 의 약자 에서 볼 수 있듯이 `Transfer` 역할을 하는 객체입니다. 

DTO 는 주로 계층간 의 데이터 전송을 위해 사용합니다. 

여기서 계층 간의 이동이라 함은 다음과 같습니다.


![[제목 없는 다이어그램.drawio.png]]

위 이미지 처럼 Controller -> Service -> DAO -> DB 순서 와 같이 각 계층에 데이터를 전송 및 전달을 하는 역할을 합니다.

DTO 는 일반적으로 `getter` 와 `setter` 메서드를 가지고 있는 것이 특징이며 클래스명을 지정할때에는 다음과 같이 `DTO` 는 대문자로 작성합니다.

```java
public class BoardDTO {  
    private String title;  
    private String content;  
    private int count;  
  
    public void setTitle(String title) {  
        this.title = title;  
    }  
  
    public void setContent(String content) {  
        this.content = content;  
    }  
  
    public void setCount(int count) {  
        this.count = count;  
    }  
  
    public String getTitle() {  
        return title;  
    }  
  
    public String getContent() {  
        return content;  
    }  
  
    public int getCount() {  
        return count;  
    }  
  
}
```

## VO (**Value Object**)

Value Object 즉 값 을 가진 객체를 의미합니다. DTO 또한 값을 가지고 있는 객체이긴 하지만 둘의 성격(?) 에는 차이가 있습니다. 

DTO 는 데이터를 전달 및 전송하는 역할을 한다면 VO 는 그저 단순하게 값만 가지고 있는 객체입니다. 

즉 VO 는 값에 대해 어떠한 행위를 하지 않기 때문에 **불변성** 을 가질수 있습니다.  

DTO 와 는 다르게 `getter` 와 `setter`  같은 메서드 없이 값 만 존재하게 됩니다. 

VO 의 예시는 다음과 같습니다.

```java
public class BoardVO {  
    private String title;  
    private String content;  
    private int count;  
}
```

## 활용 

다음은 적절하게 위에서 설명한 것 을 기반으로 DTO 와 VO 를 활용한 RestAPI 입니다. 

`RequestBody` 를 활용하여 ``BoardDTO`` 객체에 전달받은 값을 저장하고 해당 DTO 를 통해 로직을 수행한뒤 이를 통해 나온 결과값 을 다시 `BoardVO` 객체에 저장한뒤 이것을 반환하는 코드입니다.

```java
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/boards")
public class BoardController {

    @PostMapping("/create")
    public BoardVO createBoard(@RequestBody BoardDTO boardDTO) {
        // BoardDTO를 사용하여 비즈니스 로직 수행
        System.out.println("Received DTO: " + boardDTO.getTitle() + ", " + boardDTO.getContent());

        // 비즈니스 로직 수행 후, 결과를 VO로 생성하여 반환
        BoardVO boardVO = new BoardVO("Created Board Title", "Created Board Content");
        return boardVO;
    }
}

```

## 정리

정리하자면 다음과 같다

|  | DTO | VO |
| ---- | ---- | ---- |
| 용도 | 계층간의 데이터 이동 | 값 자체의 저장 및 표현 |
| 가변성 | Setter 존재시 가변 없을시 불변 | 불변 |
| 메서드 여부 | Getter , Setter 이 외 에도 다양한 비즈니스 로직 사용가능 | 값 에 대해 불변을 깨트리는 메서드는 없어야된다 |
