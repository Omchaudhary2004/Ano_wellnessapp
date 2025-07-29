const http = require("http");


port = 3000;


const myserver = http.createServer((req , res) =>{
    console.log("helooooo guys");

});

myserver.listen(port, (req , res) =>{
    console.log("helooooo guys");

});
