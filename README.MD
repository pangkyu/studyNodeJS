# Node JS

목표 : NODE JS를 이용하여 웹과 데이터베이스 연동시키기

- 실행방법
  ![1](https://user-images.githubusercontent.com/75983289/128507345-437471af-c3f6-44d7-a830-4a2ff30b9fbd.PNG)

  Node js를 실행하려는 폴더로 경로를 바꿔주고 실행하고자 하는 파일을 node 뒤에 붙여서 커멘드를 입력

```js
const http = require("http"); // 노드 모듈을 가져온다
const fs = require("fs");
const url = require("url");

const app = http.createServer(function (request, response) {
  const _url = request.url;
  const queryData = url.parse(_url, true).query;
  const title = queryData.id;
  console.log(queryData.id);
  console.log(_url);
  if (_url == "/") {
    title = "Welcome";
  }
  if (_url == "/favicon.ico") {
    response.writeHead(404);
    response.end();
    return;
  }
  response.writeHead(200);

  const template = `
    <!doctype html>
    <html>
    <head>
     <title>WEB1 - ${title}</title>
     <meta charset="utf-8">
    </head>
    <body>
    <h1><a href="/">WEB</a></h1>
    <ul>
        <li><a href="/?id=HTML">HTML</a></li>
        <li><a href="/?id=CSS">CSS</a></li>
        <li><a href="/?id=JavaScript">JavaScript</a></li>
    </ul>
    <h2>${title}</h2>
    <p><a href="https://www.w3.org/TR/html5/" target="_blank" title="html5 speicification">Hypertext Markup Language (HTML)</a> is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
    <img src="coding.jpg" width="100%">
    </p><p style="margin-top:45px;">HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms, may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets.
    </p>
    </body>
    </html>
    `;
  response.end(template);
});
app.listen(3000);
```

- http.createServer() ==> 서버 인스턴스를 만들어 반환
  - const queryData = url.parse(\_url, true).query;
    console.log(queryData.id);
    - 결과 : HTML
  - response 객체의 매소드인 writeHead를 사용하여 타입을 결정
  - end 메소드를 이용하여 html 파일이나 html 소스를 보내 그 폼을 웹에서 출력!
- app.listen(3000); ==> localhost 뒤에붙는 포트번호를 의미. 포트번호와 일치하지 않으면 사이트가 출력되지 않음

---

노드js12~
