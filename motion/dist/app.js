import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { PageComponent } from "./components/page/page.js";
class App {
    constructor(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
        const image = new ImageComponent('https://picsum.photos/600/300', 'title🌼');
        image.attachTo(appRoot, 'beforeend');
        const note = new NoteComponent('note title', 'note body');
        note.attachTo(appRoot, 'beforeend');
        const todo = new TodoComponent('todo title', 'todo body');
        todo.attachTo(appRoot, 'beforeend');
        const video = new VideoComponent('video title', "https://youtu.be/hBnVhs3NmV8");
        video.attachTo(appRoot, 'beforeend');
    }
}
new App(document.querySelector('.document'));
