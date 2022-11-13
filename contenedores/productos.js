const fs = require('fs')

class ContenedorArchivosProductos {
  constructor(){
    this.archivo = './productos.txt';
  }

  async save(producto) {
    let data = null
    try {
      data = await fs.promises.readFile(this.archivo, 'UTF-8')
    } catch (error) {
      await fs.promises.writeFile(this.archivo, JSON.stringify([]))
      data = await fs.promises.readFile(this.archivo, 'UTF-8')
    }
    if (data) {
      data = JSON.parse(data)
      data.push(producto)
      await fs.promises.writeFile(this.archivo, JSON.stringify(data))
    } else {
      let dato = []
      dato.push(producto)
      await fs.promises.writeFile(this.archivo, JSON.stringify(dato))
    }
  }

  async getById(id) {
    let data = null
    try {
      data = await fs.promises.readFile(this.archivo, 'UTF-8')
    } catch (error) {
      await fs.promises.writeFile(this.archivo, JSON.stringify([]))
      data = await fs.promises.readFile(this.archivo, 'UTF-8')
    }
    return data ? JSON.parse(data).filter(val => val.id == id)[0] : [];
  }

  async getAll() {
    let data = null
    try {
      data = await fs.promises.readFile(this.archivo, 'UTF-8')
    } catch (error) {
      await fs.promises.writeFile(this.archivo, JSON.stringify([]))
      data = await fs.promises.readFile(this.archivo, 'UTF-8')
    }
    return JSON.parse(data)
  }

  async deleteById(id) {
    let data = null
    try {
      data = await fs.promises.readFile(this.archivo, 'UTF-8')
    } catch (error) {
      await fs.promises.writeFile(this.archivo, JSON.stringify([]))
      data = await fs.promises.readFile(this.archivo, 'UTF-8')
    }
    if (data) {
      data = JSON.parse(data)
      let index = data.map(val => val.id).findIndex(val => val == id);
      data.splice(index, 1);
      await fs.promises.writeFile(this.archivo, JSON.stringify(data))
      console.log(data);
    } else {
      console.log(null)
    }
    
  }

  async deleteAll() {
    await fs.promises.writeFile(this.archivo, JSON.stringify([]))
  }
}

module.exports = ContenedorArchivosProductos