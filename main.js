const http = require('http');
const fs = require("fs");
const url = require('url');
const app = http.createServer(function (request, response){
const _url = request.url;
const queryData = url.parse(_url, true).query;
const pathname = url.parse(_url, true).pathname;


    if(pathname === '/'){
        if(queryData.id === undefined){
            
            fs.readFile(`data/${queryData.id}`, `utf-8`, function(err, description){
                const title = 'Welcome';
                var description = 'hello, node JS';
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
        }else{
            fs.readFile(`data/${queryData.id}`, `utf-8`, function(err, description){
                const title = queryData.id;
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
        }
       
    }else{
        response.writeHead(404);
        response.end('not found');
    }

});
app.listen(3000);