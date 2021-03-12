import { ImageComponent } from "./components/page/item/image.js";
import { PageComponent } from "./components/page/page.js";

class App {
   private readonly page: PageComponent;
   // private readonly image: ImageComponent;
   constructor(appRoot: HTMLElement){
      this.page = new PageComponent();
      this.page.attachTo(appRoot);
      
      // this.image = new ImageComponent('https://picsum.photos/600/300','title🌼');
      // this.image.attachTo(appRoot);
      const image = new ImageComponent('https://picsum.photos/600/300','title🌼');
      image.attachTo(appRoot, 'beforeend')
   }
}

new App(document.querySelector('.document')! as HTMLElement);