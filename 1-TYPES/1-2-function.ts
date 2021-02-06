{
   // //JS💩
   // function jsAdd(n1, n2){
   //    return n1+n2
   // }

   // //TS✨
   // function add(n1:number, n2:number) :number{
   //    return n1+n2;
   // }

   // //JS💩
   // function jsFetchNum(id){
   //    //code...
   //    return new Promise((resolve, reject)=>{
   //       resolve(100);
   //    });
   // }

   // //TS✨
   // function fetchNum(id:string):Promise<number> {
   //    //code...
   //    return new Promise((resolve, reject)=>{
   //       resolve(100);
   //    });
   // }

   //JS ✨ => TS
   //❓❔Optional Parameter - undefined를 전달하지 않아도 된다.
   function printName(firstName:string, lastName?:string){
      console.log(firstName);
      console.log(lastName); //undefined
   }
   printName('Steve', 'Jobs');
   printName('Jelly');
   printName('Steve', undefined);

   //ts-node 1-2-functions.ts
   //lastName?:string 대신에 lastName:string|undefined 로 한다면
   //함수 호출시 printName('Jelly', undefined)로 명시.

   //Default parameter
   function printMessage(message:string='default message'){
      console.log(message); //default값
   }
   printMessage();

   // Rest parameter
   function addNumbers(...numbers:number[]):number{
      
      return numbers.reduce((a,b)=>a+b) 
   }
   console.log(addNumbers(1,2));
   console.log(addNumbers(1,2,3,4,5));

}