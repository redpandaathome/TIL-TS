{
   //Favor Composition over inheritance
   
   //상속의 단점 -> 수직적, 복잡성초래(부모클래스 수정->모두 변경, 전체 구조파악하기 등등) /물론 똑같은 기능을 간단하게 상속받는 장점 등 있지만
   //ts에서는 한가지 클래스만 상속 가능하다.
   //ts에서는 composition을 잘 활용하자. - 각 클래스에서 매번 구현이 아니라 외부에서 만들어진 각각의 기능(클래스)을 만들어서 가져다 쓰기.
   //아래에서는 상속레벨을 한단계로 유지하면서 필요한 코드를 재사용해보자. 
   //커피머신--상속-=>SweetCoffeeMaker <- 필요한 클래스 가져와 쓰기(DI:싸구려 거품기, 설탕 제조기)
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

   interface MilkFrother {
      makeMilk(cup:CoffeeCup):CoffeeCup;
   }

   interface SugarProvider {
      addSugar(cup:CoffeeCup):CoffeeCup;
   }
   //싸구려 우유 거품기(class CheapMilkSteamer {}) => +✨인터페이스 
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

   //상속 🥛+☕️=💜 
   class CoffeelatteMachine extends CoffeeMachine {
      //따로 생성자를 만들고 싶다면, 부모의 생성자도 호출해줘야.
      constructor(
         beans: number, 
         public readonly serialNumber:string, 
         // private milkFrother:CheapMilkSteamer 
         // +✨milkFrother 인터페이스
         //클래스간 coupling -> 클래스-인터페이스로 decoupling : 코드재사용 극대화!
         private milkFrother:MilkFrother
      ) {
         super(beans);
         this.serialNumber = serialNumber;
      }

      // private steamMilk(): void{
      //    console.log('steaming some milk... 🥛');
      // }
      makeCoffee(shots:number):CoffeeCup{
         //super->부모클래스의 함수를 호출/접근 가능!
         const coffee = super.makeCoffee(shots);
         return this.milkFrother.makeMilk(coffee);
         // this.steamMilk();
         // return {
         //    ...coffee,
         //    hasMilk: true,
         // }
      }
   }

   class SweetCoffeeMaker extends CoffeeMachine {
      constructor(
         beans:number, 
         // private sugar:CandySugarMixer 클래스말고 인터페이스 받아오자✨
         private sugar:SugarProvider

      ){
         super(beans)
      }
      // getSugar(){
      //    console.log(`sugar...🐝`)
      // }
      makeCoffee(shots:number):CoffeeCup{
         const coffee = super.makeCoffee(shots);
         return this.sugar.addSugar(coffee);
         // this.getSugar();
         // return {
         //    ...coffee,
         //    hasSugar:true
         // }
      }
   }
   
   //우유, 설탕을 어디서 만드는지 전혀 신경쓰지 않는다
   //컴포지션... 필요기능 가져와서 외부에서 주입하여 "재사용"성을 높여준다!
   //단점은 class CandySugarMixer, CheapMilkSteamer 와 밀접하게 coupling이 되어있다.
   //이후 더 나은 우유스티머를 도입시 모두 업데이트 되어야하고(해당 클래스를 가져다 쓰는 클래스들이 다 맞춰서 변경되어야) 
   //또한 현재로써는 constructor에 싸구려 우유, 설탕으로 제약됨
   //클래스들 간에 서로 밀접하게 관계 짓는 건 좋지 않다. =>어떻게 개선할까???
   class SweetCoffeeLatteMaker extends CoffeeMachine{
      constructor(
         private beans:number, 
         // private milk:CheapMilkSteamer, 클래스말고 인터페이스로 받아오자.
         // private sugar:CandySugarMixer,
         private milk:MilkFrother,
         private sugar:SugarProvider){
            super(beans);
         }
      makeCoffee(shots:number):CoffeeCup{
         const coffee = super.makeCoffee(shots);
         // return this.milk.makeMilk(this.sugar.addSugar(coffee));
         const sugarAdded = this.sugar.addSugar(coffee);
         return this.milk.makeMilk(sugarAdded);
      }

   }

   // const cheapMilkMaker = new CheapMilkSteamer()
   // const candySugar = new CandySugarMixer()
   // const sweetMachine = new SweetCoffeeMaker(12, candySugar)
   // const latteeMachine = new CoffeelatteMachine(12, '0415', cheapMilkMaker);
   // const SweetCoffeeLatteMachine = new SweetCoffeeLatteMaker(
   //    12,
   //    cheapMilkMaker,
   //    candySugar
   // )
   //재사용성이 떨어진다? 우유, 설탕 한종류만 가능가능
   //클래스 간에 상호작용을 할 때, 클래스 자신을 노출하는게 아니라, 계약서(인터페이스)통해서 상호작용해야. decoupling의 원칙
   //이제 각각의 인터페이스를 만들어보자

   //필요한 기능을 인터페이스를 통해 각각 클래스로 구현해서, 용도에 맞게 부품을 바꿔끼울 수 있게 됌.
   //Milk
   const cheapMilkMaker = new CheapMilkSteamer()
   const fancyMilkMaker = new FancyMilkSteamer()
   const coldMilkMaker = new ColdMilkSteamer()
   //Sugar
   const candySugar = new CandySugarMixer()
   const sugar = new SugarMixer()
   
   
   //
   const sweetCandyMachine = new SweetCoffeeMaker(12, candySugar)
   const sweetMachine = new SweetCoffeeMaker(12, sugar)

   const latteeMachine = new CoffeelatteMachine(12, '0415', cheapMilkMaker);
   const coldLatteeMachine = new CoffeelatteMachine(12, '0415', coldMilkMaker);
   const SweetCoffeeLatteMachine = new SweetCoffeeLatteMaker(
      12,
      cheapMilkMaker,
      candySugar
   )
}