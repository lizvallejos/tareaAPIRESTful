const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser')
const productos = require('./rutas/productos')
const PUERTO = 8080

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/productos/', productos)

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PUERTO, () => {
  console.log(`Servidor en el puerto ${PUERTO}`)
})