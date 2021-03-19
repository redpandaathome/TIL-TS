import { ImageComponent } from './components/page/item/image.js';
import { PageComponent } from './components/page/page.js';
var App = /** @class */ (function () {
    function App(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot, 'afterbegin');
        this.image = new ImageComponent('title', 'https://picsum.photos/200');
        this.image.attachTo(appRoot, 'beforeend');
    }
    return App;
}());
new App(document.querySelector('.document'));
