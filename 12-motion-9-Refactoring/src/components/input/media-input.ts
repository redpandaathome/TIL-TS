import { BaseComponent } from "../component.js";

export class MediaSectionInput extends BaseComponent<HTMLElement> {
   constructor(){
      super(`<div>
               <div class="form__container">
                  <label for="title">Title</label>
                  <input type="text" id="title">
               </div>
               <div class="form__container">
                  <label for="url">URL</label>
                  <input type="text" id="url">
               </div>
            </div>`)
   }

   get title(): string {
      const title = document.querySelector('#title')! as HTMLInputElement;
      return title.value;
   }
       
   get url(): string {
      const url = document.querySelector('#url')! as HTMLInputElement;
      return url.value;
   }
}