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

---

synchronous & asynchronous

노드js는 비동기적 방식을 지원하며 싱글 스레드 기반으로 동작하는 서버. 또한 병렬처리를 쓰레드로 처리하지 않으므로 멀티스레드가 갖는 근원적인 문제에서 자유롭다.

- 비동기 방식은 하나의 요청 처리가 완료되기 전에 제어권을 다음 요청으로 넘긴다.
  - 따라서 I/O 처리의 경우 블로킹되지 않으며 다음 요청을 처리할 수 있는 상태가 된다
- 병목현상을 해결하기 위해 사용한다.
- IO 작업이 별로 없는 애플리케이션이나 단위작업이 짧은 메시지 앱의 경우 노드JS는 고성능을 보이나 처리작업이 CPU를 많이 소모하거나 대용량 파일을 처리하는 작업이라면 노드 대신 다른걸로 사용하는 것이 더좋음

```js
console.log("A");
const result = fs.readFileSync("syntax/sample.txt", "utf-8"); // sample.txt에는 'B'가 입력되었음
console.log(result);
console.log("C");
// 결과값 : A
//    B
//   C
```

```js
console.log("A");
fs.readFile("syntax/sample.txt", "utf-8", function (err, result) {
  console.log(result); // 파일을 다 읽으면 실행됨(콜백)
});
console.log("C");
// 결과값 : A
//         C
//          B
```

callback

```js
const a = function () {
  console.log("a");
};
function slowFunc(callback) {
  callback();
}
slowFunc(a); // 결과값 : a
```

---

pm2

- pm2 start 파일이름.js => 앱 실행
- pm2 monit => 현재 pm2에 의해 실행되고 있는 프로그램 확인 (Q누르면 나가짐)
- PM2 list => 현재 실행중인 프로세스 리스트
- pm2 stop main => main을 종료
- pm2 start 파일이름.js --watch => 파일 변경시 자동으로 반영한다.
- pm2 log => 변경사항, 에러발생시 화면에 출력해준다.

---

post방식으로 전송된 데이터 받기

```js
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function(err){
         response.writeHead(302, {Location: `/?id=${qs.escape(title)}`});
        response.end();
       })
```

- 쿼리스트링 : 사용자가 웹으로 데이털르 전달하는 방법.
  - parse() 함수를 이용하면 쿼리스트링을 객체로 변환하여 값을 반환

---

update

```js
   //1)
       fs.readdir('./data', function(error, filelist){
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
          var title = queryData.id;
          var list = templateList(filelist);
          var template = templateHTML(title, list,
             `
             <form action="/update_process" method="post">
             <input type = "hidden" name = "id" value = "${title}">
             <p><input type="text" name="title" placeholder="title" value = "${title}"></p>
             <p>
               <textarea name="description" placeholder="description">${description}</textarea>
             </p>
             <p>
               <input type="submit">
             </p>
             </form>
             `,
             `<a href="/create">create</a> <a href = "/update?id=${title}">update</a>`);
          response.writeHead(200);
          response.end(template);
```

```js
  //2)
else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;
        fs.rename(`data/${id}`, `data/${title}`, function(error){
          fs.writeFile(`data/${title}`, description, 'utf-8', function(error){
            response.writeHead(302, {Location : `/?id = ${title}`});
            response.end();
          });
        });
      });
    }
```

- 1)에서 <input type = "hidden" name = "id" value = "${title}"> 처럼 hidden값을 줘서 본래의 값을 수정하는 일이 없도록 만들어야함
- id => 기존 값 title => 수정한 값 이 들어가게됨.

---

delete 구현

```js
  //<a href = "/delete?id = ${title}">delete</a> 가 안되는 이유
  // 링크를 클릭할 때 주소가 이동하게 됨. 해당 주소로 들어가면 삭제가 이루어진다.
  <form action = "delete_process" method = "post"> // onsubmit = "javascript.js" 를 이용하면 바로 삭제하지않게 처리할 수 있다.
    <input type = "hidden" name = "id" value = "${title}">
    <input type = "submit" value = "delete" >
  </form>
```

```js
     else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        fs.unlink(`data/${id}`, function(error){ // 파일이나 심볼릭링크를 삭제함
          response.writeHead(302, {Location: `/`}); // 302 : 페이지를 이동시키라는 명령어
          response.end();
        });
      });
    }
```

---

모듈

