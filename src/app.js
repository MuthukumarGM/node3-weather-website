const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')
const path=require('path')
const express=require('express')
const hbs=require('hbs')
const app=express()

//Define Paths for expres config
const publicDirectoryPath=path.join(__dirname,'../public')
const ViewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handle bar engine 
app.set('view engine','hbs')

//set handle bar views location
app.set('views',ViewsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

//hbs path set
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Created by Muthu',
        developer:'Muthu'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Darbar',
        name:'Directed By AR Murugadoss',
        developer:'Muthu'

    })
})

app.get('/help',(request,response)=>{
    response.render('help',{
        title:'Weather app Help section',
        name:'Created by Muthu',
        developer:'Muthu'
    })
})



app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provdie an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})//console.log(error)
        }
          forecast(latitude, longitude, (error, foreCastData) => {
              if(error){
                return res.send({error})
              }
                res.send({
                    forecast:foreCastData,
                    location,
                    address:req.query.address
                    
                })//console.log('Location', location)
                //console.log('Forecast', foreCastData)
          })
    
    
    })
    
    // res.send({
    //     forecast:'It is snowing',
    //     location:'Philadelphia',
    //     address:req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Created by Muthu',
        errorMessage:'help page Note found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Created by Muthu',
        errorMessage:'Page Not found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up and running!!!')
})
