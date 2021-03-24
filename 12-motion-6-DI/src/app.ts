import { ImageComponent } from './components/page/item/image.js';
import { BaseComponent, Component } from './components/component.js'
import { PageComponent, PageItemComponent, Composable } from './components/page/page.js' 
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';

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
   }
}

new App(document.querySelector('.document')! as HTMLElement)