const connection = require('../database/connection')
var bcrypt = require('bcrypt-nodejs')

module.exports = {
  async login(request, response){
    const { email, senha } = request.body

    const personal = await connection('personal')
      .where('personal.email', '=', email)
      .first()

    if (!personal) return response.status(400).send('Email inválido.')

    var matchSenha = bcrypt.compareSync(senha, personal.senha)
    if(!matchSenha) return response.status(400).send('Senha inválida.')

    return response.json({nome: personal.nome, id: personal.id})
  }
}