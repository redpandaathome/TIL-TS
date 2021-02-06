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

      //✨Milk, sugar 추가됌!
      public constructor(
         coffeeBeans:number, 
         private milk:MilkFrother, 
         private sugar:SugarProvider
      ) {
         this.coffeeBeans=coffeeBeans;
      }

      // static makeMachine(coffeeBeans:number):CoffeeMachine{
      //    return new CoffeeMachine(coffeeBeans);
      // }

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
         const coffee = this.extract(shots);
         //✨✨
         const sugarAdded = this.sugar.addSugar(coffee);
         return this.milk.makeMilk(sugarAdded);

      }
   }

   interface MilkFrother {
      makeMilk(cup:CoffeeCup): CoffeeCup;
   }

   interface SugarProvider {
      addSugar(cup:CoffeeCup):CoffeeCup;
   }
   //싸구려 우유 거품기(class CheapMilkSteamer {})=> +인터페이스 
   class CheapMilkSteamer implements MilkFrother{
      private steamMilk(): void{
         console.log('steaming some milk... 🥛');
      }
      makeMilk(cup:CoffeeCup):CoffeeCup{
         this.steamMilk();
         return {
            ...cup,
            hasMilk:true,
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

   //컴포지션을 통해 상속을 사용하지 않고도 
   //커피머신 클래스에 다양한 형태의 우유,설탕을 주입해서 다양한 오브젝트를 만들 수 있었다!
   //상속이 유용한 때도 있지만, 구조가 너무 수직적으로 깊고 복잡해지지 않게, 
   //컴포지션으로 대체해서 조금 더 확장이 가능하고/재사용성이 높고/유지보수가 쉽고/고퀄이 가능한 방법을 생각해보자.
   //그래도 over-engineering 하지마라는 점은 유의! (일정이 먼저 - 중간점을 지키자!)
   //Milk
   const cheapMilkMaker = new CheapMilkSteamer()
   const fancyMilkMaker = new FancyMilkSteamer()
   const coldMilkMaker = new ColdMilkSteamer()
   const noMilk = new NoMilk()
   //Sugar
   const candySugar = new CandySugarMixer()
   const sugar = new SugarMixer()
   const noSugar = new NoSugar()
   
   
   // ✨이제 CoffeeMachine 으로 다양한 커피를 다 만든다!
   const sweetCandyMachine = new CoffeeMachine(14, noMilk, candySugar)
   const sweetMachine = new CoffeeMachine(12, cheapMilkMaker, sugar)

   const latteeMachine = new CoffeeMachine(12, fancyMilkMaker, noSugar);
   const coldLatteeMachine = new CoffeeMachine(14, coldMilkMaker, noSugar);
   const SweetCoffeeLatteMachine = new CoffeeMachine(
      12,
      fancyMilkMaker,
      sugar
   )
   coldLatteeMachine.makeCoffee(2);
   SweetCoffeeLatteMachine.makeCoffee(1);
}