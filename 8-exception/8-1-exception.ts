//예상 안: error state, 밖:exception
//Java: Exception class
//JS: Error class...
// const array = new Array(1000000000000000000); 
//RangeError: Invalid array length - RangeError:Error클래스를 상속한 세부 클래스

//Error(Exception) Handling: try -> catch -> finally

function readFile(fileName:string):string{
   if(fileName==="not exist!💩"){
      throw new Error(`file not exist! ${fileName}`)
   }
   return `file contents...`
}

function closeFile(fileName:string) {
   //
}

const fileName = 'file';
console.log(readFile(fileName));
closeFile(fileName);

const fileName2 = 'not exist!💩';
// console.log(readFile(fileName2)); //쥬금...ㅇ<-<
// closeFile(fileName2);


// try {
//    console.log(readFile(fileName2));
// } catch (error) {
//    console.log(`catched!! ${error}`);
// } finally {
//    closeFile(fileName2);
//    console.log(`finally`)
// }


function run(){
   try {
      console.log(readFile(fileName2));
   } catch (error) {
      console.log(`catched!! ${error}`);
      return; //밑에 코드를 실행할 필요없어!
   } finally{
      //catch문에서 다른에러가 발생하거나 return이 되서 아래 코드를 안타는 경우도 파이널리는 탄다.
      //따라서 마무리 해야할 일이 있다면(파일 닫기 등) 파이널리 안에서 해주는게 좋다.
      closeFile(fileName2);
      console.log(`finally`)  
   }
}
run() //에러가 발생해서 캐치가 되었어도 파이널리 수행은 보장된다.
//전부 다 감싸지 말고 정말 에러가 발생할 부분만 트라이 캐치로 감싸주는게 좋다.