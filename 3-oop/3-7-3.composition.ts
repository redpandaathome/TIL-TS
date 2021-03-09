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

   // ✨기존 클래스안에서 우리가 필요한 걸 구현하는게 아니라, 새로운 클래스 만들어서 기존 클래스 생성자에 주입!
   // ✨싸구려 우유 거품기!
   class CheapMilkSteamer {
      private steamMilk():void {
         console.log(`Steaming some milk...🥛`);
      }
      makeMilk(cup:CoffeeCup):CoffeeCup{
         this.steamMilk();
         return {
            ...cup,
            hasMilk: true,
         }
      }
   }

   // ✨설탕제조기
   class AutomaticSugarMixer {
      private getSugar():boolean{
         console.log(`Gettig some sugar from jar...🍭`);
         return true;
      }
      addSugar(cup:CoffeeCup):CoffeeCup{
         const sugar = this.getSugar();
         return {
            ...cup,
            hasSugar: sugar,
         }
      }
   }

   //상속 🥛+☕️=💜
   class CoffeelatteMachine extends CoffeeMachine {
      //따로 생성자를 만들고 싶다면, 부모의 생성자도 호출해줘야.
      constructor(
         beans: number, 
         public readonly serialNumber:string, 
         //✨
         private milkFrother:CheapMilkSteamer
      ) {
         super(beans);
         this.serialNumber = serialNumber;
      }

      // private steamMilk(): void{
      //    console.log('steaming some milk... 🥛');
      // }

      makeCoffee(shots:number):CoffeeCup{

         const coffee = super.makeCoffee(shots);
         
         // this.steamMilk();
         // return {
         //    ...coffee,
         //    hasMilk: true,
         // }
      
         // ✨
         return this.milkFrother.makeMilk(coffee);
      }
   }

   class SweetCoffeeMaker extends CoffeeMachine {

      constructor(
         beans: number, 
         // ✨ 멤버변수화
         private sugar:AutomaticSugarMixer,
      ) {
         super(beans);
      }

      makeCoffee(shots:number):CoffeeCup{
         const coffee = super.makeCoffee(shots);
         // return {
         //    ...coffee,
         //    hasSugar:true
         // }
         
         //✨
         return this.sugar.addSugar(coffee);
      }
   }
   
   class SweetCaffeeLatteMachine extends CoffeeMachine {}

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