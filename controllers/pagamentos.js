
module.exports = (app) => {

    app.get('/pagamentos', (req, res) => res.send('rodando na porta 3000'))

    app.post('/pagamentos/pagamento', (req, res)=>{
        const pagamento = req.body
        console.log(pagamento)
        res.send(pagamento)
    })

}