import { ImageComponent } from './components/page/item/image.js';
import { PageComponent } from './components/component.js';
var App = /** @class */ (function () {
    function App(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
        this.image = new ImageComponent('title', 'https://picsum.photos/200');
        this.image.attachTo(appRoot);
    }
    return App;
}());
new App(document.querySelector('.document'));
