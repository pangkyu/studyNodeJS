# Node JS

목표 : NODE JS를 이용하여 웹과 데이터베이스 연동시키기

- 실행방법
  ![1](https://user-images.githubusercontent.com/75983289/128507345-437471af-c3f6-44d7-a830-4a2ff30b9fbd.PNG)

  Node js를 실행하려는 폴더로 경로를 바꿔주고 실행하고자 하는 파일을 node 뒤에 붙여서 커멘드를 입력

```js
const http = require("http");
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
  response.end(template);
});
app.listen(3000);
```

- app.listen(3000); ==> localhost 뒤에붙는 포트번호를 의미. 포트번호와 일치하지 않으면 사이트가 출력되지 않음
