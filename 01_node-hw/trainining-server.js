const server = http.createServer((request, response) => {

    // console.log('request.method', request.method)
    // console.log('request.url', request.url)
    // console.log('request.headers', request.headers)


    response.statusCode = 200;
    response.setHeader("Hello", "Hello world");
    response.end("end of request");
})


server.listen(3000, () => {

    console.log("starting listening");

    // console.log("ending listening");

})

console.log(getContactById());

// const express = require("express")


// const server = express()

// server.get("/users", (request, response, next) => {
//     response.send({hello: "world"})

// })


// server.listen(3000, () => {


//     console.log("server start");
// })