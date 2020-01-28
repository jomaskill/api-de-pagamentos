const { check, validationResult } = require('express-validator');

module.exports = (app) => {

    app.get('/pagamentos', (req, res) => res.send('rodando na porta 3000'))

    app.post("/pagamentos/pagamento",function(req, res) {

        //validação de resultados
        check("forma_de_pagamento").notEmpty()
        check("valor").notEmpty().isFloat()
        const erros = validationResult(req)

        if(!erros.isEmpty()) {
            console.log('erros encontrados')
            res.send(erros.array())
        }

        var pagamento = req.body;
        console.log('processando pagamento...')
    
        //utilizando pastas do diretório atraves do Consign
        var connection = app.persistencia.connectionFactory()
        var pagamentoDao = new app.persistencia.PagamentoDao(connection)

        pagamento.status = "CRIADO";
        pagamento.data = "20-01-01";
    
        pagamentoDao.salva(pagamento, (erro, result)=>{
            if(erro)  res.status(500).send(erro)
            console.log("pagamento criado")
            res.location('/pagamentos/pagamento/' + result.insertId)
            res.status(201).json(pagamento)
        })
      })

    app.put('/pagamentos/pagamento/:id', (req, res)=>{

        var pagamento = {}
        const id = req.params.id

        pagamento.id = id
        pagamento.status = 'CONFIRMADO'

        //utilizando pastas do diretório atraves do Consign
        var connection = app.persistencia.connectionFactory()
        var pagamentoDao = new app.persistencia.PagamentoDao(connection)

        pagamentoDao.atualiza(pagamento, (erro, result) =>{
            if(erro) res.status(500).send(erro)
            console.log("pagamento confirmado")
            res.send(pagamento)
        })

    })

    app.delete('/pagamentos/pagamento/:id', (req, res)=>{
        var pagamento = {}
        const id = req.params.id

        pagamento.id = id
        pagamento.status = 'CANCELADO'

        //utilizando pastas do diretório atraves do Consign
        var connection = app.persistencia.connectionFactory()
        var pagamentoDao = new app.persistencia.PagamentoDao(connection)

        pagamentoDao.atualiza(pagamento, (erro, result) =>{
            if(erro) res.status(500).send(erro)
            console.log("pagamento cancelado")
            res.send(pagamento)
        })
    })
}