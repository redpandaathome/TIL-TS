/**
 * Let's make a calculator 🧮
 */
console.log(calculate('add', 1, 3)); // 4
console.log(calculate('substract', 3, 1)); // 2
console.log(calculate('multiply', 4, 2)); // 8
console.log(calculate('divide', 4, 2)); // 2
console.log(calculate('remainder', 5, 2)); // 1

type Operation = 'add'|'substract'|'multiply'|'divide'|'remainder'
function calculate(operation:Operation, ...nums:number[]):number{
   let answer:number=0;
   switch (operation) {
      case 'add':{
         answer=nums.reduce((a,b)=>a+b)
         break;
      }
      case 'substract':{
         answer=nums.reduce((a,b)=>a-b)
         break;
      }
      case 'multiply':{
         answer=nums.reduce((a,b)=>a*b)
         break;
      }
      case 'divide':{
         answer=nums.reduce((a,b)=>a/b)
         break;
      }
      case 'remainder':{
         answer=nums.reduce((a,b)=>a%b)
         break;
      }
      default:
         throw Error('unknown command');
   }
   return answer;
}