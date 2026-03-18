import express from "express"
const router =express.Router()

router.get('/items',readItem)
router.post('/items',createItem)
router.put('items/:id',editItem)
router.delete('/item/:id',deleteItem)

export default router