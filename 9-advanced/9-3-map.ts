{
   type Video = {
      title: string;
      author: string;
      //뭐 하나 추가될때 마다 다 찾아서 추가해줘야...
      // description: string;
   }

   // type VideoOptional = {
   //    title?: string;
   //    author?: string;
   //    description?: string;

   // }

   // type VideoReadOnly = {
   //    readonly title?: string;
   //    readonly author?: string;
   //    readonly description?: string;
   // }

   // 재사용해보자 맵타입이용해서
   type Optional<T> = {
      [P in keyof T]?: T[P] //for...in
   }

   type VideoOptional = Optional<Video>;
   const videoOp:VideoOptional = {

   }

   type Animal = {
      name: string;
      age: number;
   }

   const animal: Optional<Animal> = {
      age:3
   }

   animal.name = 'hey'

   //
   type ReadOnly<T> = {
      readonly [P in keyof T]?: T[P];
   }

   // type VideoReadOnly = ReadOnly<Video>;
   const video: ReadOnly<Video> = {
      title: 'jelly'
   }

   // video.title = 'hey' not working(read only)
   //map -> (기존->새로운 타입으로)

   type Nullable<T> = { [P in keyof T]: T[P] | null };
   const obj2: Nullable<Video> = {
      title: null,
      author: null,
   }

   // ???
   type Proxy<T> = {
      get(): T;
      set(value: T): void;
   }

   type Proxify<T> = {
      [P in keyof T]: Proxy<T[P]>;
   }
}