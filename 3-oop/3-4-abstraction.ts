{
   type CoffeeCup = {
      shots: number;
      hasMilk: boolean;
   }
   
   //제어자 외에도 인터페이스로도 추상화
   //interface: 나랑 소통하려면 나는 이런 규약/행동을 가지고 있어 - 명시된 contract
   interface CoffeeMaker {
      makeCoffee(shots:number):CoffeeCup;
   }

   interface CommercialCoffeeMaker {
      makeCoffee(shots: number): CoffeeCup;
      fillCoffeeBeans(beans:number): void;
      clean():void;
   }

   //CoffeeMaker interface를 구현
   class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
      private static BEANS_GRAMM_PER_SHOT:number=7; //static ->class level (메모리낭비줄이기)
      private coffeeBeans: number = 0; //instance (object) level

      private constructor(coffeeBeans:number) {
         this.coffeeBeans=coffeeBeans;
      }

      //static으로 obj를 만들 수 있는 함수를 제공한다면, 실수로 생성자를 이용해 생성하는 것을 금지하기 위함. 
      //따라서 constructor를 private으로 만들어서, 항상 static method를 이용할 수 있도록 권장하는게 좋다.
      //***/
      static makeMachine(coffeeBeans:number):CoffeeMachine{
         return new CoffeeMachine(coffeeBeans);
      }

      fillCoffeeBeans(beans: number) {
         if(beans <0 ){
            throw Error(`value for beans can not be lower than 0`)
         }
         this.coffeeBeans += beans;
      }

      private grindBeans(shots: number){
         console.log(`grinding beans for ${shots}`)
         if(this.coffeeBeans < shots*CoffeeMachine.BEANS_GRAMM_PER_SHOT){
            throw Error(`Not enough coffee beans ☕️`)
         }
         this.coffeeBeans -= shots*CoffeeMachine.BEANS_GRAMM_PER_SHOT;
      }

      private preheat():void{
         console.log('heating up... 🔥')
      }

      private extract(shots:number):CoffeeCup{
         console.log(`extracting...${shots} shots`);
         return {
            shots,
            hasMilk: false
         }
      }
      
      clean(){
         console.log("cleaning the machine... 🧼")
      }

      //정말 필요한 함수만 노출->간단하게->추상화
      makeCoffee(shots:number):CoffeeCup{
         this.grindBeans(shots);
         this.preheat();
         return this.extract(shots);
      }
   }
   
   // // const maker = new CoffeeMachine(30); //
   // //***/
   // //****CoffeeMachine이라는 타입으로 obj을 받게되면, 해당 obj안에 퍼블릭 함수에 다 접근가능하지만
   // const maker:CoffeeMachine = CoffeeMachine.makeMachine(30);
   // maker.fillCoffeeBeans(5);
   // maker.makeCoffee(2)

   // const maker2:CoffeeMaker = CoffeeMachine.makeMachine(30);
   // // maker2.fillCoffeeBeans(5); 
   // //fillCofeeBeans API는 CofeeMaker interface에 명시안되서 사용 못함.
   // //interface - 내가 얼마만큼의 행동을 약속/보장/허용할 건지를 결정가능.
   // maker2.makeCoffee(2)

   // //**** 인터페이스로 타입을 제한해서 받게되면 해당 인터페이스에서 명시된 애들만 쓸 수 있다.
   // const maker3:CommercialCoffeeMaker = CoffeeMachine.makeMachine(30);
   // maker3.fillCoffeeBeans(5);
   // maker3.makeCoffee(2)
   // maker3.clean()


   class AmateurUser {
      constructor(private machine:CoffeeMaker){
      
      }
      makeCoffee() {
         const coffee= this.machine.makeCoffee(2);
         console.log(coffee);
      }
   }

   class ProBarista {
      constructor(private machine:CommercialCoffeeMaker){
      
      }
      makeCoffee() {
         const coffee= this.machine.makeCoffee(2);
         console.log(coffee);
         this.machine.fillCoffeeBeans(40);
         this.machine.clean();
      }
   }
   //동일한 obj의 인스턴스일지라도, 두가지 인터페이스를 구현하기에, 생성자에서 각기 다른 인터페이스를 받아오면
   //각각 클래스에서 규약된 것보단 좀 더 적은 범위의 함수만 접근가능.
   //사용자들은 클래스 전체를 알 필요 없이 인터페이스가 어떻게 규약되어있는지만 알면 된다.
   const maker5:CoffeeMachine = CoffeeMachine.makeMachine(30);
   const amateurMaker = new AmateurUser(maker5);
   const proMaker = new ProBarista(maker5);
   amateurMaker.makeCoffee();
   proMaker.makeCoffee();
}