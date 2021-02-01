{
   /**
    * Enum
    */
   //JS
   const MAX_NUM = 6;
   const MAX_STUDENTS_PER_CLASS=10;
   const MONDAY=0;
   const TUESEDAY=1;
   const WEDNESDAY=2;
   const DAYS_ENUM = Object.freeze({"MONDAY":0, "TUESDAY":1, "WEDNESDAY":2})
   const dayOfToday = DAYS_ENUM.MONDAY;

   //TS 상수묶기 enum보다는 유니온 타입을 쓸 것! 조금 더 확실히 타입보존
   type DaysOfWeek = 'Monday'|'Tuesday'|'Wednesday';
   let dayOfWeek:DaysOfWeek = 'Monday';
   // dayOfWeek = 'jelly' //불가!
   // 모바일클라이언트와 개발시 사용자 데이터 json으로 묶어서 다시 다른 클라이언트 보내야 할 때
   // 네이티브 언어에서 유니온타입 표현할 방법이 없어 이넘타입을 쓴다.
   
   enum Days {
      Monday=1, //='mon' ->수동할당
      Tuesday,
      Wednesday,
      Thursday,
      Friday,
      Saturday,
      Sunday
   }
   console.log(Days.Friday);
   let day = Days.Saturday;
   console.log(day);
   day = Days.Monday;
   day=10; //이런 값이 없는데 문제없이 컴파일됨.
   console.log(day)


   //권장하지 않는다. 타입이 정확하게 보존되지않기때문
}