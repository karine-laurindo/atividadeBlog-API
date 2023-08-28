const express = require('express')
const path = require('path')
const {randomUUID} = require('crypto');
const { response } = require('express');
const router = express.Router();

const basePath = path.join(__dirname, '../templates')
const usuarios = []

router.use(express.json())

router.get('/', (req, res)=>{
    res.sendFile(`${basePath}/home.html`)
})

router.get('/cadastrarProdutos.html', (req,res)=>{
    res.sendFile(`${basePath}/cadastrarProdutos.html`)
})

router.post('/cadastrarProdutos', (req, res)=>{
    const {name, email, idade} = req.body
    const usuario = {
        id: randomUUID(),
        name,
        email,
        idade
    }
    usuarios.push(usuario)
    return res.json(usuario)
})

router.get("/cadastrarProdutos", (req,res)=>{
    return res.json(usuarios)
})

router.delete('/produtos/:id', (req,res)=>{
    const {id} = req.params
    const usuario = usuarios.findIndex((usuario)=> usuario.id === id)
    usuarios.splice(usuario, 1)

    return res.json({'message': 'Usuário deletado com sucesso'})
})

router.put("/produtos/:id", (req,res)=>{
    const {id} = req.params
    const {nome, email, idade} = req.body
    const usuarioIndex = usuarios.findIndex((usuario) => usuario.id === id)

    if(usuarioIndex === -1){
        return res.status(404).json({message: "Usuário não enocntrado"})
    }
    const usuarioAtualizado = {
        id,
        nome,
        email,
        idade
    }

    usuarios[usuarioIndex] = usuarioAtualizado
    return res.json(usuarioAtualizado)
})

module.exports = router