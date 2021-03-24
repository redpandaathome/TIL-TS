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
import { BaseComponent } from '../component.js';
var PageComponent = /** @class */ (function (_super) {
    __extends(PageComponent, _super);
    // private readonly page:HTMLUListElement;
    function PageComponent() {
        return _super.call(this, "<ul class=\"page\"></ul>") || this;
    }
    PageComponent.prototype.addChild = function (section) {
        var _this = this;
        var item = new PageItemComponent();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnClickListener(function () {
            item.removeFrom(_this.element);
        });
    };
    return PageComponent;
}(BaseComponent));
export { PageComponent };
//PageItemComponent를 만들어서...pageItem을 만든후 그 안에 섹션 넣고 얘를 document에 붙이기
var PageItemComponent = /** @class */ (function (_super) {
    __extends(PageItemComponent, _super);
    function PageItemComponent() {
        var _this = _super.call(this, "<li class=\"page-item\">\n               <section class=\"page-item__body\"></section>\n               <div class=\"page-item__controls\">\n                  <button class=\"close\">x</button>\n               </div>\n            </li>") || this;
        var closeBtn = _this.element.querySelector(".close");
        closeBtn.onclick = function () {
            _this.closeListener && _this.closeListener();
        };
        return _this;
    }
    PageItemComponent.prototype.addChild = function (child) {
        var container = this.element.querySelector(".page-item__body");
        child.attachTo(container, "afterbegin");
    };
    PageItemComponent.prototype.setOnClickListener = function (listener) {
        this.closeListener = listener;
    };
    return PageItemComponent;
}(BaseComponent));
export { PageItemComponent };
