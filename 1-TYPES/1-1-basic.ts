// global scope방지 ->local scope
{
   //JS
   //TS코드는 어짜피 JS코드로 변환이 되고,
   //타겟버전도 선택할 수 있으니 let을 써도 브라우저 호환성 문제 걱정할 것 없다
   //바벨로 ->낮은버전으로 바꿀 수 있으니 좋은 방식으로 코딩하자 
   
   /**
    * JS
    * Primitive: number,string,boolean,bigint, symbol, null, undefined
    * Object: function, array...
    */

    //number
    const num:number = -0.1;

    //string
    const str:string = 'hello'

    //boolean
    const boal:boolean=true

    //undefined -값이 있고 없고 (null보다 보편적으로 쓰임)
    let name:undefined; //나중에 값 넣을수가없다💩
    let age:number|undefined;
    age = undefined;
    age = 1;
    function find(): number|undefined{
       return undefined;
    }

    //null -값이 확실히 없다.
    let person:null; //💩
    let person2: string | null;

    //unknown 💩
    let notSure: unknown = 0;
    notSure = 'he';
    notSure = true;

    //any 💩
    let anything: any=0;
    anything = 'hello';

    //void
    function print(): void { //아무것도 리턴하지 않음! return;
       console.log('hello');
       return;
    }
    let unusable: void = undefined; //이렇게는 안쓴다 💩

    // never 함수에서 절대 리턴하지 않는다.(죽거나 중지되겠죠)
    function throwError2(message: string): never {
       //message ->server(log)
      //  throw new Error(message);
      while(true){

      }
    }
    let neverEnding: never; //💩 안씀

    // object
    let obj: object; //💩
    function acceptSomeObject2(obj: object){

    }
    acceptSomeObject2({name:'jelly'});
    acceptSomeObject2({animal:'dog'})

}