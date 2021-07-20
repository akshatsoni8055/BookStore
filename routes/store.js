const express = require('express');
const { Store, Inventory, Book } = require('../db/models');
const { isAuthenticated } = require('./user')
const router = express.Router();

router.post('', isAuthenticated, async (req, res) => {
    const { storeName } = req.body

    if (!storeName) return res.json({ error: "store name can't be empty" })

    const store = await Store.create({ name: storeName, userId: req.user.id })

    res.json(store)

})

router.get('', isAuthenticated, async (req, res) => {

    const stores = await Store.findAll({
        where: {
            userId: req.user.id
        },
        include: {
            model: Inventory,
            include: Book
        }
    })

    res.json(stores)

})

router.delete('/:id', isAuthenticated, async (req, res)=> {

    const store = await Store.findByPk(req.params.id)
    if (!store) return res.status(404).json({error: "Store not found"})
    if (store.userId != req.user.id) res.status(400).json("You are not a valid user to perform this task")

    res.json(await store.destroy())
})

module.exports = router
