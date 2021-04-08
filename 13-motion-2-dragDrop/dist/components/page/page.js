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
    function PageComponent(pageItemConstructor) {
        var _this = _super.call(this, "<ul class=\"page\"></ul>") || this;
        _this.pageItemConstructor = pageItemConstructor;
        _this.element.addEventListener('dragover', function (event) {
            _this.onDragOver(event);
        });
        _this.element.addEventListener('drop', function (event) {
            _this.onDrop(event);
        });
        return _this;
    }
    PageComponent.prototype.onDragOver = function (event) {
        event.preventDefault();
        console.log('dragover...');
    };
    PageComponent.prototype.onDrop = function (event) {
        event.preventDefault();
        console.log('dragdrop...');
    };
    PageComponent.prototype.addChild = function (section) {
        var _this = this;
        var item = new this.pageItemConstructor();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnClickListener(function () {
            item.removeFrom(_this.element);
        });
        //🌺 4.
        item.setOnDragStateListener(function (target, state) {
            console.log(target, state);
        });
    };
    return PageComponent;
}(BaseComponent));
export { PageComponent };
var PageItemComponent = /** @class */ (function (_super) {
    __extends(PageItemComponent, _super);
    function PageItemComponent() {
        var _this = _super.call(this, "<li draggable=true class=\"page-item\">\n               <section class=\"page-item__body\"></section>\n               <div class=\"page-item__controls\">\n                  <button class=\"close\">x</button>\n               </div>\n            </li>") || this;
        var closeBtn = _this.element.querySelector(".close");
        closeBtn.onclick = function () {
            _this.closeListener && _this.closeListener();
        };
        _this.element.addEventListener('dragstart', function (event) {
            _this.onDragStart(event);
        });
        _this.element.addEventListener('dragend', function (event) {
            _this.onDragEnd(event);
        });
        //🌺2.
        _this.element.addEventListener('dragenter', function (event) {
            _this.onDragEnter(event);
        });
        _this.element.addEventListener('dragleave', function (event) {
            _this.onDragLeave(event);
        });
        return _this;
    }
    PageItemComponent.prototype.onDragStart = function (event) {
        this.notifyDragObservers('start');
    };
    PageItemComponent.prototype.onDragEnd = function (event) {
        this.notifyDragObservers('end');
    };
    PageItemComponent.prototype.onDragEnter = function (event) {
        this.notifyDragObservers('enter');
    };
    PageItemComponent.prototype.onDragLeave = function (event) {
        this.notifyDragObservers('leave');
    };
    PageItemComponent.prototype.notifyDragObservers = function (state) {
        //🌺
        this.dragStateListener && this.dragStateListener(this, state);
    };
    PageItemComponent.prototype.addChild = function (child) {
        var container = this.element.querySelector(".page-item__body");
        child.attachTo(container, "afterbegin");
    };
    PageItemComponent.prototype.setOnClickListener = function (listener) {
        this.closeListener = listener;
    };
    // 🌺 1.진입 포인트. pageItem이 움직일때 캐치할 listener 필요(dagging, over)
    PageItemComponent.prototype.setOnDragStateListener = function (listener) {
        this.dragStateListener = listener;
    };
    return PageItemComponent;
}(BaseComponent));
export { PageItemComponent };
