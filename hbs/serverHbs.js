const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const productRouter = require("./index.js");

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
  })
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('views', './hbs_views');
app.set('view engine', 'hbs');

app.use("/api/productos", productRouter);

app.listen(8080, () => {
  console.log('Escuchando!');
});