```js
module.exports = {
  // or var template = { code ... }  module.exports = template; 해도 결과 같음
  HTML: function (title, list, body, control) {
    return `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${control}
        ${body}
      </body>
      </html>
      `;
  },
  list: function (filelist) {
    var list = "<ul>";
    var i = 0;
    while (i < filelist.length) {
      list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i = i + 1;
    }
    list = list + "</ul>";
    return list;
  },
};
```

- 그리고 모듈을 사용할 부분에서 require('파일경로'); 로 불러오면 된다.

---

입출력정보에 대한 보안

```js
var filteredId = path.parse(queryData.id).base;
fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
```

```js
 var filteredId = path.parse(id).base;
 fs.unlink(`data/${filteredId}`, function(error){
```

- 웹브라우저에서 경로를 통해 접속하여 개인정보를 열람할 수 있기 때문에 위의 코드처럼 필터링을 씌워주어야하고 추가적으로 보안을 강화시켜야함.

script태그와 같이 브라우저가 해석하여 자동적으로 실행되게 된다면 로그유출 등과 같은 개인정보가 유출될 위험이 있다.

- sanitize 라이브러리를 이용하면 스크립트구문처럼 프로그램에 영향이 갈 수 있는 부분을 없앨 수 있다.

```js
var sanitizeHtml = require("sanitize-html");
var dirty = "some really tacky HTML";
var clean = sanitizeHtml(dirty);
```

```js
clean = sanitizeHtml(dirty, {
  allowedTags: ["b", "i"],
  allowedAttributes: {
    a: ["href"],
  },
  allowedIframeHostnames: ["www.youtube.com"],
});
```

- 위와 같은 코드로 예외 태그를 설정할 수 있다.

---

sql 연결

```js
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "아이디",
  password: "비밀번호",
  database: "실행할 데이터베이스",
});
connection.connect();
connection.query("select * from topic", function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});
connection.end();
```

- mysql로 홈페이지 구현

```js
// main.js
if (queryData.id === undefined) {
  db.query(`select * from topic`, function (error, topics) {
    var title = "Welcome";
    var description = "Hello, Node.js";
    var list = template.list(topics);
    var html = template.HTML(
      title,
      list,
      `<h2>${title}</h2>${description}`,
      `<a href="/create">create</a>`
    );
    response.writeHead(200);
    response.end(html);
  });
} else {
  db.query(`select * from topic`, function (error, topics) {
    if (error) {
      throw error;
    }
    db.query(
      `select * from topic where id = ? `,
      [queryData.id],
      function (error2, topic) {
        if (error2) {
          throw error2;
        }
        var title = topic[0].title;
        var description = topic[0].description;
        var list = template.list(topics);
        var html = template.HTML(
          title,
          list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>
              <a href="/update?id=${queryData.id}">update</a>
              <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${queryData.id}">
                <input type="submit" value="delete">
              </form>`
        );
        response.writeHead(200);
        response.end(html);
      }
    );
  });
}
```

```js
 // template.js
,list:function(topics){
      var list = '<ul>';
      var i = 0;
      while(i < topics.length){
        list = list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
        i = i + 1;
      }
      list = list+'</ul>';
      return list;
```

- topic 테이블의 길이만큼의 id와 title정보를 받아와서 href 값에 적용시켜준다.

---

mysql로 글생성 기능 구현

```js
  else if(pathname === '/create_process'){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        db.query(`
          INSERT INTO topic (title, description, created, author_id)
            VALUES(?, ?, NOW(), ?)`,
          [post.title, post.description, post.author],
          function(error, result){
            if(error){
              throw error;
            }
            response.writeHead(302, {Location: `/?id=${result.insertId}`});
            response.end();
          }
        )
    });
```

- now()는 mysql 내장함수.
- 글 수정할 때 selected 넣는 방법

```js
  `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${topic[0].id}">
              <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
              <p>
                <textarea name="description" placeholder="description">${topic[0].description}</textarea>
              </p>
              <p>
                ${template.authorSelect(authors, topic[0].author_id)}
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `,
```

```js
authorSelect:function(authors, author_id){
    var tag = '';
    var i = 0;
    while(i < authors.length){
      var selected = '';
      if(authors[i].id === author_id){
        selected = ' selected'; // selected 문자열을 밑에 붙여넣음
      }
      tag += `<option value="${authors[i].id}"${selected}>${authors[i].name}</option>`;
      i++;
    }
    return `
      <select name="author">
        ${tag}
      </select>
```
