import { PageComponent } from './components/component.js';
var App = /** @class */ (function () {
    function App(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
    }
    return App;
}());
new App(document.querySelector('.document'));
