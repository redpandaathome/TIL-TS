import { BaseComponent, Component } from "../component.js";
import { Composable } from "../page/page.js";

type OnCloseListener = ()=>void;
type OnSubmitListener = ()=>void;


//composable 구현 - 다양한 타입의 컨텐츠를 추가할 수 있게.
export class InputDialog extends BaseComponent<HTMLElement> implements Composable {
   closeListener?: OnCloseListener;
   submitListener?: OnSubmitListener;
   constructor(){
      super(`<dialog class="dialog">
               <div class="dialog__container">
                  <button class="close">X</button>
                  <div id="dialog__body"></div>
                  <button class="dialog__submit">ADD</button>
               </div>
            </dialog>`)
      
      const closeBtn = this.element.querySelector(".close")! as HTMLElement;
      closeBtn.onclick = () => {
         this.closeListener&&this.closeListener()
      }

      const submitBtn = this.element.querySelector(".dialog__submit")! as HTMLElement;
      submitBtn.onclick = () => {
         this.submitListener&&this.submitListener()
      }
   }

   setOncloseListener(listener:OnCloseListener){
      this.closeListener = listener;
   }

   setOnSubmitListener(listener:OnSubmitListener){
      this.submitListener = listener;
   }

   addChild(child:Component){
      const body = this.element.querySelector("#dialog__body")! as HTMLElement;
      child.attachTo(body);
   }
}