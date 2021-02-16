/**
 * Let's make a game 🕹
 */
const position = {x:0, y:0}
// type Command = 'up'|'down'|'left'|'right';
// function move(command:Command){

   //8-1-exception.ts ✨he를 추가하면...?
function move(command: 'up'|'down'|'left'|'right'|'he'){
   switch(command){
      case 'up':
         position.y+=1;
         // return position;
         break;
      case 'down':
         position.y-=1;
         // return position;
         break;
      case 'left':
         position.x-=1;
         // return position;
         break;
      case 'right':
         position.x+=1;
         // return position;
         break;
      //✨더이상 에러 안남
      case 'he':
         position.x+=1;
         // return position;
         break;
      default:
         //✨ 8-1-exception.ts
         //Type 'string' is not assignable to type 'never'
         const invalid: never = command;
         throw Error(`unknown command: ${invalid}`);
   }
}


console.log(position); // { x: 0, y: 0}
move('up');
console.log(position); // { x: 0, y: 1}
move('down');
console.log(position); // { x: 0, y: 0}
move('left');
console.log(position); // { x: -1, y: 0}
move('right');
console.log(position); // { x: 0, y: 0}