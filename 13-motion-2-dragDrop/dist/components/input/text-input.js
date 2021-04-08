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
import { BaseComponent } from "../component.js";
var TextSectionInput = /** @class */ (function (_super) {
    __extends(TextSectionInput, _super);
    function TextSectionInput() {
        return _super.call(this, "<div>\n               <div class=\"form__container\">\n                  <label for=\"title\">Title</label>\n                  <input type=\"text\" id=\"title\">\n               </div>\n               <div class=\"form__container\">\n                  <label for=\"body\">Body</label>\n                  <textarea type=\"text\" row=\"3\" id=\"body\"></textarea>\n               </div>\n            </div>") || this;
    }
    Object.defineProperty(TextSectionInput.prototype, "title", {
        get: function () {
            var title = document.querySelector('#title');
            return title.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextSectionInput.prototype, "body", {
        get: function () {
            var body = document.querySelector('#body');
            return body.value;
        },
        enumerable: false,
        configurable: true
    });
    return TextSectionInput;
}(BaseComponent));
export { TextSectionInput };
