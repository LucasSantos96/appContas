const express = require('express')
const router = express.Router()
const db = require('../db')

//Rota para adicionar saída

router.post('/', (req, res)=> {
    const {valor, categoria, descricao} = req.body

    const sql = 'INSERT INTO saidas (valor, categoria, descricao) VALUES (?, ?, ?)'
    db.query(sql, [valor, categoria, descricao], (err, result)=> {
        if(err) {
            console.error('Erro ao inserir:', err)
            return res.status(500).json({error: 'Erro ao inserir'})
        }
        res.status(201).json({id: result.insertId, valor, categoria, descricao})
})
})


//rota para listar saídas 
router.get('/', (req,res)=>{
    db.query('SELECT * FROM saidas', (err, results)=>{
        if(err) {
            console.error('Erro ao buscar:', err)
            return res.status(500).json({error: 'Erro ao buscar'})
        }
        res.json(results)
    })
})

module.exports = router