{
   //Array
   const fruits:string[] = ['🍅','🍌']
   const scores:number[] = [1,2,3]
   const scores2:Array<number> = [1,2,3]

   //OK
   function printArray(fruits: readonly number[]){
   }
   //NOT OK
   // function printArray2(fruits: readonly Array<number>){
   // }


   //Tuple -서로 다른 타입을 함께 가질 수 있는 배열 ->interface, type alias, class로 대체해서 사용
   //권장하지 않음. 인덱스로 접근하는건 가독성이 떨어진다. obj처럼 키로 접근하는게 나은데.
   let student: [string, number];
   student=['name', 123];
   student[0] //name

   //object destructuring으로 튜플 받기.
   //동적으로 리턴하는데 클래스, 인터페이스, type alias로 묶기가 애매하고, 사용자가 이름을 정의해서 쓸 경우에는 유용할 수 있다.
   //그외의 일반적인 경우라면 class, interfase, type alias로 쓸 수 있을지 고민
   const [name, age] = student;
}