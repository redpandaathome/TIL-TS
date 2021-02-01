{
   /**
    * Type Assertions 💩
    */
   function jsStrFunc(): any {
      return 'hello';
   }

   const result = jsStrFunc();
   //TS는 result가 any타입이라 문자열타입의 api를 쓸 수 없다
   //하지만 확신한다? 그럼 type assertion사용
   console.log((result as string).length);
   console.log((<string>result).length);

   //hello대신 2 -> 코드상 문제없음->실행하면 undefined! 죽거나 exception은 아니지만...
   //따라서 100퍼 장담할때 쓸 것.

   const wrong: any =5;
   // console.log((wrong as Array<number>).push(1));//😱

   function findNumbers(): number[]|undefined {
      return undefined;
   }
   const numbers = findNumbers(); //또는 findNumbers()!;
   console.log(numbers?.push(2));
   console.log(numbers!.push(2)); //😱 무조건 undefined 아니라 확신

   const button = document.querySelector('class'); //100퍼 있으면 ('class')!
   if(button){
      //있다는 가정하라 관련 api 호출 가능
      button.nodeValue;
   }
}