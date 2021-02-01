{
   /**
    * Type Inference
    */
   let text = 'hello';
   text = 'hi';
   // text = 1 no

   function print(message = "default...Hi"){ //message타입 명시 안하면 :any 할당
      console.log(message);
   }

   function add(x:number, y:number){
      return x+y;
   }

   const result = add(1,2)
}