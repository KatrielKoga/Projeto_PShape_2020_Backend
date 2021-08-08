const { request, response } = require('express')
const connection = require('../database/connection')

module.exports = {
  async create( request, response ) {
    const { 
      peso, 
      altura, 
      dobra_tricipal, 
      dobra_bicipal,
      dobra_toracica,
      dobra_panturrilha,
      dobra_abdominal,
      dobra_coxa,
      dobra_subescapular,
      dobra_supra_iliaca,
      dobra_axilar,
      data_avaliacao
    } = request.body
    const aluno_id = request.query.aluno

    const avaliacao = await connection('avaliacao').insert({
      peso, 
      altura, 
      dobra_tricipal, 
      dobra_bicipal,
      dobra_toracica,
      dobra_panturrilha,
      dobra_abdominal,
      dobra_coxa,
      dobra_subescapular,
      dobra_supra_iliaca,
      dobra_axilar,
      data_avaliacao,
      aluno_id
    })

    return response.json(avaliacao)
  },

  async update(request, response) {
    const { 
      peso, 
      altura, 
      dobra_tricipal, 
      dobra_bicipal,
      dobra_toracica,
      dobra_panturrilha,
      dobra_abdominal,
      dobra_coxa,
      dobra_subescapular,
      dobra_supra_iliaca,
      dobra_axilar,
      data_avaliacao
    } = request.body
    const { id } = request.params

    const avaliacao = await connection('avaliacao')
      .where('avaliacao.id', '=', id)
      .update({
        peso, 
        altura, 
        dobra_tricipal, 
        dobra_bicipal,
        dobra_toracica,
        dobra_panturrilha,
        dobra_abdominal,
        dobra_coxa,
        dobra_subescapular,
        dobra_supra_iliaca,
        dobra_axilar,
        data_avaliacao,
      })

    return response.json(avaliacao)
  },

  async getById(request, response) {
    const { id } = request.params
    const avaliacao = await connection('avaliacao')
    .where('avaliacao.id', '=', id)

    return response.json(avaliacao)
  },

  async delete(request, response) {
    const { id } = request.params

    await connection ('avaliacao').where('id', id).delete()

    return response.status(204).send()
  },

  async index(request, response) {
    const aluno_id = request.query.aluno

    const avaliacoes = await connection('avaliacao')
      .where('avaliacao.aluno_id', '=', aluno_id)

    return response.json(avaliacoes)
  }
}