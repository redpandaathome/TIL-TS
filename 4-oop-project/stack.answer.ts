{
   interface Stack {
      readonly size: number;
      push(value: string):void;
      pop():string;
   }

   type StackNode = {
      readonly value: string; //readonly 불변성유지위함
      // next:StackNode|undefined;
      readonly next?:StackNode;
   }

   class StackImpl implements Stack {
      private _size:number = 0; //내부에서만 쓰이고 동명의 public 변수가 있구나
      private head?:StackNode;
      constructor(private capacity: number){}
      get size(){
         return this._size
      }

      push(value: string):void{
         if(this.capacity === this.size){
            throw new Error(`Stack is full`)
         }
         const node:StackNode = {
            value, next: this.head
         }
         this.head = node;
         this._size++;
      };
      pop():string{
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

   const stack = new StackImpl(3);
   stack.push('a')
   stack.push('b')
   stack.push('c')
   while(stack.size !== 0){
      console.log(stack.pop())
   }

}