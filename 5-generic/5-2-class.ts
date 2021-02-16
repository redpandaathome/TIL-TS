{
   // interface Either {
   //    left: ()=>number;
   //    right: ()=>number;
   // }

   // class SimpleEither implements Either {
   //    constructor(private leftValue: number, private rightValue: number){}
   //    left(): number{
   //       return this.leftValue
   //    }

   //    right(): number{
   //       return this.rightValue
   //    }
   // }

   // const either = new SimpleEither(4, 5);
   // either.left;
   // either.right;

   interface Either<L,R> {
      left: ()=>L;
      right: ()=>R;
   }

   //I:item, V:value 로도 많이쓴다.
   class SimpleEither<L, R> implements Either<L, R> {
      constructor(private leftValue: L, private rightValue: R){}
      left(): L{
         return this.leftValue
      }

      right(): R{
         return this.rightValue
      }
   }

   const either:Either<number, number> = new SimpleEither(4, 5);
   either.left(); //4
   either.right(); //5
   const best = new SimpleEither(4, 'hello');
   const best2 = new SimpleEither({'name':'Jelly'}, 'hello');
   //generic -> 활용성이 높은 함수/클래스 만들수 있다.

}