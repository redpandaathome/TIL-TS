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

   // ✨ 클래스간 소통이 필요할 땐 인터페이스를 통하자 (decoupling)
   interface MilkFrother {
      makeMilk(cup:CoffeeCup): CoffeeCup;
   }

   interface SugarProvider {
      addSugar(cup:CoffeeCup):CoffeeCup;
   }

   // ✨싸구려 우유 거품기!
   class CheapMilkSteamer implements MilkFrother{
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

   //✨고오급 우유 거품기! (new)
   class FancyMilkSteamer implements MilkFrother{
      private steamMilk(): void{
         console.log('steaming some FANCY milk... ✨🥛');
      }
      makeMilk(cup:CoffeeCup):CoffeeCup{
         this.steamMilk();
         return {
            ...cup,
            hasMilk:true,
         }
      }
   }

   //✨🧊고오급 우유 거품기2 (new)
   class ColdMilkSteamer implements MilkFrother{
      private steamMilk(): void{
         console.log('steaming some FANCY COLD milk... ✨🧊🥛');
      }
      makeMilk(cup:CoffeeCup):CoffeeCup{
         this.steamMilk();
         return {
            ...cup,
            hasMilk:true,
         }
      }
   }

   //🤮
   class NoMilk implements MilkFrother{
      makeMilk(cup:CoffeeCup):CoffeeCup{
         return cup;
      }
   }

   //설탕 제조기(class CandySugarMixer {}) => +인터페이스
   class CandySugarMixer implements SugarProvider{
      private getSugar(){
         console.log("getting some sugar from cheap candy...🍭");
         return true;
      }
      addSugar(cup:CoffeeCup):CoffeeCup{
         const sugar = this.getSugar()
         return {
            ...cup,
            hasSugar:sugar,
         }
      }
   }

   //✨Fancy 설탕 제조기(class CandySugarMixer {}) => +인터페이스
   class SugarMixer implements SugarProvider{
      private getSugar(){
         console.log("getting some FANCY sugar from jar...🍯");
         return true;
      }
      addSugar(cup:CoffeeCup):CoffeeCup{
         const sugar = this.getSugar()
         return {
            ...cup,
            hasSugar:sugar,
         }
      }
   }

   //🧘🏻‍♀️
   class NoSugar implements SugarProvider{
      addSugar(cup:CoffeeCup):CoffeeCup{
         return cup;
      }
   }

   //상속 🥛+☕️=💜
   class CoffeelatteMachine extends CoffeeMachine {
      //따로 생성자를 만들고 싶다면, 부모의 생성자도 호출해줘야.
      constructor(
         beans: number, 
         public readonly serialNumber:string, 
         //✨ 클래스(CheapMilkSteamer)->인터페이스(MilkFrother)
         private milkFrother:MilkFrother
      ) {
         super(beans);
         this.serialNumber = serialNumber;
      }

      makeCoffee(shots:number):CoffeeCup{

         const coffee = super.makeCoffee(shots);
         return this.milkFrother.makeMilk(coffee);
      }
   }

   class SweetCoffeeMaker extends CoffeeMachine {
      constructor(
         beans: number, 
         // ✨ (CandySugarMixer(C)->SugarProvider(I))
         private sugar:SugarProvider,
      ) {
         super(beans);
      }

      makeCoffee(shots:number):CoffeeCup{
         const coffee = super.makeCoffee(shots);
         return this.sugar.addSugar(coffee);
      }
   }
   
   // ✨
   class SweetCaffeeLatteMachine extends CoffeeMachine {
      constructor(
         private beans:number,
         //✨ 
         private sugar:SugarProvider,
         private milk:MilkFrother,
      ) {
         super(beans);
      }

      makeCoffee(shots:number):CoffeeCup{
         const coffee = super.makeCoffee(shots);
         const milkCoffee = this.milk.makeMilk(coffee);
         return this.sugar.addSugar(milkCoffee);
      }
   }

   // ✨ 
   const cheapMilkMaker = new CheapMilkSteamer();
   const fancyMilkMaker = new FancyMilkSteamer();
   const coldMilkMaker = new ColdMilkSteamer();

   const candySugar = new CandySugarMixer();
   const sugar = new SugarMixer();


   const coffeeMachine = new CoffeeMachine(16);
   const cheapLatteeMachin = new CoffeelatteMachine(16, '0415', cheapMilkMaker);
   const sweetMachine = new SweetCoffeeMaker(16, candySugar);
   const sweetLatteMachine = new SweetCaffeeLatteMachine(16, candySugar, cheapMilkMaker);
   

}