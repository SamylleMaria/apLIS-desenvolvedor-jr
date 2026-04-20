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

}

module.exports = Paciente
 


        