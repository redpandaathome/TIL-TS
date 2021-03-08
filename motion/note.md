DOM

HTML Tag -> (브라우저가 이해할 수 있는) js object로 변환 후 메모리에 보관하여 이해
* 변환된 각각의 태그를 노드라 말 할 수 있다.
EventTarget <-상속- Node <- 
Document, 
Element(<-HTMLElement<-HTMLInputElement, HTMLDivElement...), 
Text ...

따라서 html 모든 태그는 html element를 상속하고, 결국은 element라고 말할 수 있다.

즉 html 파일을 브라우저로 읽을시
DOM tree로 변환되어 읽힘 (모두 HTML something...으로 변환됨)