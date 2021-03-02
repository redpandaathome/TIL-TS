const x = {};
const y = {};
// console.log(x);
// console.log(y);
//개발도구 찍어보면 >__proto__: Object =>js에서 모든 obj는 obj 프로토를 상속
console.log(x.toString());
console.log(x.__proto__ === y.__proto__); //true

const array = [];
// console.log(array); // __proto__: Array(0) ->length, pop()..., __proto__: Object
// array ->Array 상속 ->Object 상속

function CoffeeMachine(beans) {
   this.beans = beans;
   //instance member level (every instance has)
   // this.makeCoffee = (shots) => {
   //    console.log('making...☕️')
   // }
}

//prototype member lever
CoffeeMachine.prototype.makeCoffee = (shots) => {
   console.log('making...☕️')
}

const machine1 = new CoffeeMachine(10);
const machine2 = new CoffeeMachine(20);
console.log(machine1);
console.log(machine2);


function LatteMachine(milk) {
   this.milk = milk;
}

LatteMachine.prototype = Object.create(CoffeeMachine.prototype)
const latteMachine = new LatteMachine(123);
console.log(latteMachine)
latteMachine.makeCoffee()