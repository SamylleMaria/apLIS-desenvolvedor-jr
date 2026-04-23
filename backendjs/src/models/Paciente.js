const {executar} = require('../config/database')

class Paciente {
    static async listarTodos() {
        const sql = 'SELECT id, nome, dataNascimento, carteirinha, cpf FROM pacientes'
        const resultados = await executar(sql)

        return resultados.map(p => {
            if (!p.dataNascimento) {
                delete p.dataNascimento
            }
            return p
        })
        
    }

    static async cadastrarPaciente({nome, carteirinha, cpf, dataNascimento}) {
        
        
        nome = nome.toString().replace(/<[^>]*>?/gm, '').trim()
        carteirinha = carteirinha.toString().trim()
        cpf = cpf.toString().replace(/[^0-9]/g, '')
        dataNascimento = dataNascimento || null
        
        if (!nome || !carteirinha || !cpf) {
            throw new Error('Nome, carteirinha e CPF são obrigatórios.')
        }

        if(cpf.length !==11) {
            throw new Error('CPF inválido')
        }
        
        const sqlInsert = 'INSERT INTO pacientes (nome, dataNascimento, carteirinha, cpf) VALUES (?, ?, ?, ?)'

        try {
            const resultado = await executar(sqlInsert, [nome, dataNascimento, carteirinha, cpf])

            return resultado.insertId

        } catch (erro) {
            if (erro.code === 'ER_DUP_ENTRY') {
                throw new Error('CPF ou carteirinha já cadastrados.')
            }
            throw erro
        }
    }

    static async editarPaciente(id, { nome, carteirinha, cpf, dataNascimento }) {

    nome = nome.toString().replace(/<[^>]*>?/gm, '').trim()
    carteirinha = carteirinha.toString().trim()
    cpf = cpf.toString().replace(/[^0-9]/g, '')
    dataNascimento = dataNascimento || null

    if (!nome || !carteirinha || !cpf) {
        throw new Error('Nome, carteirinha e CPF são obrigatórios.')
    }

    if (cpf.length !== 11) {
        throw new Error('CPF inválido')
    }

    const sql = `UPDATE pacientes SET nome = ?, dataNascimento = ?, carteirinha = ?, cpf = ? WHERE id = ? `

        try {
            const resultado = await executar(sql, [nome, dataNascimento, carteirinha, cpf, id])

            if (resultado.affectedRows === 0) {
                throw new Error('Paciente não encontrado')
            }

            return true

        } catch (erro) {
            if (erro.code === 'ER_DUP_ENTRY') {
                throw new Error('CPF ou carteirinha já cadastrados.')
            }
            throw erro
        }
    }


    static async deletarPaciente(id) {

        const sql = 'DELETE FROM pacientes WHERE id = ?'

        const resultado = await executar(sql, [id])

        if (resultado.affectedRows === 0) {
            throw new Error('Paciente não encontrado')
        }

        return true
    }

}

module.exports = Paciente
