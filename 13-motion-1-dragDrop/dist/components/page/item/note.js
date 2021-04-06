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
var NoteComponent = /** @class */ (function (_super) {
    __extends(NoteComponent, _super);
    // private readonly element:HTMLElement; 
    function NoteComponent(title, body) {
        var _this = _super.call(this, "<section class=\"note\">\n               <h2 class=\"page-item__title note__title\"></h2>\n               <p class=\"note__body\"></p>\n            </section>") || this;
        var titleElement = _this.element.querySelector('.note__title');
        titleElement.textContent = title;
        var bodyElement = _this.element.querySelector('.note__body');
        bodyElement.textContent = body; //☃︎
        return _this;
    }
    return NoteComponent;
}(BaseComponent));
export { NoteComponent };
