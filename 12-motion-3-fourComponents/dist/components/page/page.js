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
        return _super.call(this, "<ul class=\"page\">\n               This is pageComponent\n            </ul>") || this;
    }
    return PageComponent;
}(BaseComponent));
export { PageComponent };
