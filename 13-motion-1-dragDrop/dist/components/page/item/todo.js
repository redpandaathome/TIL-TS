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
var TodoComponent = /** @class */ (function (_super) {
    __extends(TodoComponent, _super);
    // private readonly element:HTMLElement; 
    function TodoComponent(title, body) {
        var _this = _super.call(this, "<section class=\"todo\">\n               <h2 class=\"page-item__title todo__title\"></h2>\n               <input type=\"checkbox\" id=\"todo-checkbox\">\n               <label for=\"todo-checkbox\" class=\"todo-label\"></label>\n            </section>") || this;
        var titleElement = _this.element.querySelector('.todo__title');
        titleElement.textContent = title;
        var bodyElement = _this.element.querySelector('.todo-label');
        bodyElement.textContent = body;
        return _this;
        // bodyElement.textContent= body; // ???? 확인할 것! textContent... insertAdjacentText... innerText innerHTML...ah...
        // bodyElement.insertAdjacentText('afterbegin', body)
    }
    return TodoComponent;
}(BaseComponent));
export { TodoComponent };
