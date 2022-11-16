const express = require('express')
const Crypto = require('crypto')
const router = express.Router()

const ContenedorArchivos = require('../contenedores/productos')
let contenedor = new ContenedorArchivos();

router.get('/', async (req, res) => {
  try {
    res.json(await contenedor.getAll())
  } catch (error) {
    res.status(500).json({
      error: 'Fallo al encontrar productos'
    })
  }
})

router.get('/:id', async (req, res) => {
  const producto = await contenedor.getById(req.params.id)
  if (!producto) {
    res.status(404).json({
      error: 'No se encontro el producto'
    })
  } else {
    res.json(producto)
  }
})

router.post('/', async (req, res) => {
  try {
    console.log(req)
    const id = Crypto.randomUUID()
    const save = await contenedor.save({
      id,
      title: req.body.title,
      price: req.body.price,
      thumbnail: req.body.thumbnail
    })
    res.json(id)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'error al crear producto'
    })
  }
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const producto = await contenedor.getById(id)
  if (!producto) {
    res.status(404).json({
      error: 'No se encontro el producto'
    })
  } else {
    await contenedor.deleteById(id)
    const save = await contenedor.save({
      id,
      title: req.body.title,
      price: req.body.price,
      thumbnail: req.body.thumbnail
    })
    res.json(id)
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const producto = await contenedor.getById(id)
  if (!producto) {
    res.status(404).json({
      error: 'No se encontro el producto'
    })
  } else {
    await contenedor.deleteById(id)
    res.json(id)
  }
})

module.exports = router