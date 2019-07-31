const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
	

const app = express()

//defines paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialpath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req, res) => {
    res.render('index' ,{
        title:'Weather',
        name:'Nandini Deshpande'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title:'About',
        name:'Nandini Deshpande'
    })
})

app.get('/help',(req, res) => { 
    res.render('help',{
        helptext:'what problem do you have?',
        title:'Help',
        name:'Nandini Deshpande'
    })
})

app.get('/weather', (req, res) =>
{
    if(!req.query.address){
        return res.send({
            error:'you must provide address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude, longitude, (error,forecastdata) =>
        { 
            if(error)
            {  
                return res.send({error})
            }

        res.send({
            forecast: forecastdata,
            location,
            address: req.query.address
        })
        })
    }) 

})
///
app.get('/products',(req, res) => {
    if(!req.query.search){
        return res.send({
            error:'you must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('*', (req, res) =>
{
    res.render('error',{
        name: 'Nandini Deshpande',
        title:'404 page not found'
    })
})

app.listen(3000, ()=>
{

    console.log("server is running")
})
//app.com//app.com/help