{
   //function: login ->success, fail
   type SuccessState = {
      result: 'success';
      response: {
      body: string;
      };
   };
   type FailState = {
      result: 'fail';
      reason: string;
   }

   type LoginState = SuccessState | FailState;

   function login(): LoginState{
      return {
         result: 'success',
         response: {
            body: 'logged in',
         }
      };
   }

   // printLoginState(state: LoginState)
   // success -> 🎉 body
   // fail -> 😭 reason

   function printLoginState(state:LoginState){
      if(state.result==='success'){
         console.log(`🎉 ${state.response.body}`)
      } else {
         console.log(`😭 ${state.reason}`)
      }
   }
   // let state1:SuccessState = {
   // response:{
   //    body: 'welcome'
   // }
   // };

   // let state2:FailState = {
   // reason:'wrong pwd'
   // }
   // printLoginState(state1);
   // printLoginState(state2);
}