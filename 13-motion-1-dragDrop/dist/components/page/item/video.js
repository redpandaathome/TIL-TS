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
import { BaseComponent } from "../../component.js";
var VideoComponent = /** @class */ (function (_super) {
    __extends(VideoComponent, _super);
    // private readonly element:HTMLElement; 
    function VideoComponent(title, url) {
        var _this = _super.call(this, "<section class=\"video\">\n               <div class=\"video__player\">\n                  <iframe src=\"\" frameborder=\"0\" class=\"video__iframe\"></iframe>\n               </div>\n               <h3 class=\"page-item__title video__title\"></h3>\n            </section>") || this;
        var imageElement = _this.element.querySelector('.video__iframe');
        imageElement.src = _this.convertToEmbededURL(url);
        var titleElement = _this.element.querySelector('.video__title');
        titleElement.textContent = title; //☃︎
        return _this;
    }
    VideoComponent.prototype.convertToEmbededURL = function (url) {
        var regExp = new RegExp(/^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/);
        var match = url.match(regExp);
        var videoId = match ? match[1] || match[2] : undefined;
        console.log('videoId:', videoId);
        if (videoId) {
            return "https://youtube.com/embed/" + videoId;
        }
        return url;
    };
    return VideoComponent;
}(BaseComponent));
export { VideoComponent };
