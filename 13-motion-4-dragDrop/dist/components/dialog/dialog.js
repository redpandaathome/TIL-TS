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
var InputDialog = /** @class */ (function (_super) {
    __extends(InputDialog, _super);
    function InputDialog() {
        var _this = _super.call(this, "<dialog class=\"dialog\">\n               <div class=\"dialog__container\">\n                  <button class=\"close\">X</button>\n                  <div id=\"dialog__body\"></div>\n                  <button class=\"dialog_submit\">ADD</button>\n               </div>\n            </dialog>") || this;
        var closeBtn = _this.element.querySelector('.close');
        closeBtn.onclick = function () {
            _this.closeListener && _this.closeListener();
        };
        var submitBtn = _this.element.querySelector('.dialog_submit');
        submitBtn.onclick = function () {
            _this.submitListener && _this.submitListener();
        };
        return _this;
    }
    InputDialog.prototype.setOnCloseListener = function (listener) {
        this.closeListener = listener;
    };
    InputDialog.prototype.setOnSubmitListener = function (listener) {
        this.submitListener = listener;
    };
    InputDialog.prototype.addChild = function (child) {
        var body = this.element.querySelector("#dialog__body");
        child.attachTo(body);
    };
    return InputDialog;
}(BaseComponent));
export { InputDialog };
