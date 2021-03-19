import { BaseComponent } from '../component.js';

export class PageComponent extends BaseComponent<HTMLUListElement> {
   // private readonly page:HTMLUListElement;
   constructor(){
      super(`<ul class="page">
               This is pageComponent
            </ul>`)
   }
}