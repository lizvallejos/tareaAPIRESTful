const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const productos = require('./rutas/productos')
const PUERTO = 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/productos/', productos)

app.get('/', (req, res) => {
  res.send('holi')
})

app.listen(PUERTO, () => {
  console.log(`Servidor en el puerto ${PUERTO}`)
})