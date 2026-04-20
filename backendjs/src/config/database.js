const mysql = require('mysql2/promise')
require('dotenv').config()


const variaveisObrigatorias = ['DB_HOST', 'DB_USER', 'DB_PASS', 'DB_NAME']
variaveisObrigatorias.forEach(variavel => {
    if (!process.env[variavel]) {
        console.error(`[ERRO]: A variável ${variavel} não foi encontrada no arquivo .env`)
        process.exit(1)
    }
})

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    dateStrings: true
})

async function executar(sql, parametros = []) {
    try {
        const [resultados] = await pool.execute(sql, parametros)
        return resultados
    } catch (erro) {
        console.error(' [Erro no banco de dados]:', {
            mensagem: erro.message,
            comandoSql: sql
        })
        throw erro
    }
}

module.exports = { executar }