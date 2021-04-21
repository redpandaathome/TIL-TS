import { BaseComponent } from "../../component.js";

export class VideoComponent extends BaseComponent<HTMLElement>{
   // private readonly element:HTMLElement; 
   constructor(title:string, url:string){
      super(`<section class="video">
               <div class="video__player">
                  <iframe src="" frameborder="0" class="video__iframe"></iframe>
               </div>
               <h3 class="page-item__title video__title"></h3>
            </section>`)

      const imageElement = this.element.querySelector('.video__iframe')! as HTMLIFrameElement;
      imageElement.src=this.convertToEmbededURL(url);

      const titleElement = this.element.querySelector('.video__title')! as HTMLHeadingElement;
      titleElement.textContent= title; //☃︎
   }
   convertToEmbededURL(url:string):string {
      const regExp = new RegExp(/^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/)
      const match = url.match(regExp);
      const videoId = match ? match[1] || match[2] : undefined;
      console.log('videoId:', videoId)
      if (videoId){
         return `https://youtube.com/embed/${videoId}`;
      }
      return url
   }
}

