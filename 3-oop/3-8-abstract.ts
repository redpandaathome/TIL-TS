{
   //3-6-polymorphism 코드 가져옴!
   //특정기능만 자식클래스에서 행동이 달라진다면 abstract class를 만들어 볼 수 있다.
   type CoffeeCup = {
      shots: number;
      hasMilk?: boolean;
      hasSugar?: boolean; //optional
   }
   
   interface CoffeeMaker {
      makeCoffee(shots:number):CoffeeCup;
   }
   //인터페이스구현-> "abstrct" class는 그 자체로 obj를 만들 수가 없다! 부모클래스로써 필요한 것들을 정의해 놓음.
   abstract class CoffeeMachine implements CoffeeMaker {
      private static BEANS_GRAMM_PER_SHOT:number=7;
      private coffeeBeans: number = 0;

      public constructor(coffeeBeans:number) {
         this.coffeeBeans=coffeeBeans;
      }

      // abstrct class라 불가! abstract class의 instance는 만들 수 없다.
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

      //자식 클래스마다 달라질 수 있는 행동이 있다면 "abstract",
      //자식 클래스마다 접근해야 하기에 protected (외부에선 불가)
      //추상적 메소드라 구현사항은 작성해선 안된다. 선언만!
      protected abstract extract(shots:number):CoffeeCup;
      
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

      protected extract(shots:number):CoffeeCup{
         this.steamMilk();
         return {
            shots,
            hasMilk:true
         }
      }
      // makeCoffee(shots:number):CoffeeCup{
      //    //부모클래스를 호출안하고 직접 만들다가 몇가지 프로세스를 놓칠수도있다!(grinding, preheat...etc)
      //    //이런 일을 방지하고자 하면 abstract class를 활용해보자.
      //    // const coffee = super.makeCoffee(shots);
      //    this.steamMilk();
      //    // return {
      //    //    ...this.coffeeBeans,
      //    //    hasMilk: true,
      //    // }

      //    return {
      //       shots,
      //       hasMilk: true,
      //    }
      // }
   }

   class SweetCoffeeMaker extends CoffeeMachine {
      // makeCoffee(shots:number):CoffeeCup{
      //    const coffee = super.makeCoffee(shots);
      //    return {
      //       ...coffee,
      //       hasSugar:true
      //    }
      // }
      protected extract(shots:number):CoffeeCup{
         return {
            shots,
            hasSugar:true
         }
      }
   }
   
   const machines = [
      // new CoffeeMachine(16), 추상클래스라 ㄴㄴ
      new CoffeelatteMachine(16, '0415'),
      new SweetCoffeeMaker(16),
      // new CoffeeMachine(16),
      new CoffeelatteMachine(16, '0415'),
      new SweetCoffeeMaker(16),
   ]

   machines.forEach(machine=>{
      console.log('-----------------')
      machine.makeCoffee(1);
   })

   //공통 기능이 있다면 다 구현가능, 달라져야 하는 부분이 있다면 그부분만 abstract method로 정의
   //인터페이스에서 함수 규격 정의한것처럼
   //abstract class는 함수이름은 뭔지 어떤인자를 받아서 어떤걸 리턴하는지 정의할 수 있다. 
   //공통적으로 쓰는기능은 내부에서만 필요하면 Private - preheat, 외부서 호출가능한 건 public - makeCoffee 으로 만들 수 있다.
   //조금 더 안전하게 의도한대로 공통적인 기능을 수행하고 달라져야 하는 기능만 꼭 구현하라 강조할 수 있다.
   //어떤 것이 언제 좋은지는 여러번 경험해보며 생각하는 힘을 기르는게 필요하다
}