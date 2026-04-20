const Paciente = require('../models/Paciente')

const PacienteController = {
    listarPaciente: async (req, res) => {
        try {
            const pacientes = await Paciente.listarTodos()
            
            return res.status(200).json(pacientes)

        } catch (erro) {
            console.error('Erro ao listar:', erro.message)

            return res.status(500).json({ erro: 'Erro ao buscar pacientes'})

        }
    },

    cadastrarPaciente: async (req, res) => {
        try {
            const dados = req.body
            await Paciente.cadastrarPaciente(dados)

            return res.status(201).send('Paciente criado com sucesso!')
            
        } catch (erro) {
            console.error('Erro ao cadastrar:', erro.message)

            const status = erro.message.includes('obrigatorios') || erro.message.includes('já está cadastrado') ? 400 : 500
            return res.status(status).json({erro: erro.message})

        }
    }

}

module.exports = PacienteController