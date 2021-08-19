const express=require("express")
const person=require("../models/person.js")
const router=express.Router()
const mongoose =require("mongoose")

router.get("/",async (req,res)=>{
    try{
        let users= await person.find()
        res.render("index",{mensaje:"datos de la base de datos",title:"index",users:users})
    }
    catch(err){
        console.log(err)
    }
})

router.get("/agregar",(req,res)=>{
    res.render("agregar")
})
// router.get("/editar/",(req,res)=>{
//      let user={name:"jesus",password:"marcano"}
//     console.log("pasa editar")
//     res.render("editar",{user})
// })
router.get("/editar/:id", (req,res)=>{
        const id=req.params.id
        console.log("url",req.url,"parasms")
        console.log(id,"pasa id")
        person.findOne({ _id: id })
        .then((user)=>{
            if (user){
                console.log("pasa if")
                res.render("editar",{user})
            }else{
                res.redirect("/")
            }
        })
        .catch(err=>{
            console.log("pasa este catch",err)
            res.redirect("/")
        })
})
router.post("/editar/:id", (req,res)=>{
    let user= req.body
    let id=req.params.id
    let _id = mongoose.mongo.ObjectId(user.id);
    person.findByIdAndUpdate(id,user)
    .then((result)=>{
        res.redirect("/")

    })
    .catch((err)=>{console.log(err)})

})
router.post("/agregar",(req,res)=>{
    let user= new person(req.body)
    user.save()
    .then((result)=>res.redirect("/"))
    .catch((err)=>{console.log(err)})
})
router.delete("/borrar/:id",(req,res)=>{
    const id=req.params.id
    person.findByIdAndDelete(id)
    .then(()=>res.json({redirect:"/"}))
    .catch((err)=>console.log(err))

})

module.exports=router