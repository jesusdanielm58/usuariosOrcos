const express=require("express")
const ejs=require("ejs")
const server=express()
require("dotenv").config()

const usuarios=require("./rutas/usuarios.js")


//databaseconect
const mongoose =require("mongoose")
mongoose.set('useFindAndModify', false);
const uri=  `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.id7tu.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("conexion establecida con base de datos"))
.catch((e)=>console.log(e))

server.set("view engine","ejs")
server.set("views",__dirname+"/views")
server.use(express.static(__dirname+"/public"))
server.use(express.urlencoded({extended:true}))
server.use(usuarios)

server.use((req,res)=>{
    res.render("404",{title:404})
})

server.listen(process.env.PORT||3000,()=>console.log(`escuchando en el puerto ${process.env.PORT}`))


