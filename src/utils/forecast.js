const request = require('request')

const forecast = (latitude, longitude, callback)=>{
const url = 'https://api.darksky.net/forecast/4fa60c14cc1e4df4af60204485955b34/'+ latitude + ',' + longitude 
request({ url, json: true},function(error, {body}){
	if(error)
	{
		callback("enable to connect to weather service",undefined)
	}
	else if(body.error)
	{
		callback("unable to find location!!",undefined)
	}
	else{
		callback(undefined,'Temperature: '+((body.currently.temperature - 32)*0.55).toFixed(0) +' degree Celsius.There is '+body.currently.icon+', Wind Speed:'+body.currently.windSpeed+', Clouds:'+body.currently.cloudCover )
		
	}
})
}
module.exports = forecast