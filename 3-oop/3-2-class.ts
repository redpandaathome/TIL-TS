{
   type CoffeeCup = {
      shots: number;
      hasMilk: boolean;
   }
   
   //class는 관련된 속성과 함수를 묶어서 어떤 모양의 데이터가 될지 정의 ->실제 데이터 넣어서->오브젝트 만들기
   //오브젝트마다 새로만들어져야 하는 데이터가 있다면 멤버변수로 만들고
   //클래스레벨에서 함께 공유될 수 있다면 static 이용
   class CoffeeMaker {
      static BEANS_GRAMM_PER_SHOT:number=7; //static ->class level (메모리낭비줄이기)
      coffeeBeans: number = 0; //instance (object) level

      constructor(coffeeBeans:number) {
         this.coffeeBeans=coffeeBeans;
      }

      //클래스 내부의 어떠한 속성값도 필요하지 않음
      static makeMachine(coffeeBeans:number):CoffeeMaker{
         return new CoffeeMaker(coffeeBeans);
      }

      makeCoffee(shots:number):CoffeeCup{
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
   // console.log(maker.makeCoffee(2))

   const maker3 = CoffeeMaker.makeMachine(3);

   // Math.abs... new Math() 없이 바로 접근가능한건 다 클래스레벨에 있기 때문.
   // 그래서 오브젝트를 생성하지 않고도 클래스 레벨에서 다 함수 호출가능
}