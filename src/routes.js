const express = require('express')
const PersonalController = require('./controllers/PersonalController')
const AlunoController = require('./controllers/AlunoController')
const AvaliacaoController = require('./controllers/AvaliacaoController')
const AgendamentoController = require('./controllers/AgendamentoController')
const ExercicioController = require('./controllers/ExercicioController')
const TreinoController = require('./controllers/TreinoController')
const Autenticacao = require('./controllers/Autenticacao')


const routes = express.Router()

routes.post('/personal/login', Autenticacao.login)

routes.post('/personal', PersonalController.create)
routes.put('/personal/:id', PersonalController.update)

routes.post('/alunos', AlunoController.create)
routes.get('/alunos', AlunoController.index)
routes.get('/alunos/:id', AlunoController.getById)
routes.put('/alunos/:id', AlunoController.update)
routes.delete('/alunos/:id', AlunoController.delete)
routes.get('/alunosQtd/:id', AlunoController.getNumeroAlunos)

routes.post('/avaliacao', AvaliacaoController.create)
routes.get('/avaliacao', AvaliacaoController.index)
routes.get('/avaliacao/:id', AvaliacaoController.getById)
// routes.get('/avaliacao?data=:data', AvaliacaoController.getAgendamentoByData) 
routes.put('/avaliacao/:id', AvaliacaoController.update)
routes.delete('/avaliacao/:id', AvaliacaoController.delete)

routes.post('/agendamento', AgendamentoController.create)
routes.get('/agendamento', AgendamentoController.index)
routes.get('/agendamento/:id', AgendamentoController.getById)
routes.put('/agendamento/:id', AgendamentoController.update)
routes.delete('/agendamento/:id', AgendamentoController.delete)

routes.post('/exercicio', ExercicioController.create)
routes.get('/exercicio', ExercicioController.index)
routes.get('/exercicio/:id', ExercicioController.getById)
routes.put('/exercicio/:id', ExercicioController.update)
routes.delete('/exercicio/:id', ExercicioController.delete)

routes.post('/treino', TreinoController.create)
routes.put('/treino/:id', TreinoController.update)
routes.delete('/treino/:id', TreinoController.delete)
routes.get('/treino', TreinoController.index)
routes.get('/treino/:id', TreinoController.getById)

module.exports = routes