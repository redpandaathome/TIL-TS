Array; //lib.es5.d.ts 참고 

type Student = {
   passed: boolean
}

//#every 2
const students: Student[] = [ {passed:true}, {passed:true}, {passed:false} ];
// students.every(student=>student.passed) ... 아래와 동일! {return }
const result = students.every(student=>{return student.passed})
console.log(result); //false (하나라도 false가 있으면 false)


//#every 1
//every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): this is S[];
class Animal{}
class Cat {
   isCat:boolean = true;
}
class Dog {
   isDog:boolean = false;
}
const animals: Animal[] = [ new Cat(), new Cat(), new Dog() ];
function isCat(animal: Animal): animal is Cat {
   return (animal as Cat).isCat !== undefined;
}
console.log( animals.every<Cat>(isCat) );