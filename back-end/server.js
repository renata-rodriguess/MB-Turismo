import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()
const app= express() 

app.use(cors())
app.use(express.json())

app.post('/usuarios', async (req, res) => {
    const novoUsuario =
  await prisma.usuario.create({
    data: {
        nome: req.body.nome,
        senha:req.body.senha
    }
  })

    res.status(201).json(novoUsuario)
})

app.get('/usuarios', async (req, res) => { 
    const { nome } = req.query
    try {
      if (nome) {
      const listaUsuarios = await prisma.usuario.findMany({
        where: {
          nome: nome 
        }
      })
     return res.json(listaUsuarios)
  } 
  const listaUsuarios = await 
  prisma.usuario.findMany()
  res.json(listaUsuarios)
  } catch (erro) {
    res.status(500).json({ erro: erro.message })
  }
})

app.put('/usuarios/:id', async (req, res) => {
  try {
    const {id} = req.params
    const {nome, senha} = req.body

    const usuarioAtualizado = 
 await prisma.usuario.update({
    where: { id: req.params.id },
    data: { nome, senha }
  })

res.json(usuarioAtualizado)
  } catch (erro){
    if (erro.code === 'P2025') {
      return res.status(404).json({ erro: "Usuário não encontrado" })
  }

    res.status(500).json({ erro: erro. message})
}
})

app.delete('/usuarios/:id', async (req, res) => {
  try {
    const id = req.params.id

    const usuarioApagado = 
 await prisma.usuario.delete({
    where: { id: id }
  })

res.json({ mensagem: "Usuário deletado com sucesso!", usuario: usuarioApagado})
  } catch (erro){
    if (erro.code === 'P2025') {
      return res.status(404).json({ erro: "Usuário não encontrado" })
  }
    res.status(500).json({ erro: erro.message })
  }

})

app.listen(8080)

const PORTA=8080
app.listen(PORTA,() =>{
  console.log('Servidor rodando em http://localhost:8080{PORTA}')
})