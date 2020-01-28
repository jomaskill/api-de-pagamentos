const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')


module.exports = (app) =>{
    var app = express()


    //como os dados podem ser recebidos
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    //utilizando pastas do diretório
    consign()
        .include('controllers')
        .then('persistencia')
        .into(app)
    
    return app
}