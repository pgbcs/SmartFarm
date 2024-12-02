const express  =   require('express')
const app     =   express()
const port   = 3000
const route  = require("./router/index.route")
const multer = require('multer');

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

route(app);

app.listen(port,()=>{
    console.log(`App listen on ${port}`);
})