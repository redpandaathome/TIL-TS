{
   interface Stack<T> {
      readonly size: number;
      push(value: T):void;
      pop():T;
   }

   type StackNode<T> = {
      readonly value: T; //readonly 불변성유지위함
      // next:StackNode|undefined;
      readonly next?:StackNode<T>;
   }

   class StackImpl<T> implements Stack<T> {
      private _size:number = 0; //내부에서만 쓰이고 동명의 public 변수가 있구나
      private head?:StackNode<T>;
      constructor(private capacity: number){}
      get size(){
         return this._size
      }

      push(value: T):void{
         if(this.capacity === this.size){
            throw new Error(`Stack is full`)
         }
         //✨
         const node = { value, next: this.head };
         this.head = node;
         this._size++;
      };
      pop():T{
         // null == undefined, null !== undefined
         // 아래 조건을 === undefined로 하면 null일때는 거르지 못하고 로직 타버림
         if(this.head == null){ //✨null, undefined 둘다 거를 수 있다.
            throw new Error(`Stack is empty!`)
         }
         const node = this.head
         this.head = node.next
         this._size--;
         return node.value
      };

   }

   const stack = new StackImpl<string>(3);
   stack.push('a')
   stack.push('b')
   stack.push('c')
   while(stack.size !== 0){
      console.log(stack.pop())
   }

   const stack2 = new StackImpl<number>(3);
   stack2.push(1)
   stack2.push(2)
   stack2.push(3)
   while(stack2.size !== 0){
      console.log(stack2.pop())
   }
}