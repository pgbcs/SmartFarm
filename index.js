const express  =   require('express')
const app     =   express()
const port   = 3000
const route  = require("./router/index.route")


route(app)

app.listen(port,()=>{
    console.log(`App listen on ${port}`);
})