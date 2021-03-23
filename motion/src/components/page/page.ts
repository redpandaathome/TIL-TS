import { BaseComponent, Component } from "../component.js";

export interface Composable {
   addChild(child:Component):void
}
export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
   constructor() {
      super('<ul class="page"></ul>')
   }

   addChild(section:Component){
      const item = new PageItemComponent();
      item.addChild(section)
      item.attachTo(this.element, 'beforeend');
      item.setOnCloseListener(()=>{
         item.removeFrom(this.element)
      })
   }

}

type OnCloseListener = () => void
export class PageItemComponent extends BaseComponent<HTMLLIElement> implements Composable {
   private closeListener?: OnCloseListener; //✨
   constructor(){
      super(
         `<li class="page-item">
            <section class="page-item__body"></section>
            <div class="page-item__controls">
               <button class="close">&times;</button>
            </div>
         </li>`
      )
      const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
      closeBtn.onclick = () => {
         this.closeListener && this.closeListener() //this.closeListener가 있으면 호출
      }
   }
   addChild(child:Component){
      const item = this.element.querySelector('.page-item__body')! as HTMLElement;
      child.attachTo(item);
   }
   setOnCloseListener(listener:OnCloseListener){
      this.closeListener = listener; //전달받은 리스너로 등록
   }
}
