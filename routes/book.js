const express = require('express');
const { Inventory, Book } = require('../db/models');
const { isAuthenticated } = require('./user')
const router = express.Router();

router.get('/:id', isAuthenticated, async (req, res) => {
    const book = await Book.findByPk(req.params.id)
    if (!book) return res.status(404).json({ error: "Book not found" })
    res.json(book)

})

router.post('', isAuthenticated, async (req, res) => {
    const { title, description, price, inventoryId } = req.body

    let error = {}
    if (!inventoryId) error.inventoryId = "inventory id can't be empty"
    if (!title) error.title = "title must be provded"
    if (!description) error.description = "description must be provided"
    if (!price) error.price = "price must be provided"

    const inventory = await Inventory.findByPk(inventoryId)
    if (inventory) error.invalid = "invalid Inventory id"
    if (inventory.userId != req.user.id) error.invalidUser = "You are not a valid user to do this task"

    if (error.length > 0) return res.json(error)


    const book = await Book.create({
        title, description, inventoryId, price, userId: req.user.id
    })

    res.json(book)
})

router.delete('/:id', isAuthenticated, async (req, res) => {

    const book = await Book.findByPk(req.params.id)
    if (!book) return res.status(404).json({ error: "Book doesn't found" })
    if (book.userId != req.user.id) res.status(400).json({error: "You are not a valid user to perform this task"})
    res.json(await book.destroy())

})


module.exports = router
