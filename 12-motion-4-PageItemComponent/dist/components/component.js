var BaseComponent = /** @class */ (function () {
    function BaseComponent(htmlString) {
        var template = document.createElement('template');
        template.innerHTML = htmlString;
        this.element = template.content.firstElementChild;
    }
    BaseComponent.prototype.attachTo = function (parent, position) {
        if (position === void 0) { position = 'afterbegin'; }
        parent.insertAdjacentElement(position, this.element);
    };
    return BaseComponent;
}());
export { BaseComponent };
