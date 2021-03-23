import { ImageComponent } from './components/page/item/image.js';
import { PageComponent } from './components/page/page.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
var App = /** @class */ (function () {
    function App(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot, 'afterbegin');
        var image = new ImageComponent('title', 'https://picsum.photos/200');
        this.page.addChild(image);
        var note = new NoteComponent('note-title', 'note-body');
        this.page.addChild(note);
        var todo = new TodoComponent('todo-title', 'todo-body');
        this.page.addChild(todo);
        var video = new VideoComponent('video-title', "https://www.youtu.be/G7UEUf5KAvI");
        this.page.addChild(video);
    }
    return App;
}());
new App(document.querySelector('.document'));
