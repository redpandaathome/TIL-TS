import { ImageComponent } from './components/page/item/image.js';
import { BaseComponent, Component } from './components/component.js'
import { PageComponent, PageItemComponent, Composable } from './components/page/page.js' 
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
import { InputDialog } from './components/dialog/dialog.js';

class App {
   // private readonly page:PageComponent;
   private readonly page:Component&Composable;

   constructor(appRoot:HTMLElement){
      this.page = new PageComponent(PageItemComponent)
      this.page.attachTo(appRoot, 'afterbegin')

      const image = new ImageComponent('title', 'https://picsum.photos/200')
      this.page.addChild(image)
      
      const note = new NoteComponent('note-title', 'note-body')
      this.page.addChild(note)

      const todo = new TodoComponent('todo-title', 'todo-body');
      this.page.addChild(todo)
      
      const video = new VideoComponent('video-title', "https://www.youtu.be/G7UEUf5KAvI")
      this.page.addChild(video)

      const imageBtn = document.querySelector("#new-image")! as HTMLButtonElement;
      imageBtn.addEventListener("click", ()=>{
         const dialog = new InputDialog();
         // const dialogBody = document.querySelector('#dialog__body')! as HTMLElement;
         dialog.setOnCloseListener(()=>{
            dialog.removeFrom(document.body)
         });

         dialog.setOnSubmitListener(()=>{
            dialog.removeFrom(document.body)
         });

         dialog.attachTo(document.body);
      })
   }
}

new App(document.querySelector('.document')! as HTMLElement)