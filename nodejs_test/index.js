//Core nodejs module. Does not need to be installed
const http = require(`http`);

//Default way to import modules
const testFunctions = require("./test.js");
//Importing modules using object destructuring
const { add, multiply } = require("./test2.js");


//Sends a string to the browser calling port 3000
const server = http.createServer((req, res)=>{
    res.end("Hello from Node server!")
})
//Sets port on localhost
const port = "3000";
//Triggers when server starts to listen for port 3000 calls
server.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});




console.log(testFunctions.add(1,2));
console.log(add(3,4));
console.log(multiply(3,4));
//console.log(`PROCESS:`, process);

