export class PageComponent {
   private readonly page:HTMLUListElement;
   constructor(){
      this.page = document.createElement('ul');
      this.page.setAttribute('class', 'page');
      this.page.textContent = 'This is pageComponent';
   }

   attachTo(parent:HTMLElement, position:InsertPosition='afterbegin'){
      parent.insertAdjacentElement(position, this.page);
   }
}