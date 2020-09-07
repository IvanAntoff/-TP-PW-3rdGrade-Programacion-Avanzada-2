const express = require('express');
const app = express();
const port = 3000;

const handlebars = require('express-handlebars');


app.engine ('hbs', handlebars({
    //Ubicamos el directorio de los layouts.
    layoutsDir: __dirname + '/views/layouts',
    //cambia el tipo de extension de .handlebars a .hbs
    extname: 'hbs',
    //new configuration parameter
    defaultLayout: 'index',
    //new configuration parameter
    partialsDir: __dirname + '/views/partials/'
}));

app.set('view engine', 'hbs');

//Agregamos la carpeta public como dir para contenido estatico.
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('main', {layout: 'index'});
});

app.get('/portfolio.html', (req, res) => {
    res.render('main', {layout: 'portfolio'});
});

app.listen(port, () => {
    console.log('The web server has started on port 3000');
});