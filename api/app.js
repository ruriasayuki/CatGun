const express = require('express')
//const sql = require('mssql')
const bodyParser = require('body-parser')
//const config = require('config')

const fs = require('fs')

//初始化app连接池
//const appPool = new sql.ConnectionPool(config.mssqlConfig)


const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

const test = require('./routes/hello')

const routes = {};
fs.readdirSync('./routes').forEach(file => {
        if (file.endsWith('.js')) {
            const moduleName = file.replace('.js', '');
            routes[moduleName] = require('./routes/'+moduleName);
        }
    });



app.loadRoute = function(route,url){
    for(let k in route){
      if(route[k].method){
        if(route[k].method=='GET'){
          this.get('/'+url+k,route[k].func)
        }else if(route[k].method=='POST'){
          this.post('/'+url+k,route[k].func)
        }
      }
    }
  }
  
  for(let routeName in routes){
    app.loadRoute(routes[routeName],routeName)
  }






  const server = app.listen(3000, function () {
    const host = server.address().address
    const port = server.address().port
    console.log('Example app listening at http://%s:%s', host, port)
      
 
  })