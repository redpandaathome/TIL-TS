import { BaseComponent, Component} from '../component.js';

export interface Composable {
   addChild(child:Component):void; //✨
}

type SectionContainerConstructor = {
   new ():SectionContainer
}

export class PageComponent extends BaseComponent<HTMLUListElement> {
   constructor(private pageItemConstructor:SectionContainerConstructor){
      super(`<ul class="page"></ul>`)
      
      this.element.addEventListener('dragover', (event:DragEvent)=>{
         this.onDragOver(event)
      })
   
      this.element.addEventListener('drop', (event:DragEvent)=>{
         this.onDrop(event)
      })
   }

   onDragOver(event:DragEvent){
      event.preventDefault()
      console.log('dragover...')
   }

   onDrop(event:DragEvent){
      event.preventDefault()
      console.log('dragdrop...')
   }

   addChild(section:Component){
      const item = new this.pageItemConstructor()
      item.addChild(section)
      item.attachTo(this.element, 'beforeend')
      item.setOnClickListener(()=>{
         item.removeFrom(this.element);
      })
      //🌺 4.
      item.setOnDragStateListener((target: SectionContainer, state: DragState) => {
         console.log(target, state)
      })
   }
}
type OnCloseListener = ()=>void
type DragState = 'start' | 'end' | 'enter' | 'leave';
type OnDragStateListener<T extends Component> = (target:T, state:DragState)=>void

interface SectionContainer extends Composable, Component{
   setOnClickListener(listener:OnCloseListener):void
   // 🌺 3.
   setOnDragStateListener(listener:OnDragStateListener<SectionContainer>):void;
}

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer{
   private closeListener?:OnCloseListener
   private dragStateListener?:OnDragStateListener<PageItemComponent>
   constructor(){
      super(`<li draggable=true class="page-item">
               <section class="page-item__body"></section>
               <div class="page-item__controls">
                  <button class="close">x</button>
               </div>
            </li>`)
      const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
      closeBtn.onclick=()=>{
         this.closeListener && this.closeListener()
      }

      this.element.addEventListener('dragstart', (event:DragEvent)=>{
         this.onDragStart(event)
      })
   
      this.element.addEventListener('dragend', (event:DragEvent)=>{
         this.onDragEnd(event)
      })

      //🌺2.
      this.element.addEventListener('dragenter', (event:DragEvent)=>{
         this.onDragEnter(event)
      })
   
      this.element.addEventListener('dragleave', (event:DragEvent)=>{
         this.onDragLeave(event)
      })
   }
   onDragStart(event:DragEvent){
      this.notifyDragObservers('start')
   }

   onDragEnd(event:DragEvent){
      this.notifyDragObservers('end')
   }

   onDragEnter(event:DragEvent){
      this.notifyDragObservers('enter')
   }

   onDragLeave(event:DragEvent){
      this.notifyDragObservers('leave')
   }

   notifyDragObservers(state:DragState){
      //🌺
      this.dragStateListener && this.dragStateListener(this, state);
   }

   addChild(child:Component){
      const container = this.element.querySelector(".page-item__body")! as HTMLElement;
      child.attachTo(container, "afterbegin");
   }

   setOnClickListener(listener:OnCloseListener){
      this.closeListener = listener
   }

   // 🌺 1.진입 포인트. pageItem이 움직일때 캐치할 listener 필요(dagging, over)
   setOnDragStateListener(listener:OnDragStateListener<PageItemComponent>){
      this.dragStateListener = listener;
   }
}