// ts : superset of js
// js + (interface, calss, generics, types)=>oop
// js도 엄밀히 말하면 oop (why? proto-based / es6: class-like)
// js - prototype(클래스처럼 속성과 함수 정의->재사용)을 이용해서 상속을 구현할 수 있다.
// Prototype-based Programming: 프로토타입을 이용해서 객체를 재사용하여 -> behavior reuse(inheritance) - oop style

// 다른 언어에서 this는 만들어진 객체 자기 자신을 가르킴
// js에서 this는 누가 부르냐에 따라 달라질 수 있다. 동적으로 변경... 호출한 사람의 문맥!
// 방지하고 싶다면 bind 또는 클래스내에서 애로우 함수로 선언할 것

//모듈? 파일안의 코드를 모듈화해서 작성하는 것
// 따로 모듈화해서 작성하지 않을시, 모든 코드는 브라우저환경이라면 window에, 노드환경이라면 global에 등록되어짐
// 각각의 파일에 add가 있으면 이름충돌발생하거나 조심해도 불러오는 라이브러리에서 동일한 이름이 있을수도
// 규모가 조금이라도 큰 프로젝트라면 모듈화해서 코딩하는게 안전하다.
// 모듈: 코드를 그 파일 내부에서만 한정화 모듈화할수있도록.
// export, import를 해야 불러와 쓸 수 있다.