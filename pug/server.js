const express = require("express");
const app = express();
const multer = require("multer");
const productRouter = express.Router();

const Contenedor = require('./classContenedor.js');
const path = require('path')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

module.exports = productRouter;

const fileName = path.resolve(__dirname,'productos.txt');
let productos = new Contenedor(fileName);

productRouter.get('/mostrarPug',  async (req, res) => {
    let arrayPrdocutos = await productos.getAll();
    //res.send(array);
    console.log(arrayPrdocutos); 
    res.render('mostrar', { object: arrayPrdocutos });
});

productRouter.get('/cargarPug', async (req, res) => {
    //  console.log(req.body);
    res.render('cargar');
    console.log(req.body);
    //let producto = JSON.stringify(req.body);
    //let productoSave=await productos.save(producto);
    //res.send(productoSave);
});

productRouter.get('/',  async (req, res) => {
    let arrayPrdocutos = await productos.getAll();
    //res.send(array);
});

productRouter.get('/:id', async (req, res) => {
    let producto=await productos.getById(req.params.id);
    res.send(producto);
});



productRouter.post('/', async (req, res) => {
    console.log(req.body);
    let producto = JSON.stringify(req.body);
    let productoSave=await productos.save(producto);
    res.send(productoSave);
});

productRouter.put('/:id', async (req, res) => {
    let producto=await productos.getById(req.params.id);
    res.send(producto);
});

productRouter.delete('/:id', async (req, res) => { 
    res.sendStatus(await productos.deleteById(req.params.id));
})
