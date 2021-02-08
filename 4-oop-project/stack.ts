{
   // push, pop 구현 배열사용하지 말고 스스로 클래스 만들어서!
   // 시간 제한해놓고 하자! ✨💜🧘🏻‍♀️ 
   //스택 사용자가 나중에 스택이 변경/업데이트되도 전혀 몰라도 되고(인터페이스만 쓰기에) 사용하는 곳의 코드를 변경하지 않아도 됌

   interface Stack {
      readonly size: number;
      push(value: string):void;
      pop():string;
   }

   class Node {
      public value:string
      public next:Node|null
      constructor(value){
         this.value = value,
         this.next = null
      }
   }

   class NewArray implements Stack {
      constructor(
         public size:number =0,
         public head:Node|null = null         
         ){
            this.head = head
            this.size = size
      }
      push(value:string):void{
         //새헤드 -> 기존헤드(next)
         let newNode = new Node(value)
         if(!this.head){
            this.head=newNode
            this.size++
            return;
         }

         let prevHead = this.head;
         this.head=newNode;
         this.head.next = prevHead;
         this.size++;
         return
      }

      pop():string{
         //기존 head 대신 head:head next
         if(!this.head){
            return 'nothing to pop'
         }
         let prevHead = this.head
         let headNext = this.head.next
         this.head =headNext;
         this.size--;
         return prevHead!.value
      }
   }

   let stack1 = new NewArray()
   console.log(stack1)
   stack1.push('a')
   console.log(stack1)
   stack1.push('b')
   console.log(stack1)
   stack1.pop()
   console.log(stack1)


   
}
