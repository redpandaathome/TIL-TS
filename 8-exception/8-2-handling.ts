{
   class TimeOutError extends Error {}
class OffLineError extends Error {}


class NetworkClient {
   tryConnect(): void {
      throw new Error(`no network!`)
   }
}

class UserService {
   constructor(private client: NetworkClient){}
   login(){
      this.client.tryConnect();
      //login...
   }
}

// const client = new NetworkClient();
// const service = new UserService(client);
// service.login(); //쥬금 o<-<

class App {
   constructor(private userService:UserService) {}
   
   run() {
      try {
         this.userService.login();
      } catch (error){
         // show dialog to user

         //아래처럼 되면 좋겠지만 error은 any타입이라 타입정보가 없기에 아래처럼 InstanceOf를 사용할 수 없다.
         // if(error instanceof OffLineError){
         //    //
         // }
         //따라서 세부적인 에러를 결정하고 싶을 때는 error state를 사용하는게 좋다 ✨->다음챕터로
      }
   }
}

const client = new NetworkClient();
const service = new UserService(client);
const app = new App(service);
app.run();

//어디에서 에러 처리 하는게 좋을까? 유저서비스 로그인에서 한다면 캐치는 해도 할 수 있는게 없다
}