const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibXV0aHVnbTMiLCJhIjoiY2p4eWpxcXN4MGI3ajNpb3o5eG5kZW9sYyJ9.prZga1fGDl4rF3wW6Xfhzg&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Geo code service not available now try agian latter',undefined)
        }
        else if(!body.features){
            callback('No searche result available for your Query ',undefined)
            
        }else if(body.features.length===0){
            callback('No data available for your search request',undefined)
            console.log('New Catch')
        }else{
            
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode