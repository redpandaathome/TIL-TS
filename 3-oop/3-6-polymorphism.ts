{
   type CoffeeCup = {
      shots: number;
      hasMilk?: boolean;
      hasSugar?: boolean; //optional
   }
   
   interface CoffeeMaker {
      makeCoffee(shots:number):CoffeeCup;
   }
   //인터페이스구현
   class CoffeeMachine implements CoffeeMaker {
      private static BEANS_GRAMM_PER_SHOT:number=7;
      private coffeeBeans: number = 0;

      public constructor(coffeeBeans:number) {
         this.coffeeBeans=coffeeBeans;
      }

      static makeMachine(coffeeBeans:number):CoffeeMachine{
         return new CoffeeMachine(coffeeBeans);
      }

      fillCoffeeBeans(beans: number) {
         if(beans <0 ){
            throw Error(`value for beans can not be lower than 0`)
         }
         this.coffeeBeans += beans;
      }

      public grindBeans(shots: number){
         console.log(`grinding beans for ${shots}`)
         if(this.coffeeBeans < shots*CoffeeMachine.BEANS_GRAMM_PER_SHOT){
            throw Error(`Not enough coffee beans ☕️`)
         }
         this.coffeeBeans -= shots*CoffeeMachine.BEANS_GRAMM_PER_SHOT;
      }

      public preheat():void{
         console.log('heating up... 🔥')
      }

      public extract(shots:number):CoffeeCup{
         console.log(`extracting...${shots} shots`);
         return {
            shots,
            hasMilk: false
         }
      }
      
      clean(){
         console.log("cleaning the machine... 🧼")
      }

      makeCoffee(shots:number):CoffeeCup{
         this.grindBeans(shots);
         this.preheat();
         return this.extract(shots);
      }
   }

   //상속 🥛+☕️=💜
   class CoffeelatteMachine extends CoffeeMachine {
      //따로 생성자를 만들고 싶다면, 부모의 생성자도 호출해줘야.
      constructor(beans: number, public readonly serialNumber:string){
         super(beans);
         this.serialNumber = serialNumber;
      }

      private steamMilk(): void{
         console.log('steaming some milk... 🥛');
      }
      makeCoffee(shots:number):CoffeeCup{
         //super->부모클래스의 함수를 호출/접근 가능!
         const coffee = super.makeCoffee(shots);
         this.steamMilk();
         return {
            ...coffee,
            hasMilk: true,
         }
      }
   }

   class SweetCoffeeMaker extends CoffeeMachine {
      makeCoffee(shots:number):CoffeeCup{
         const coffee = super.makeCoffee(shots);
         return {
            ...coffee,
            hasSugar:true
         }
      }
   }
   
   //polymorphism->한가지 클래스나 인터페이스를 이용해서 다른 방식으로 구현한 클래스를 만들 수 있다.
   //(인터페이스나 부모클래스를 상속한) 자식클래스들이 (인터페이스, 부모클래스의 함수)를 다른 방식으로 다양하게 구성할 수 있다.
   //사용자도 간편하게 기능 이용(인터페이스에 정의된대로)
   // const machines: CoffeeMaker[] = [~] 로 바꾸면, makeCoffee만 사용가능(유일한 인터페이스)
   const machines = [
      new CoffeeMachine(16),
      new CoffeelatteMachine(16, '0415'),
      new SweetCoffeeMaker(16),
      new CoffeeMachine(16),
      new CoffeelatteMachine(16, '0415'),
      new SweetCoffeeMaker(16),
   ]

   machines.forEach(machine=>{
      console.log('-----------------')
      machine.makeCoffee(1);
   })
}