const express = require('express');
const { Inventory, Book, Store } = require('../db/models');
const { isAuthenticated } = require('./user')
const router = express.Router();


router.post('', isAuthenticated, async (req, res) => {
    const { name, storeId } = req.body

    let error = {}
    if (!name) error.name = "inventory name can't be empty"
    if (!storeId) error.storeId = "store id must be provded"

    const store = await Store.findByPk(storeId)
    if (!store) error.invalid = "invalid store id"
    if (store.userId != req.user.id) error.invalidUser = "You are not a valid user to perform this task"
    
    if (error.length > 0) return res.json(error)

    const inventory = await Inventory.create({ name, storeId, userId: req.user.id })

    res.json(inventory)
})

router.get('/:inventoryId', isAuthenticated, async (req, res) => {
    const books = await Inventory.findOne({
        where: {
            id: req.params.inventoryId
        },
        include: Book
    })

    if (!books) return res.status(404).json({ error: "Inventory not found" })

    res.json({books, count: books.Books.length})
})

router.delete('/:inventoryId', isAuthenticated, async (req, res) => {

    const inventory = await Inventory.findByPk(req.params.inventoryId)

    if (!inventory) return res.status(404).json({ error: "Inventory not found" })
    if (inventory.userId != req.user.id) return res.status(400).json({error: "You are not a valid user to perform this task"})

    res.json(await inventory.destroy())

})


module.exports = router
