// const http=require('http');
// const fs =require('fs');
// const path = require('path');
// const { url } = require('inspector');
// const server=http.createServer((req,res)=>{
//     console.log("SUCCUCEFULLY SEND REQUEST");
//     const url="./public.html"
//     const fileUrl=path.join(url)
   
//     if(req.url=="/" && req.method==="GET"){
//         const file=fs.readFileSync('./index.html',{
//             encoding:'utf-8'
//         });
//         res.setHeader('Content-Type', 'text/html');
//         res.write('<ul>');
//         res.write(`<li><a href="${fileUrl}">${file}</a></li>`);
//         res.end('</ul>');
//     }
//     else if(req.url=="/public.html" && req.method==="GET"){
//         const file1=fs.readFileSync('./public.html',{
//             encoding:'utf-8'
//         });
//         res.write(file1);
//         res.end();
//     }
//     else if(req.url=="/public/other.html" && req.method==="GET"){
//         const file11=fs.readFileSync('./public/other.html',{
//             encoding:'utf-8'
//         });
//         res.write(file11);
//         res.end();
//     }
// })
// server.listen(3000);
// console.log("server is running on port http://localhost:3000/:")


const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const url = req.url === '/' ? '/.' : req.url;
  const filePath = path.join(__dirname, url);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.statusCode = 404;
      res.end(`File or directory not found: ${url}`);
      return;
    }

    if (stats.isDirectory()) {
      fs.readdir(filePath, (err, files) => {
        if (err) {
          res.statusCode = 500;
          res.end('Internal server error');
          return;
        }

        res.setHeader('Content-Type', 'text/html');
        res.write('<ul>');
        files.forEach(file => {
          const fileUrl = path.join(url, file);
          res.write(`<li><a href="${fileUrl}">${file}</a></li>`);
        });
        res.end('</ul>');
      });
    } else {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end('Internal server error');
          return;
        }  
        res.setHeader('Content-Type', 'text/plain');
        res.end(data);
      });
    }
  });
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
