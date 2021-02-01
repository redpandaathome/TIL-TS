{
   /**
    * Type Aliases - 원하는 타입 정의
    */

    type Text = string;
    const name: Text = 'jelly'
    const address: Text = 'korea'
    type Num = number;
    type Student = {
       name:Text,
       age:Num
    }
    const student: Student = {
       name:'Tom',
       age:20
    }

    /**
     * String Literal types
     */
    type Name = 'callmebyyourname';
    let myName: Name;
    myName = 'callmebyyourname'

    type Boal = true;
    const isCat: Boal = true;
}