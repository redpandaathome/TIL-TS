{
   type CoffeeCup = {
      shots: number;
      hasMilk: boolean;
   }
   
   //public
   //private - 외부에서 보거나 접근 불가 상태
   //protected - 상속시, 외부에서는 접근 불가, 이 클래스를 상속한 자식은 접근가능
   
   //따로 작성하지 않으면 다 퍼블릭

   class CoffeeMaker {
      private static BEANS_GRAMM_PER_SHOT:number=7; //static ->class lever (메모리낭비줄이기)
      private coffeeBeans: number = 0; //instance (object) lever

      private constructor(coffeeBeans:number) {
         this.coffeeBeans=coffeeBeans;
      }

      //static으로 obj를 만들 수 있는 함수를 제공한다면, 실수로 생성자를 이용해 생성하는 것을 금지하기 위함. 
      //따라서 constructor를 private으로 만들어서, 항상 static method를 이용할 수 있도록 권장하는게 좋다.
      //***/
      static makeMachine(coffeeBeans:number):CoffeeMaker{
         return new CoffeeMaker(coffeeBeans);
      }

      fillCoffeeBeans(beans: number) {
         if(beans <0 ){
            throw Error(`value for beans can not be lower than 0`)
         }
         this.coffeeBeans += beans;
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
   
   // const maker = new CoffeeMaker(30); //
   //***/
   const maker = CoffeeMaker.makeMachine(30);

   // maker.coffeeBeans = -10; //invalid 
   //- 제약사항이 없어서 외부에서 나의 오브젝트 상태를 유효하지 않은 상태로 만들 수 있는 위험
   // static 값으로 변경해서 바로 접근할 수 없게하고, 커피빈 추가하는 메소드를 새로이 만들어 사용
   // maker.fillCoffeeBeans(-5);
   maker.fillCoffeeBeans(5);

   console.log(maker);
}