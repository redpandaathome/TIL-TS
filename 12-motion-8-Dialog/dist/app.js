import { ImageComponent } from './components/page/item/image.js';
import { PageComponent, PageItemComponent } from './components/page/page.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
import { InputDialog } from './components/dialog/dialog.js';
var App = /** @class */ (function () {
    function App(appRoot) {
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot, 'afterbegin');
        var image = new ImageComponent('title', 'https://picsum.photos/200');
        this.page.addChild(image);
        var note = new NoteComponent('note-title', 'note-body');
        this.page.addChild(note);
        var todo = new TodoComponent('todo-title', 'todo-body');
        this.page.addChild(todo);
        var video = new VideoComponent('video-title', "https://www.youtu.be/G7UEUf5KAvI");
        this.page.addChild(video);
        var imageBtn = document.querySelector("#new-image");
        imageBtn.addEventListener("click", function () {
            var dialog = new InputDialog();
            // const dialogBody = document.querySelector('#dialog__body')! as HTMLElement;
            dialog.setOnCloseListener(function () {
                dialog.removeFrom(document.body);
            });
            dialog.setOnSubmitListener(function () {
                dialog.removeFrom(document.body);
            });
            dialog.attachTo(document.body);
        });
    }
    return App;
}());
new App(document.querySelector('.document'));
