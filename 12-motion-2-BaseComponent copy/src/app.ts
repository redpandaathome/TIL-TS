import { ImageComponent } from './components/page/item/image.js';
import { PageComponent } from './components/component.js'
class App {
   private readonly page:PageComponent;
   private readonly image:ImageComponent;
   constructor(appRoot:HTMLElement){
      this.page = new PageComponent()
      this.page.attachTo(appRoot);
      this.image = new ImageComponent('title', 'https://picsum.photos/200')
      this.image.attachTo(appRoot);
   }
}

new App(document.querySelector('.document')! as HTMLElement)