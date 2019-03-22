const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast')


const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Manny Cervantes'
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Manny Cervantes'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is an example help message.',
    title: 'Help',
    name: 'Manny Cervantes'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    } 

    forcast(latitude, longitude, (error, forcastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forcast: forcastData,
        location,
        address: req.query.address
      })
    })
  })

});

app.get('/products', (req,res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search);
  res.send({
    products: []
  })
})


app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Manny Cervantes',
    errorMessage: 'Help article not found'
  })
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Manny Cervantes',
    errorMessage: 'Page not found.'
  })
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
