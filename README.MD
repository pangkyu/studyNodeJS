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

파일읽기

- fs.readFile 함수를 이용한다.

```js
fs.readFile(`data/${queryData.id}`, `utf-8`, function (err, description) {
  const template = `
       <!doctype html>
       <html>
       <head>
        <title>WEB1 - ${title} </title>
        <meta charset="utf-8">
       </head>
       <body>
       <h1><a href="/">WEB</a></h1>
       <ul>
           <li><a href="/?id=HTML">HTML</a></li>
           <li><a href="/?id=CSS">CSS</a></li>
           <li><a href="/?id=JavaScript">JavaScript</a></li>
       </ul>
       <h2> ${title} </h2>
       <p>${description}</p>
       </body>
       </html>
       `;

  response.end(template);
});
```

- err은 익명함수로, 오류발생시 동작한다. description에 읽은 파일 데이터를 담아준다.
- 클릭(HTML,CSS,JavaScript)을 통해 인자 값을 바꿔주면 해당 파일 데이터가 p태그안에 출력됨

---

```js
if(queryData.id === undefined){

            fs.readFile(`data/${queryData.id}`, `utf-8`, function(err, description){
                const title = 'Welcome';
                var description = 'hello, node JS'; // 이거 var로 한 이유는 hoisting을 위해서.. 원래 var쓰면 안되는데 계속 오류나서 어쩔 수 없이 var..
                const template = `
                <!doctype html>
                <html>
                <head>
                 <title>WEB1 - ${title} </title>
                 <meta charset="utf-8">
                </head>
                <body>
                <h1><a href="/">WEB</a></h1>
                <ul>
                    <li><a href="/?id=HTML">HTML</a></li>
                    <li><a href="/?id=CSS">CSS</a></li>
                    <li><a href="/?id=JavaScript">JavaScript</a></li>
                </ul>
                <h2> ${title} </h2>
                <p>${description}</p>
                </body>
                </html>
                `;
                response.writeHead(200);
                response.end(template);
             });
```

- 호이스팅(hoisting)

  - 함수 안에 있는 선언들을 모두 끌어올려서 해당 함수 유효 범위의 최상단에 선언하는 것
    - 자바스크립트 Parser가 함수 실행 전 해당 함수를 한번 훑음
    - 함수 안에 존재하는 변수/함수 선언에 대한 정보를 기억하고 있다가 실행
    - 유효 범위 : 함수블록 {} 안에서 유효
  - 함수 내에서 아래쪽에 존재하는 내용 중 필요한 값들을 끌어올리는 것.

    - 실제 메모리에서는 변화 없다.

  - 호이스팅 대상 : var 변수 선언과 함수선언문에서만 호이스팅이 일어남.

    - let, const와 함수 표현식에서는 호이스팅 발생하지 않음
      - 호이스팅은 함수선언문과 함수 표현식에서 서로 다르게 동작하기 때문에 주의할 것.
    - var 변수/함수의 선언만 끌어 올려지며, 할당은 끌어올려지지않음

  - 함수 선언문에서의 호이스팅
    - 코드를 구현한 위치와 관계없이 브라우저가 자바스크립트를 해석할 때 맨 위로 끌어올려짐
  - 함수 표현식에서의 호이스팅
    - 함수선운문과 달리 선언과 호출 순서에 따라서 정상적으로 함수가 실행되지 않을 수 있음.
      - 함수표현식에서는 선언과 할당의 분리가 발생하기 때문.
      - 함수표현식의 선언이 호출보다 아래에 있는경우 TypeError 발생

  ```js
  // 오류
  function printName(firstName) {
    // 함수 선언문
    console.log(inner); // > "undefind" => 선언은 되어 있지만 값이 할당되지 않았다.
    var result = inner(); // error
    console.log("name is " + result);

    var inner = function () {
      // 함수 표현식
      return "inner value";
    };
  }
  printName(); // > TypeError : inner is not a function
  ```

  ```js
  // js parser 내부의 호이스팅 결과
  //오류
  function printName(firstName) {
    var inner; // 호이스팅 함수표현식의 변수값 선언
    console.log(inner); // > "undefined"
    var result = inner(); // error
    console.log("name is " + result);
    inner = function () {
      return "inner value";
    };
  }
  printName(); // > TypeError : inner is not a function
  ```

  - inner is not defined 오류 대신 inner is not a function 오류가 나온이유
    - printName()이 실행되는 순간 호이스팅에 의해 inner는 undefined로 지정되기 때문이다.
    - inner가 undefined라는 것은 아직 함수로 인식되지 않는다는 것을 의미.

  ```js
  // 오류
  function printName(firstName) {
    // 함수선언문
    console.log(inner); // error  => inner에 대한 선언이 되어있지 않음
    let result = inner();
    console.log("name is" + result);
    let inner = function () {
      // 함수 표현식
      return "inner value";
    };
  }
  printName(); // > ReferenceError : inner is not defined
  ```

  - let, const => 호이스팅 일어나지않음

- 코드의 가독성과 유지보수를 위해 호이스팅이 일어나지 않도록 유의. (let/const 사용 권장)

---

파일목록 알아내기

```js
const testFolder = "./data";
const fs = require("fs");

fs.readdir(testFolder, function (err, filelist) {
  console.log(filelist); // 실행결과 : ['CSS', 'HTML', 'JavaScript'] => data폴더안에 있는 파일 목록들을 배열형태로 출력한다.
});
```

21~
