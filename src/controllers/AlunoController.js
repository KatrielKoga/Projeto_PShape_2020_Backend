const { response } = require('express')
const connection = require('../database/connection')

module.exports = {
  async create(request, response) {
    const { nome, telefone, whatsapp, objetivo, observacoes, sexo, data_nasc } = request.body
    const personal_id = request.headers.personal

    const aluno = await connection('alunos').insert({
      personal_id,
      nome,
      telefone,
      whatsapp,
      objetivo,
      observacoes,
      sexo,
      data_nasc
    })

    return response.json(aluno)
  },

  async update(request, response) {
    const { nome, telefone, whatsapp, objetivo, observacoes, sexo, data_nasc } = request.body
    const { id } = request.params

    const aluno = await connection('alunos')
      .where('alunos.id', '=', id)
      .update({
        nome,
        telefone,
        whatsapp,
        objetivo,
        observacoes,
        sexo,
        data_nasc
      })

    return response.json(aluno)
  },

  async delete(request, response) {
    const { id } = request.params

    await connection('alunos').where('id', id).update({ ativo: 0 })

    return response.status(204).send()
  },

  async index(request, response) {
    const personal_id = request.headers.personal
    const alunos = await connection('alunos')
      .where('alunos.personal_id', '=', personal_id)
      .andWhere('alunos.ativo', '=', 1)
      .orderBy('nome')

    return response.json(alunos)
  },

  async getNumeroAlunos(request, response) {
    var valor
    const personal_id = request.headers.personal
    const quantidade = await connection('alunos')
      .where('alunos.personal_id', '=', personal_id)
      .andWhere('alunos.ativo', '=', 1).count()
    valor = quantidade[0]['count(*)']

    return response.json(valor);
  },

  async getById(request, response) {
    const { id } = request.params
    const personal_id = request.headers.personal
    const alunos = await connection('alunos')
      .where('alunos.personal_id', '=', personal_id)
      .andWhere('alunos.id', '=', id)

    return response.json(alunos)
  }
}