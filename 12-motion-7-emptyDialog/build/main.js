"use strict";
console.log("main.ts...");
function openImageForm() {
    console.log("click...image");
    var form = document.getElementById('form-content');
    if (form) {
        form.style.display = "block";
    }
}
function submitImage() {
    console.log("click... submitImage()");
    var title = document.querySelector("title");
    var url = document.querySelector("url");
    console.log("title: " + title + " url: " + url);
}
