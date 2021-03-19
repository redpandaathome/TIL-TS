export interface Component {
   attachTo(parent:HTMLElement, position?:InsertPosition):void;
}

export class BaseComponent<T extends HTMLElement> implements Component {
   protected readonly element: T;
   constructor(htmlString:string){
      const template = document.createElement('template');
      template.innerHTML = htmlString;
      this.element = template.content.firstElementChild! as T; 
      //🙃 content...왜...필요?
      //const template: HTMLTemplateElement
      /** Enables access to the contents of an HTML <template> element. */
      // interface HTMLTemplateElement extends HTMLElement {
      //    readonly content: DocumentFragment;
   }
   attachTo(parent:HTMLElement, position:InsertPosition='afterbegin'){
      parent.insertAdjacentElement(position, this.element);
   }
}