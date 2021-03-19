import { ImageComponent } from './components/page/item/image.js';
import { BaseComponent } from './components/component.js'
import { PageComponent } from './components/page/page.js' 
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
class App {
   private readonly page:PageComponent;
   private readonly image:ImageComponent;
   private readonly note:NoteComponent;
   private readonly todo:TodoComponent;
   private readonly video:VideoComponent;
   constructor(appRoot:HTMLElement){
      this.page = new PageComponent()
      this.page.attachTo(appRoot, 'afterbegin');
      this.image = new ImageComponent('title', 'https://picsum.photos/200')
      this.image.attachTo(appRoot, 'beforeend');
      this.note = new NoteComponent('note-title', 'note-body')
      this.note.attachTo(appRoot, 'beforeend')
      this.todo = new TodoComponent('todo-title', 'todo-body');
      this.todo.attachTo(appRoot, 'beforeend');
      // this.video = new VideoComponent('video-title', "https://www.youtube.com/embed/G7UEUf5KAvI")
      this.video = new VideoComponent('video-title', "https://www.youtu.be/G7UEUf5KAvI")
      this.video.attachTo(appRoot, 'beforeend')
   }
}

new App(document.querySelector('.document')! as HTMLElement)