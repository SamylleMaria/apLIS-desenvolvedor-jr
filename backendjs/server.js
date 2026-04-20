require('dotenv').config()

const express = require('express')
const cors = require('cors')
const pacienteRoutes = require('./src/routes/pacienteRoutes')

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api/v1', pacienteRoutes)

const PORTA = process.env.DB_PORT || 3000

app.listen(PORTA, () => {
    console.log('Servidor backend rodando com sucesso')
})