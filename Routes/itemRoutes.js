import express from "express"
import { readItem } from "../Controllers/itemControllers"
const router =express.Router()

router.get('/items',readItem)
router.post('/items',createItem)
router.put('items/:id',editItem)
router.delete('/item/:id',deleteItem)

export default router