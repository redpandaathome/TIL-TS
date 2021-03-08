{
   type CoffeeCup = {
      shots: number;
      hasMilk: boolean;
   }
   
   //class는 관련된 속성과 함수를 묶어서 어떤 모양의 데이터가 될지 정의 ->실제 데이터 넣어서->오브젝트 만들기
   //오브젝트마다 새로만들어져야 하는 데이터가 있다면 멤버변수로 만든다.
   //멤버변수는 const, let 사용X
   //클래스레벨에서 함께 공유될 수 있다면 static 이용
   class CoffeeMaker {

      // 멤버변수가 아니라 static 키워드를 붙여서 class level (메모리낭비줄이기) -obj마다 따라오지 않음.
      // 클래스의 정보라, 부를때도 this.~가 아니라 className.~ Ex: CoffeeMaker.BEANS_GRAM_PER_SHOT
      static BEANS_GRAMM_PER_SHOT:number=7; 
      
      // 멤버변수.
      // instance (object) level -모!든! obj에 따라오는 정보
      coffeeBeans: number = 0; 

      constructor(coffeeBeans:number) {
         this.coffeeBeans=coffeeBeans;
      }

      // 생성자를 타지 않고 클래스 레벨에서 새로운 객체를 만들고 싶다면, 아래처럼.
      // 클래스 내부의 어떠한 속성값도 필요하지 않은 경우.
      static makeMachine(coffeeBeans:number):CoffeeMaker{
         return new CoffeeMaker(coffeeBeans);
      }

      makeCoffee(shots:number):CoffeeCup{
         //내 클래스안에 멤버변수에 접근할 때는 항상 this.~
         if(this.coffeeBeans < shots*CoffeeMaker.BEANS_GRAMM_PER_SHOT){
            throw Error(`Not enough coffee beans ☕️`)
         }
         this.coffeeBeans -= shots*CoffeeMaker.BEANS_GRAMM_PER_SHOT;
         return {
            shots,
            hasMilk: false
         }
      }
   }
   
   const maker = new CoffeeMaker(30);
   console.log(maker)
   const maker2 = new CoffeeMaker(15);
   console.log(maker2)
   console.log(maker.makeCoffee(2))


   const maker3 = CoffeeMaker.makeMachine(3);
   // makeMachine에 static을 지우면, 만들어진 오브젝트 안에서 함수를 호출할 수 있다. 
   // const maker 3 = new CoffeeMaker(15); maker3.makeCoffeeMachine();
   
   // 따라서 클래스 레벨에서 활용하고 싶다면 static 키워드를 붙여서 활용 할 것.
   
   // Math.abs... new Math() 없이 바로 접근가능한건 다 클래스레벨에 있기 때문.
   // 그래서 오브젝트를 생성하지 않고도 클래스 레벨에서 다 함수 호출가능
}