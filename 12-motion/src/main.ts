console.log("main.ts...")

function openImageForm() {
   console.log(`click...image`)
   let form = document.getElementById('form-content');
   if(form) {
      form.style.display="block"
   }
}

function submitImage(event:Event) {
   event.preventDefault();
   console.log("click... submitImage()")
   let title = document.querySelector("title")
   let url = document.querySelector("url")
   console.log(`title: ${title} url: ${url}`)
}