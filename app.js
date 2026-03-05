
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
const app=express()
app.use(cors())
app.use(express.json())
mongoose.connect(process.env.MONGO_URI)
const itemSchema=new mongoose.Schema({name:String})
const Item=mongoose.model("Item",itemSchema)
app.get('/items', async (req,res)=>{
    const items=await Item.find()
    res.json(items)
})
app.post('/items', async (req,res)=>{
   console.log(req.body)
   const {name}=req.body
  
  const newItem = await Item.create({name})
   res.json(newItem)
})
app.put('/items/:id', async (req,res)=>{
    const id = req.params.id
    const {name}=req.body
    const updatedItem=await Item.findByIdAndUpdate(id,{name},{new:true})
    if(!updatedItem){
        return res.status(404).json({message :"Item not found "})
    }
    res.json(updatedItem)
})
app.delete('/items/:id',async (req,res)=>{
    const id =req.params.id
   const deletedItem =await Item.findByIdAndDelete(id)
   if(!deletedItem){
    return res.status(404).json({message:"item not found"})
   }
    res.json({message:"item deleted successfully "})
   
})

const PORT = process.env.PORT || 5001;
app.listen(PORT,()=>{
     console.log("Server running on port", PORT)
})