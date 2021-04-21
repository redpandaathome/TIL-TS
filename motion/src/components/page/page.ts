import { BaseComponent, Component } from "../component.js";

export interface Composable {
   addChild(child:Component):void
}

type SectionContainerConstructor = {
   new (): SectionContainer;
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
   private children = new Set<SectionContainer>();
   private dragTarget?: SectionContainer;
   private dropTarget?: SectionContainer;
   constructor(private pageItemConstructor: SectionContainerConstructor) {
      super('<ul class="page"></ul>')
      this.element.addEventListener('dragover', (event: DragEvent)=> {
         this.onDragOver(event)
      })

      this.element.addEventListener('drop', (event: DragEvent)=> {
         this.onDrop(event)
      })
   }

   onDragOver(event:DragEvent){
      event.preventDefault();
      console.log('onDragOver')
   }

   onDrop(event:DragEvent){
      event.preventDefault();
      console.log('onDrop')
      // 위치 바꾸기!
      if(!this.dropTarget){
         //dropTarget이 undefined라면...
         return;
      }
      
      if(this.dragTarget && this.dragTarget !== this.dropTarget){
         const dropY = event.clientY;
         const srcElement = this.dragTarget.getBoundingRect();
         this.dragTarget.removeFrom(this.element)
         this.dropTarget.attach(this.dragTarget, dropY < srcElement.y ? 'beforebegin' : 'afterend')
      }
   }

   addChild(section:Component){
      const item = new this.pageItemConstructor();
      item.addChild(section)
      item.attachTo(this.element, 'beforeend');
      item.setOnCloseListener(()=>{
         item.removeFrom(this.element)
         this.children.delete(item);
      })
      this.children.add(item);
      item.setOnDragStateListener((target: SectionContainer, state: DragState) => {
         // console.log(target, state)
         switch(state){
            case 'start':
               console.log('start', target)
               this.dragTarget = target;
               this.updateSection('mute');
               break;
            case 'stop':
               console.log('stop', target)
               this.dragTarget = undefined;
               this.updateSection('unmute');
               break;
            case 'enter':
               console.log('enter', target)
               this.dropTarget = target;
               break;
            case 'leave':
               console.log('leave', target)
               this.dropTarget = undefined;
               break;
            default:
               throw new Error(`unsupported state: ${state}`)
         }
      })
   }

   private updateSection(state: 'mute' | 'unmute') {
      this.children.forEach((section: SectionContainer) => {
         section.muteChildren(state);
      })
   }
}

type OnCloseListener = () => void
type DragState = 'start' | 'stop' | 'enter' | 'leave';
type OnDragStateListener<T extends Component> = (target: T, state: DragState) => void;

interface SectionContainer extends Component, Composable {
   setOnCloseListener(listener:OnCloseListener):void
   setOnDragStateListener(listener: OnDragStateListener<SectionContainer>):void;
   muteChildren(state: 'mute'|'unmute'):void;
   getBoundingRect(): DOMRect;
}

export class PageItemComponent extends BaseComponent<HTMLLIElement> implements SectionContainer {
   private closeListener?: OnCloseListener; //✨
   private dragStateListener?: OnDragStateListener<PageItemComponent>;
   constructor(){
      super(
         `<li draggable="true" class="page-item">
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

      this.element.addEventListener('dragstart', (event: DragEvent)=> {
         this.onDragStart(event)
      })

      this.element.addEventListener('dragend', (event: DragEvent)=> {
         this.onDragEnd(event)
      })

      this.element.addEventListener('dragenter', (event: DragEvent)=> {
         this.onDragEnter(event)
      })

      this.element.addEventListener('dragleave', (event: DragEvent)=> {
         this.onDragLeave(event)
      })

   }

   onDragStart(_: DragEvent) {
      this.notifyDragObservers('start');
   }

   onDragEnd(_: DragEvent) {
      this.notifyDragObservers('stop');
   }

   onDragEnter(_: DragEvent) {
      this.notifyDragObservers('enter');
   }

   onDragLeave(_: DragEvent) {
      this.notifyDragObservers('leave');
   }

   notifyDragObservers(state: DragState){
      this.dragStateListener && this.dragStateListener(this, state);
   }

   addChild(child:Component){
      const item = this.element.querySelector('.page-item__body')! as HTMLElement;
      child.attachTo(item);
   }
   
   setOnCloseListener(listener:OnCloseListener){
      this.closeListener = listener; //전달받은 리스너로 등록
   }

   setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>) {
      this.dragStateListener = listener;
   }

   muteChildren(state: 'mute'|'unmute') {
      if(state === 'mute'){
         this.element.classList.add('mute-children');
      } else {
         this.element.classList.remove('mute-children');
      }
   }

   getBoundingRect(): DOMRect {
      return this.element.getBoundingClientRect();
   }
}
