var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { BaseComponent } from "../../component.js";
var ImageComponent = /** @class */ (function (_super) {
    __extends(ImageComponent, _super);
    // private readonly element:HTMLElement; 
    function ImageComponent(title, url) {
        var _this = _super.call(this, "<section class=\"image\">\n               <div class=\"image__holder\">\n                  <img src=\"\" alt=\"\" class=\"image__thumbnail\">\n               </div>\n               <h2 class=\"page-item__title image__title\"></h2>\n            </section>") || this;
        var imageElement = _this.element.querySelector('.image__thumbnail');
        imageElement.src = url;
        imageElement.alt = title;
        var titleElement = _this.element.querySelector('.image__title');
        titleElement.textContent = title;
        return _this;
    }
    return ImageComponent;
}(BaseComponent));
export { ImageComponent };
