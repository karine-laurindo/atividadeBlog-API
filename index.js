const express = require('express')
const app = express()
const port = 3300
const router = require('./routers/produtos')


app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use(router)

//Arquivos estáticos -> CSS, IMG, VIDEOS,JS
app.use(express.static('public'))

app.listen(port, ()=>{
    console.log('Servidor on 🚀')
})