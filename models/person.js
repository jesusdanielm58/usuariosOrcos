const mongoose=require("mongoose")

let Schema =mongoose.Schema

let personSchema= new Schema({
    name:String,
    password:String
})

let person=mongoose.model("Practicacrud",personSchema)


module.exports=person