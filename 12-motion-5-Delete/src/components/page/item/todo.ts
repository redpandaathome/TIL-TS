import { BaseComponent } from "../../component.js";

export class TodoComponent extends BaseComponent<HTMLElement>{
   // private readonly element:HTMLElement; 
   constructor(title:string, body:string){
      super(`<section class="todo">
               <h2 class="todo__title"></h2>
               <input type="checkbox" class="todo-checkbox">
            </section>`)

      const titleElement = this.element.querySelector('.todo__title')! as HTMLHeadingElement;
      titleElement.textContent=title;
      const bodyElement = this.element.querySelector('.todo-checkbox')! as HTMLInputElement;
      // bodyElement.textContent= body; // ???? 확인할 것! textContent... insertAdjacentText... innerText innerHTML...ah...
      bodyElement.insertAdjacentText('afterbegin', body)
   }
}