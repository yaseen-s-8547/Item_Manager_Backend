require ("dotenv").config()
const express=require("express")
const cors=(require("cors"))
const app=express()
app.use(cors())
app.use(express.json())

let items=[]
app.get('/items',(req,res)=>{
    res.json(items)
})
app.post('/items',(req,res)=>{
   console.log(req.body)
   const {name}=req.body
  const newItem={id:Date.now(),name}
   items.push(newItem)
   res.json(newItem)
})
app.put('/items/:id',(req,res)=>{
    const id = Number(req.params.id)
    const {name}=req.body
    const existingItem=items.find(item=>item.id===id)
    if(!existingItem){
        return res.status(404).json({message :"Item not found "})
    }
    items=items.map(item=>item.id===id?{...item,name}:item)
    res.json({...existingItem,name})
})
app.delete('/items/:id',(req,res)=>{
    const id =Number(req.params.id)
    const originallength=items.length
    items=items.filter(item=>item.id!==id)
    if(items.length===originallength){
        return res.status(404).json({message:"item not found" })
    }
    res.json({message:"item deleted successfully "})
   
})


app.listen(process.env.PORT,()=>{
     console.log("Server running on port", process.env.PORT)
})