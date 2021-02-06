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
      private static BEANS_GRAMM_PER_SHOT:number=7; //static ->class level (메모리낭비줄이기)
      private coffeeBeans: number = 0; //instance (object) level

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

   class User {
      // firstName: string;
      // lastName: string;
      // fullName: string;
      // constructor(firstName: string, lastName: string){
      //    this.firstName = firstName;
      //    this.lastName = lastName;
      //    this.fullName = `${firstName} ${lastName}`
      // }
      get fullName():string{
         return `${this.firstName} ${this.lastName}`; 
      }
      private internalAge=4;
      get age():number{
         return this.internalAge;
      }
      set age(num:number){
         //유효성검사
         if(num<0){}
         this.internalAge=num;
      }
      //constructor안에 private ->바로 멤버변수로 설정
      constructor(private firstName: string, private lastName:string){
         this.firstName =firstName;
         this.lastName =lastName;
      }
   }

   const user = new User('Jelly', 'Fish');
   console.log(`user: ${user}`)
   console.log(user.fullName);
   // user.firstName = "Belly"; =>여전히 Jelly Fish로 나온다.
   // constructor에서 this.fullName = `${firstName} ${lastName}` 로 설정된 이후로 변경되지 않음=>getter를 쓰면 해결
   
   user.age=7; //set 호출
   console.log(user.age);
   console.log(user.fullName); //get fullName으로 바꾸고 업데이트 사항 반영
   
}