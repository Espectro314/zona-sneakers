// app.js
const express = require('express');
const scrapeWebsite = require('./scraper');
const scrapeWebsiteDesc = require('./scraperDetalles');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

//Rutas
app.get('/api/products', async (req, res) => {
  try {
    // Obtén la URL base del query parameter o usa una URL predeterminada
    const baseUrl = req.query.baseUrl || 'https://www.dexter.com.ar/hombre/calzado';
    const products = await scrapeWebsite(baseUrl);
    res.render('index', { products });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

app.get('/api/products/detalles', async (req, res) => {
  try {
    // Obtén el valor del parámetro DetallesLink de la URL
    const detallesLink = req.query.DetallesLink;

    // Usa el valor de DetallesLink como baseUrl o una URL predeterminada si no está presente
    
    const baseUrl = detallesLink ;
     
    const descripcion = await scrapeWebsiteDesc(baseUrl);
    res.render('detalles', { descripcion });
  } catch (error) {
    res.status(500).json({ error: 'Error al realizar la solicitud' });
  }  
});


app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
