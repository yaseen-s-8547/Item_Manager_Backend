import Item from "../Models/item"

export const readItem=async (req,res)=>{
    const items=await Item.find()
    res.json(items)
}