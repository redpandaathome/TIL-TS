var PageComponent = /** @class */ (function () {
    function PageComponent() {
        this.page = document.createElement('ul');
        this.page.setAttribute('class', 'page');
        this.page.textContent = 'This is pageComponent';
    }
    PageComponent.prototype.attachTo = function (parent, position) {
        if (position === void 0) { position = 'afterbegin'; }
        parent.insertAdjacentElement(position, this.page);
    };
    return PageComponent;
}());
export { PageComponent };
