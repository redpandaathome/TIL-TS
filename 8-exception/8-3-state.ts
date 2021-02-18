{
   type SuccessState = {
      result: 'success'
   }
   type NetworkErrorState = {
      result: 'fail';
      reason: 'offline' | 'down' | 'timeout';
   }

   type ResultState = SuccessState | NetworkErrorState;
   class NetworkClient {
      //성공/실패 예상할 수 있다 - 그러니 throw를 남발하기보다는 error state를 쓰자.
      tryConnect(): ResultState {
         return { result: 'fail', reason: 'offline'}
      }
   }

   class UserService {
      constructor(private client: NetworkClient){}
      login(){
         return this.client.tryConnect();
         //login...
      }
   }

   class App {
      constructor(private userService:UserService) {}
      
      //✨ts의 union타입으로 가능한 모든 에러 케이스에 대해 error state를 만들어둠 -> try, catch 불필요
      run() {
         const status = this.userService.login();
         if(status.result === 'fail' && status.reason === 'offline'){
            //error handling...
            console.log('💩')
         }
      }
   }

   const client = new NetworkClient();
   const service = new UserService(client);
   const app = new App(service);
   app.run();
}