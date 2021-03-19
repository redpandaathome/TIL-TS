var BaseComponent = /** @class */ (function () {
    function BaseComponent(htmlString) {
        var template = document.createElement('template');
        template.innerHTML = htmlString;
        this.element = template.content.firstElementChild;
        //🙃 content...왜...필요?
        //const template: HTMLTemplateElement
        /** Enables access to the contents of an HTML <template> element. */
        // interface HTMLTemplateElement extends HTMLElement {
        //    readonly content: DocumentFragment;
    }
    BaseComponent.prototype.attachTo = function (parent, position) {
        if (position === void 0) { position = 'afterbegin'; }
        parent.insertAdjacentElement(position, this.element);
    };
    return BaseComponent;
}());
export { BaseComponent };
