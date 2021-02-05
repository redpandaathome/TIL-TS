{
   type CoffeeCup = {
      shots: number;
      hasMilk: boolean;
   }
   
   interface CoffeeMaker {
      makeCoffee(shots:number):CoffeeCup;
   }

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

   //🥛+☕️=💜
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

   const machine = new CoffeeMachine(55);
   // const coffee = machine.makeCoffee(4);
   // console.log("coffee:",coffee)
   const latteeMachine = new CoffeelatteMachine(55, "SSSS0415");
   const lattee = latteeMachine.makeCoffee(2);
   console.log("lattee",lattee)
   console.log(latteeMachine.serialNumber);
}