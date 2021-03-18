var ImageComponent = /** @class */ (function () {
    function ImageComponent(title, url) {
        // ✨
        var template = document.createElement('template');
        template.innerHTML =
            "<section class=\"image\">\n            <div class=\"image__holder\">\n               <img src=\"\" alt=\"\" class=\"image__thumbnail\">\n               <h2 class=\"image__title\"></h2>\n            </div>\n         </section>";
        //querySelector <->firstElementChild ?
        //how to put src into image tag?
        //✨
        this.element = template.content.firstElementChild;
        console.log("firstChild...", this.element);
        var imageElement = this.element.querySelector('.image__thumbnail');
        imageElement.src = url;
        imageElement.alt = title;
        var titleElement = this.element.querySelector('.image__title');
        titleElement.innerHTML = 'title';
    }
    ImageComponent.prototype.attachTo = function (parent, position) {
        if (position === void 0) { position = 'beforeend'; }
        parent.insertAdjacentElement(position, this.element);
    };
    return ImageComponent;
}());
export { ImageComponent };
