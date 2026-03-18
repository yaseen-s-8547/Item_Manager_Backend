
import express from "express"
import router from "./Routes/itemRoutes"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./Config.js/db"
dotenv.config()
const app=express()
app.use(cors())
app.use(express.json())
 connectDB()
 app.use("/",router)

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