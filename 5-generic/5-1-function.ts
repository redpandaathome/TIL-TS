{
   //모든 타입(숫자,문자...)을 하는건 비효율적
   function checkNotNullBad(arg:number|null):number {
      if(arg == null){
         throw new Error(`not valid number!`)
      }
      return arg;
   }

   const result = checkNotNullBad(123);
   console.log(result)
   // checkNotNullBad(null)

   //더 이상 타입이 보장되지 않는다(any)
   function checkNotNullAnyBad(arg:any|null):any{
      if(arg == null){
         throw new Error(`not valid number!`)
      }
      return arg;
   }

   //generic 이용 어떤 타입이든지 받을 수 있고 사용할 때 타입이 결정되어
   //타입을 보장
   //불리언->불리언, 숫자->숫자, 스트링->스트링 ...
   function checkNotNull<T>(arg: T|null):T {
      if(arg == null){
         throw new Error(`not valid number!`)
      }
      return arg;
   }
   const number = checkNotNull(123);
   const boal:boolean = checkNotNull(true);
}