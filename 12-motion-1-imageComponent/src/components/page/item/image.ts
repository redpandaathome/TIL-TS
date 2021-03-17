export class ImageComponent {
   private readonly element:HTMLElement; 
   constructor(title:string, url:string){
      // ✨
      const template = document.createElement('template');
      template.innerHTML = 
         `<section class="image">
            <div class="image__holder">
               <img src="" alt="" class="image__thumbnail">
               <h2 class="image__title"></h2>
            </div>
         </section>`

      //querySelector <->firstElementChild ?
      //how to put src into image tag?
      //✨
      this.element = template.content.firstElementChild! as HTMLElement;
      console.log("firstChild...", this.element)

      const imageElement = this.element.querySelector('.image__thumbnail')! as HTMLImageElement;
      imageElement.src=url;
      imageElement.alt=title;

      const titleElement = this.element.querySelector('.image__title')! as HTMLHeadingElement;
      titleElement.innerHTML= 'title';

   }
   attachTo(parent:HTMLElement, position:InsertPosition='beforeend'){
      parent.insertAdjacentElement(position, this.element);
   }
}