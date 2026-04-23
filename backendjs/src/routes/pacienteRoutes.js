const express = require('express')
const router = express.Router()
const PacienteController = require('../controllers/PacienteController')

router.get('/pacientes', PacienteController.listarPaciente)

router.post('/pacientes', PacienteController.cadastrarPaciente)

router.put('/pacientes/:id', PacienteController.editarPaciente)

router.delete('/pacientes/:id', PacienteController.deletarPaciente)

module.exports = router