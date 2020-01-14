const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

// defining pathes
const publicDir = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

// setting up pathes and handlebars
app.set('view engine', 'hbs'); // setup for handlebars
app.set('views', viewPath);
hbs.registerPartials(partialPath);

// serving public directory
app.use(express.static(publicDir));

app.get('', (req,res) => {
    res.render('index', {
        title: "Main Page",
        name: 'Mushvig Niftaliyev'
    });
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: "About Page",
        name: 'Rashid Aliyarov'
    });
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: "Help Page",
        name: 'Elnur Mammadli'
    });
})


app.get('/weather', (req,res) => {
    const searchParam = req.query.address;
    if(!searchParam){
        return res.send({error: "Address is not provided"});
    }

    geoCode(searchParam, (err,{latitude , longitude='', location=''} = {} ) => {  // empty object for default in destructuring
        res.send({latitude, longitude, location})
    });
});


app.get('*',(req,res) => {
    res.send('404 PAGE')
})


app.listen(port, () => {
    console.log(`SERVER IS UP AND RUNNING ON PORT ${port}`)
});