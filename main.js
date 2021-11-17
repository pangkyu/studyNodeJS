const express = require('express');
const template = require('./lib/template');
const fs = require('fs');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const app = express();

app.get('/', (req,res) => 
  fs.readdir('./data', function(error, filelist){
    const title = 'welcome';
    const description = 'hello, nodejs';
    const list = template.list(filelist);
    const html = template.HTML(title, list,
      `<h2>${title}</h2>${description}`,
      `<a href = "/create">create</a>`);
    res.send(html);
  })
);

app.get('/page/:pageId', (req,res) => 
  fs.readdir('./data', function(error, filelist){
    const filteredId = path.parse(req.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
      const title = req.params.pageId;
      const sanitizedTitle = sanitizeHtml(title);
      const sanitizedDescription = sanitizeHtml(description, {
        allowedTags: ['h1']
      });
      const list = template.list(filelist);
      const html = template.HTML(sanitizedTitle, list, 
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        `<a href = "/create">create</a>
         <a href = "/update?id=${sanitizedTitle}">update</a>
         <form action = "delete_process" method = "post">
          <input type = "hidden" name = "id" value = "${sanitizedTitle}">
          <input type = "submit" value = "delete">
         </form>`);
         res.send(html);
    })
  }) 
);

app.listen(3000, () => console.log('example app listening on port 3000!'));


/*var http = require('http');
var url = require('url');
var topic = require('./lib/topic');
var author = require('./lib/author');
 
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        topic.home(request, response);
      } else {
        topic.page(request, response);
      }
    } else if(pathname === '/create'){
      topic.create(request, response);
    } else if(pathname === '/create_process'){
      topic.create_process(request, response);
    } else if(pathname === '/update'){
      topic.update(request, response);
    } else if(pathname === '/update_process'){
      topic.update_process(request, response);
    } else if(pathname === '/delete_process'){
      topic.delete_process(request, response);
    } else if(pathname === '/author'){
      author.home(request, response);
    } else if(pathname === '/author/create_process'){
      author.create_process(request, response);
    } else if(pathname === '/author/update'){
      author.update(request, response);
    } else if(pathname === '/author/update_process'){
      author.update_process(request, response);
    } else if(pathname === '/author/delete_process'){
      author.delete_process(request, response);
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);*/