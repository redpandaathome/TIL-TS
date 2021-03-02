//defaul로 export시 다른 파일에서 아무이름으로 불러올 수 있다.
// export default function add(a,b) {
//    return a+b;
// }

export function add(a,b) {
   return a+b;
}

//한파일 내에서 두가지 "default" export를 쓸 순 없다.
export function print(){
   console.log("printing...🖨")
}

export const number = 10;