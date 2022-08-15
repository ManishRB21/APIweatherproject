const express= require('express');
const https= require('https');
const bodyparser= require('body-parser');
const { urlencoded } = require('body-parser');
const app= express();

app.use(bodyparser.urlencoded({extended:true}));

app.get('/', function(req, res){
   res.sendFile(__dirname+'/index.html');
});

app.post('/', function(req,res){
    console.log('req.body.cityname');
    const city= req.body.cityname;
    const appkey= 'b7132e5ae6959454c71605c778185801';
    const unit ='metric';
 const url ='https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+appkey +'&units='+unit;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on('data', function(data){
            const weatherdata =JSON.parse(data);
            const temp= weatherdata.main.temp;
            const weather= weatherdata.weather[0].description;
            const icon= weatherdata.weather[0].icon;
            const image='http://openweathermap.org/img/wn/'+icon+'@2x.png';
            console.log(temp);
            res.write('<p>The weather is ' + weather+'</p>');
            res.write('<h1>The temp in '+city+' is '+ temp+' deg</h1>' );
            res.write('<img src ='+image+'>');
            res.send();
        
        
        } );
    });

})

   




app.listen(3000, function(){
    console.log('server started');
});