import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild(child: Component): void; //✨
}

type SectionContainerConstructor = {
  new (): SectionContainer;
};

export class PageComponent extends BaseComponent<HTMLUListElement> {
   private dragTarget?: SectionContainer;
   private dropTarget?: SectionContainer;
   private children = new Set<SectionContainer>();
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super(`<ul class="page"></ul>`);

    this.element.addEventListener("dragover", (event: DragEvent) => {
      this.onDragOver(event);
    });

    this.element.addEventListener("drop", (event: DragEvent) => {
      this.onDrop(event);
    });
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    console.log("dragover...");
  }

  onDrop(event: DragEvent) {
    event.preventDefault();

   if(!this.dropTarget){
      return;
   }

   if(this.dragTarget && this.dragTarget !== this.dropTarget){
     //🌺1.
      const dropY = event.clientY;
      const srcElement = this.dragTarget.getBoundingRect();
      this.dragTarget.removeFrom(this.element);
      this.dropTarget.attach(this.dragTarget, dropY < srcElement.y ? 'beforebegin' : 'afterend');
   }
   //🌺4.
      this.dropTarget.onDropped();
  }

  addChild(section: Component) {
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
    item.setOnClickListener(() => {
      item.removeFrom(this.element);
      this.children.delete(item);
    });
    this.children.add(item);
    item.setOnDragStateListener(
      (target: SectionContainer, state: DragState) => {

        switch (state) {
          case "start":
             this.dragTarget = target;
             this.updateSection('mute');
            break;
          case "stop":
             this.dragTarget = undefined;
             this.updateSection('unmute');
            break;
          case "enter":
             console.log('enter', target)
             this.dropTarget = target;
            break;
          case "leave":
             console.log('leave', target)
             this.dropTarget = undefined;
            break;
          default:
            throw new Error(`err... unexpected state: ${state}`);
        }
      }
    );
  }

  updateSection(state: 'mute' | 'unmute'){
      this.children.forEach((section:SectionContainer) => {
         section.muteChildren(state);
      })
  }
}
type OnCloseListener = () => void;
type DragState = "start" | "stop" | "enter" | "leave";
type OnDragStateListener<T extends Component> = (
  target: T,
  state: DragState
) => void;

interface SectionContainer extends Composable, Component {
  setOnClickListener(listener: OnCloseListener): void;
  setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
  muteChildren(state: 'mute' | 'unmute'): void;
  getBoundingRect(): DOMRect;
  onDropped():void;
}

export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements SectionContainer {
  private closeListener?: OnCloseListener;
  private dragStateListener?: OnDragStateListener<PageItemComponent>;
  constructor() {
    super(`<li draggable=true class="page-item">
               <section class="page-item__body"></section>
               <div class="page-item__controls">
                  <button class="close">x</button>
               </div>
            </li>`);
    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };

    this.element.addEventListener("dragstart", (event: DragEvent) => {
      this.onDragStart(event);
    });

    this.element.addEventListener("dragend", (event: DragEvent) => {
      this.onDragEnd(event);
    });

    this.element.addEventListener("dragenter", (event: DragEvent) => {
      this.onDragEnter(event);
    });

    this.element.addEventListener("dragleave", (event: DragEvent) => {
      this.onDragLeave(event);
    });
  }
  onDragStart(event: DragEvent) {
    this.notifyDragObservers("start");
    //2.🌺
    this.element.classList.add('lifted');
  }

  onDragEnd(event: DragEvent) {
    this.notifyDragObservers("stop");
    this.element.classList.remove('lifted');
  }

  onDragEnter(event: DragEvent) {
    this.notifyDragObservers("enter");
    //3.🌺
    this.element.classList.add('drop-area')
  }

  onDragLeave(event: DragEvent) {
    this.notifyDragObservers("leave");
    this.element.classList.remove('drop-area')
  }

  notifyDragObservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }

  addChild(child: Component) {
    const container = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;
    child.attachTo(container, "afterbegin");
  }

  setOnClickListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }

  // 🌺 1.진입 포인트. pageItem이 움직일때 캐치할 listener 필요(dagging, over)
  setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>) {
    this.dragStateListener = listener;
  }

  muteChildren(state: 'mute' | 'unmute'){
     if (state === 'mute'){
         this.element.classList.add('mute-children');
     } else {
         this.element.classList.remove('mute-children');
     }
  }

  getBoundingRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }

  onDropped(): void {
    this.element.classList.remove('drop-area')
  }
}
