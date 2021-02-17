const express = require("express");
const mongodb = require("mongodb");


let palabras = require("./palabras");//poner aquí los require necesarios

const app = express();

app.use(palabras)//poner aquí los apps necesarios. Es igual a app.use("/",palabras)

let MongoClient = mongodb.MongoClient;
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json())

MongoClient.connect('mongodb://127.0.0.1:27017', function (error, client){
    if (error !== null) {
        console.log(error)
    } else {
        app.locals.db = client.db("diccionario")
    }
})

app.listen(3000);