import { ImageComponent } from './components/page/item/image.js';
import { BaseComponent } from './components/component.js'
import { PageComponent } from './components/page/page.js' 
class App {
   private readonly page:PageComponent;
   private readonly image:ImageComponent;
   
   constructor(appRoot:HTMLElement){
      this.page = new PageComponent()
      this.page.attachTo(appRoot, 'afterbegin');
      this.image = new ImageComponent('title', 'https://picsum.photos/200')
      this.image.attachTo(appRoot, 'beforeend');
   }
}

new App(document.querySelector('.document')! as HTMLElement)