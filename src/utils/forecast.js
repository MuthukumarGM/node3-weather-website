const request=require('request')

const forecast=(Latitude,Longitude,callback)=>{
    const url='https://api.darksky.net/forecast/55bb3f99f6eb4ac6d9c9ee4a733ee3fe/'+encodeURIComponent(Latitude)+','+encodeURIComponent(Longitude)+'?units=si'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Fore cast service not available now, try sometimes later',undefined)
        }else if(body.error){
            callback('Unnable to find location',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary+' Its Currently '+body.currently.temperature+' degrees out.'+body.daily.data[0].temperatureMin+' is the Minum temprature of the day.'+body.daily.data[0].temperatureMax+' is the Max temprature of the Day. There is a '+body.currently.precipProbability+'% chance of rain')
            //     Temperature:response.body.currently.temperature,
            //     PrecipProbability:response.body.currently.precipProbability,
            //     Summary:response.body.daily.data[0].summary

            // })
        }
    })
}

module.exports=forecast