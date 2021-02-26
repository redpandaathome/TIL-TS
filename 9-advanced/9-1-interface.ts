type PositionType = {
   x: number;
   y: number;
}

interface PositionInterface {
   x: number;
   y: number;
}

// object
const obj1: PositionType = {
   x:1,
   y:1,
}

const obj2: PositionInterface = {
   x:1,
   y:1,
}

// 둘 다 class에서 구현가능
class Pos1 implements PositionType {
   x: number;
   y: number;
}

class Pos2 implements PositionInterface {
   x: number;
   y: number;
}

// Extends
type ZPositionType = PositionType & { z: number }; //intersecion 이용

interface ZPositionInterface extends PositionInterface { //상속
   z: number;
}

// INTERFAVE VS TYPE 초창기엔 비슷했으나 점차 달라지고 있다!

// 😀 Only interaces can be merged...
//아래처럼 한번 더 정의할 수도 있다. 각각 정의한 것을 합해서 이용->x,y,z
//타입에선 불가
// interface PositionInterface {
//    z: number;
// }

// 😀 Type aliases can use computed properties...
type Person = {
   name: string,
   age: number,
}
type Name = Person['name']; // string
type NumberType = number;
type Direction = 'left' | 'right' //union type