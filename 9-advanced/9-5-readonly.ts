{
   type ToDo = {
      title: string;
      description: string;
   }

   // function display(todo: ToDo) {
   //    // todo.title = 'jaja'; 가변->불변이 낫다.
   //    //왠만한 type은 이미 utility type으로 정의되어있다.
   // }

   function display(todo: Readonly<ToDo>) {

   }
}