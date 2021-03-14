import { BaseComponent } from "../../component.js";

export class ImageComponent extends BaseComponent<HTMLElement>{
   constructor(url:string, title:string){
      super(
         `<section class="image">
            <div class="image__holder">
               <img src="" alt="" class="img__thumbnail">
               <h2 class="image__title"></h2>
            </div>
         </section>`
      )

      const imageElement = this.element.querySelector('.img__thumbnail')! as HTMLImageElement;
      imageElement.src = url;
      imageElement.alt = title;
      const titleElement = this.element.querySelector('.image__title')! as HTMLParagraphElement;
      titleElement.textContent = title;
   }
}