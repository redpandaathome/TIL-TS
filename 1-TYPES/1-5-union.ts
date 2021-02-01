{
   /**
    * Union Types: OR
    * 
    */
   type Direction = 'left'|'right'|'up'|'down';
   function move(direction: Direction) {
      console.log(direction);
   }
   move('up')

   type TileSize = 8|16|32;
   const tile:TileSize=32;

   //function: login ->success, fail
   type SuccessState = {
      response: {
         body: string;
      };
   };
   type FailState = {
      reason: string;
   }

   type LoginState = SuccessState | FailState;

   function login(): LoginState{
      return {
         response: {
            body: 'logged in',
         }
      };
   }

   // printLoginState(state: LoginState)
   // success -> 🎉 body
   // fail -> 😭 reason

   function printLoginState(state:LoginState){
      if('response' in state){
         console.log(`🎉 ${state.response.body}`)
      } else {
         console.log(`😭 ${state.reason}`)
      }
   }
   let state1:SuccessState = {
      response:{
         body: 'welcome'
      }
   };

   let state2:FailState = {
      reason:'wrong pwd'
   }
   printLoginState(state1);
   printLoginState(state2);

}