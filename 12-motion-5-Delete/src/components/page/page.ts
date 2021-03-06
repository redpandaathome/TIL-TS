import { BaseComponent, Component} from '../component.js';

export interface Composable {
   addChild(child:Component):void; //✨
}

export class PageComponent extends BaseComponent<HTMLUListElement> {
   // private readonly page:HTMLUListElement;
   constructor(){
      super(`<ul class="page"></ul>`)
   }
   addChild(section:Component){
      const item = new PageItemComponent()
      item.addChild(section)
      item.attachTo(this.element, 'beforeend')
      item.setOnClickListener(()=>{
         item.removeFrom(this.element);
      })
   }
}
type OnCloseListener = ()=>void
//PageItemComponent를 만들어서...pageItem을 만든후 그 안에 섹션 넣고 얘를 document에 붙이기
export class PageItemComponent extends BaseComponent<HTMLElement> implements Composable{
   private closeListener?:OnCloseListener
   constructor(){
      super(`<li class="page-item">
               <section class="page-item__body"></section>
               <div class="page-item__controls">
                  <button class="close">x</button>
               </div>
            </li>`)
      const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
      closeBtn.onclick=()=>{
         this.closeListener && this.closeListener()
      }
   }

   addChild(child:Component){
      const container = this.element.querySelector(".page-item__body")! as HTMLElement;
      child.attachTo(container, "afterbegin");
   }

   setOnClickListener(listener:OnCloseListener){
      this.closeListener = listener
   }
}