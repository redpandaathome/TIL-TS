import { BaseComponent } from "../component.js";

export class TextSectionInput extends BaseComponent<HTMLElement> {
   constructor(){
      super(`<div>
               <div class="form__container">
                  <label for="title">Title</label>
                  <input type="text" id="title">
               </div>
               <div class="form__container">
                  <label for="body">Body</label>
                  <textarea type="text" row="3" id="body"></textarea>
               </div>
            </div>`)
   }

   get title(): string {
      const title = document.querySelector('#title')! as HTMLInputElement;
      return title.value;
   }
       
   get body(): string {
      const body = document.querySelector('#body')! as HTMLInputElement;
      return body.value;
   }
}