import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { PageComponent, Composable, PageItemComponent } from "./components/page/page.js";
import { Component } from "./components/component.js"
import { InputDialog } from "./components/dialog/dialog.js";

class App {
   // private readonly page: PageComponent;
   private readonly page: Component & Composable;

   // private readonly image: ImageComponent;
   constructor(appRoot: HTMLElement){
      this.page = new PageComponent(PageItemComponent);
      this.page.attachTo(appRoot);
      
      const image = new ImageComponent('https://picsum.photos/600/300','title🌼');
      this.page.addChild(image);
      // const dialog = new InputDialog();
      // dialog.setOncloseListener

      const note = new NoteComponent('note title', 'note body');
      this.page.addChild(note);

      const todo = new TodoComponent('todo title', 'todo body');
      this.page.addChild(todo);

      const video = new VideoComponent('video title', "https://youtu.be/hBnVhs3NmV8" );
      this.page.addChild(video);

      const imageBtn = document.querySelector("#new-image")! as HTMLButtonElement;
      imageBtn.addEventListener('click', ()=>{
         const dialog = new InputDialog();
         dialog.setOncloseListener(()=>{
            dialog.removeFrom(document.body)
         })
         dialog.setOnSubmitListener(()=>{
            dialog.removeFrom(document.body)
         })
         dialog.attachTo(document.body)
      })
   }
}

new App(document.querySelector('.document')! as HTMLElement);