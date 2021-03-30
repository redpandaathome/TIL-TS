import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { PageComponent, Composable, PageItemComponent } from "./components/page/page.js";
import { Component } from "./components/component.js"
import { InputDialog, MediaData, TextData } from "./components/dialog/dialog.js";
import { MediaSectionInput } from "./components/input/media-input.js";
import { TextSectionInput } from "./components/input/text-input.js";

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
   new (): T;
}

class App {
   // private readonly page: PageComponent;
   private readonly page: Component & Composable;

   // ✨dialogRoot 멤버변수화
   constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement){
      this.page = new PageComponent(PageItemComponent);
      this.page.attachTo(appRoot);
      // ✨🌺
      this.bindElementToDialog<MediaSectionInput>(
         "#new-image", 
         MediaSectionInput, 
         (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
      )
      
      this.bindElementToDialog<MediaSectionInput>(
         "#new-video", 
         MediaSectionInput, 
         (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
      )

      this.bindElementToDialog<TextSectionInput>(
         "#new-note", 
         TextSectionInput, 
         (input: TextSectionInput) => new NoteComponent(input.title, input.body)
      )

      this.bindElementToDialog<TextSectionInput>(
         "#new-todo", 
         TextSectionInput, 
         (input: TextSectionInput) => new TodoComponent(input.title, input.body)
      )

   }

   //🌺 추후 다른 종류의 미디어 인풋을 추가하고 싶을 때 확장성이 올라간다.
   private bindElementToDialog<T extends (MediaData | TextData) & Component >(
      selector:string, 
      InputComponent: InputComponentConstructor<T>,
      makeSection: (input: T) => Component
   ) {
      const element = document.querySelector(selector)! as HTMLButtonElement;
      element.addEventListener('click', ()=>{
         const dialog = new InputDialog();
         const input = new InputComponent();
         dialog.addChild(input)
         dialog.attachTo(this.dialogRoot)

         dialog.setOncloseListener(()=>{
            dialog.removeFrom(this.dialogRoot)
         })
         dialog.setOnSubmitListener(()=>{
            const image = makeSection(input)
            this.page.addChild(image);
            dialog.removeFrom(this.dialogRoot)
         })
      })
   }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);