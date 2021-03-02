// import anyName, {print as printMessage} from './10-3-module1.js';
//혹은 default가 없다면
import * as calculator from './10-3-module1.js'
console.log(calculator.add(1,2))
calculator.print();
//변수도 가능
console.log(calculator.number);


// console.log(anyName(1,2))
//3이 뜬다...! 모듈화를 하지 않아서 글로벌 스코프이기에.
//window.add(1,3)

//type="module" 작성한 후에는 두 파일은 서로 접근x

//default가 아닌경우 {정확한이름}으로 임포트 또는 {정확한이름 as 원하는이름}
// printMessage();



//✨모듈화>파일간 이름 충돌 방지, 코드분리 ->모듈성업, 모듈간 재사용성도 업