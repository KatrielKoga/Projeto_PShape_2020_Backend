const connection = require('../database/connection')
const { getById } = require('./AlunoController')

module.exports = {
  async create(request, response) {
    const { tipo, observacoes, data_hora_agendamento, data_hora_execucao, aluno_id } = request.body
    const personal_id = request.headers.personal

    const execucao = data_hora_execucao ? data_hora_execucao : null


    const agendamento = await connection('agendamento').insert({
      tipo,
      observacoes,
      data_hora_agendamento,
      data_hora_execucao: execucao,
      personal_id,
      aluno_id
    })

    return response.json(agendamento)
  },

  async update(request, response) {
    const { tipo, observacoes, data_hora_agendamento, data_hora_execucao, aluno_id } = request.body
    const { id } = request.params

    const execucao = data_hora_execucao ? data_hora_execucao : null

    const agendemento = await connection('agendamento')
      .where('agendamento.id', '=', id)
      .update({
        tipo,
        observacoes,
        data_hora_agendamento,
        data_hora_execucao: execucao,
        aluno_id
      })

    return response.json(agendemento)
  },

  async delete(request, response) {
    const { id } = request.params

    await connection('agendamento')
      .where('id', id)
      .delete()

    return response.status(204).send()
  },

  async index(request, response) {
    const personal_id = request.headers.personal
    const data = request.query.data

    if (data) {
      const agendamentos = await connection('agendamento')
        .where('agendamento.personal_id', '=', personal_id)

      const agendData = agendamentos.filter(agend => {
        const date = agend.data_hora_agendamento.substr(0, 10)
        if (date === data) {
          return agend
        }
      })
      console.log("teste" + agendData)
      return response.json(agendData)
    } else {
      const agendamentos = await connection('agendamento')
        .join('alunos', 'agendamento.aluno_id', '=', 'alunos.id')
        .where('agendamento.personal_id', '=', personal_id)
        .select('agendamento.*', 'alunos.nome')
        .orderBy('data_hora_agendamento')

      agendamentos.forEach((agend) => {
        let titulo;
        let hora = agend.data_hora_agendamento.split(" ")
        let horaFormatada = hora[1].split(":");
        if (agend.tipo === 'T') {
          titulo = `Treino ${agend.nome} ${horaFormatada[0]}:${horaFormatada[1]} `
        } else {
          titulo = `Avaliação ${agend.nome} ${horaFormatada[0]}:${horaFormatada[1]}`
        }
        const date = agend.data_hora_agendamento.substr(0, 10)
        // estes 3 campos sao adicionados para funcionar o calendario
        agend.date = date
        agend.url = date
        agend.title = titulo
      })

      return response.json(agendamentos)

    }

  },

  async getById(request, response) {
    const personal_id = request.headers.personal
    const { id } = request.params

    const agendamentos = await connection('agendamento')
      .where('agendamento.personal_id', '=', personal_id)
      .andWhere('agendamento.id', '=', id)

    return response.json(agendamentos)
  },

}