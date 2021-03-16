import { BaseComponent } from "../../component.js";

export class VideoComponent extends BaseComponent<HTMLElement>{
   constructor(title:string, url:string){
      super(
         `<section class="video">
            <div class="video__player">
               <iframe class="video__iframe"></iframe>
            </div>
            <h3 class="video__title"></h3>
         </section>`
      )
      const iframe = this.element.querySelector('.video__iframe')! as HTMLIFrameElement;
      
      iframe.src= this.convertToEmbeddedURL(url); //url->videoId->embed
         
      const titleElement = this.element.querySelector('.video__title')! as HTMLHeadingElement;
      titleElement.textContent = title;
   }

   //Input
   //"https://www.youtube.com/embed/qhyUrb9LHpY"
   //"https://www.youtube.com/watch?v=hBnVhs3NmV8"
   //"https://www.youtube.com/embed/qhyUrb9LHpY"

   //Output
   //"https://www.youtube.com/embed/qhyUrb9LHpY"
   // 기존코드
   // private convertToEmbeddedURL(url:string):string {
   //    const youTubeUrl = 'https://www.youtube.com/embed/';
   //    if(url.includes('/youtu.be/')){
   //       url = url.substring(url.lastIndexOf("/youtu.be/") + "/youtu.be/".length);
   //    } else if(url.includes('?v=')){
   //       url = url.substring(url.lastIndexOf("?v=") + "?v=".length);
   //    }
   //    return youTubeUrl+url;
   // }
   // 정규표현식 Regex
   private convertToEmbeddedURL(url:string):string {
      const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/
      const match = url.match(regExp);

      const videoId = match ? match[1] || match[2] : undefined;
      if(videoId) {
         return `https://www.youtube.com/embed/${videoId}`;
      }
      return url;
   }
}

// <iframe 
//    width="893" 
//    height="502" 
//    src="https://www.youtube.com/embed/qhyUrb9LHpY" 
//    frameborder="0" 
//    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
//    allowfullscreen>
// </iframe>
