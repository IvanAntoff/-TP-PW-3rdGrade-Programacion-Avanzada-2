const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

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
    res.render('home', {layout: 'main'});
});

app.get('/index.html', (req, res) => {
    res.render('home', {layout: 'main'});
});

app.get('/portfolio.html', (req, res) => {
    res.render('home', {layout: 'portfolio'});
});

app.get('/blog.html', (req, res) =>{
    res.render('home', {layout: 'blog'})
})

app.get('/about.html', (req, res) =>{
    res.render('home', {layout: 'about'})
})

app.get('/contact.html', (req, res) =>{
    res.render('home', {layout: 'contactus'})
})

app.listen(port, () => {
    console.log(`Our app is running on port ${ port }`);
});