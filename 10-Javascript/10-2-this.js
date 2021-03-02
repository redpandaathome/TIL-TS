console.log(this);
//브라우저 환경에서는 윈도우가 글로벌 객체->윈도우가 this

function simpleFunc() {
   console.log(this);
}
// 역시 window 가 나온다. = window.simleFunc(); 윈도우가 호출했으므로 윈도우
simpleFunc();

console.clear();

class Counter {
   count = 0;
   increase = function () {
      console.log(this);
   }
   // arrow 함수 사용시 따로 바인딩을 하지 않아도 연결이 되어있다. 
   // 다른 프로그래밍 언어에서처럼 선언될 당시의 스코프의 this context를 유지한다.
   // increase = ()=> {
   //    console.log(this);
   // }
}

const counter = new Counter();
counter.increase(); // this: Counter //counter에서 호출했으므로

const caller = counter.increase;
//✨bind
// const caller = counter.increase.bind(counter);
console.log("calling caller...")
caller(); //undefined
//원래는 클래스를 가르키고 있었으나 counter의 increase의 포인터를 caller 변수로 할당하면서 this의 정보로 잃어버림.
//let, const로 선언된 변수는 window에 등록되어져 있지 않으므로 undefined

//우리가 선언한 함수는 윈도우 객체에 기본적으로 등록되지만
//const, let으로 선언시 윈도우에 등록되지 않는다.
//function helloWorld()~
//window.helloWorld() OK
//const jelly = 'jelly';
//window.jelly -> undefined

//함수, 변수 모두 글로벌 적으로 호출하면 호출되지만
//함수만 윈도우 객체에 등록되어 있다.
//예외 var : 기본적으로 윈도우에 등록이 됨.
//var 는 사용하지 않는게 좋다. (스택문제-제일 나중에 선언했는데 가장 위에 올라가 선언이 된다던지, 선언 후 재정의가 되는 문제 등)
//var hi = "hi"
//window.hi => "hi"

class Bob {

}
const bob = new Bob();
bob.run = counter.increase;
bob.run(); // Bob... 왜냐하면 run은 bob이 불렀기 때문.
//js는 this라는 정보를, 함수를 다른 곳으로 할당하는 순간 잃어 버릴 수 있기 때문에
//object와 this의 관계를 bind