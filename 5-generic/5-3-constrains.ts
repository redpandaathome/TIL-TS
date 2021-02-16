{
   interface Employee {
      pay(): void;
   }

   class FullTimeEmployee implements Employee {
      pay(){
         console.log(`full time`)
      }

      workFullTime(){}
   }

   class PartTimeEmployee implements Employee {
      pay(){
         console.log(`part time`)
      }

      workPartTime(){}
   }

   // 세부적인 타입(Employee)을 인자로 받아서 정말 추상적인 타입으로 다시 리턴하는 함수는 💩
   function payBad(employee: Employee):Employee{
      employee.pay();
      return employee
   }

   //generic 이지만 Employee를 확장한 아이들까지.
   function pay<T extends Employee>(employee:T): T{
      employee.pay();
      return employee
   }

   const elli = new FullTimeEmployee();
   const bob = new PartTimeEmployee();
   elli.workFullTime();
   bob.workPartTime();

   // const ellieAfterPay = pay(elli);
   // const bobAfterPay = pay(bob);
   // ellieAfterPay.pay ... pay밖에 없음! workFullTime 없다.
   // 세부 클래스정보를 잃어버림. 풀타임워커가 확실하다면 캐스팅(as...) -> 좋지 않다.->제네릭을 쓰자!
   const ellieAfterPay = payBad(elli) as FullTimeEmployee;
   const bobAfterPay = payBad(bob) as PartTimeEmployee;
   ellieAfterPay.workFullTime();

   //연습2
   const obj = {
      name: 'ellie',
      age: 20
   }

   const obj2 = {
      animal: '🐈'
   }

   function getValue<T, K extends keyof T>(obj:T, key:K):T[K] {
      return obj[key];
   }

   console.log(getValue(obj, 'name')); // ellie
   console.log(getValue(obj, 'age')); // 20
   console.log(getValue(obj2, 'animal')); // 🐈

}