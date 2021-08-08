const connection = require('../database/connection')
const bcrypt = require('bcrypt-nodejs')

module.exports = {
  //  encryptPassword (password)  {
  //   const salt = bcrypt.genSaltSync(10)
  //   return bcrypt.hashSync(password, salt)
  // },

  async create( request, response ) {
    const { nome, email, senha, confirmarSenha } = request.body

    if(senha !== confirmarSenha){
      return response.status(400).send("Senhas não conferem.")
    }

    const salt = bcrypt.genSaltSync(10);

    var senhaCrypt = bcrypt.hashSync(senha, salt)

    const personal = await connection('personal').insert({
      nome, 
      email,
      senha: senhaCrypt
    })
      return response.json(personal)
  },

  async update(request, response ) {
    const { nome, senhaAntiga, novaSenha, confirmarNovaSenha } = request.body
    const { id } = request.params

    if(senhaAntiga !== "") {

      if(novaSenha === "" || confirmarNovaSenha === "" || novaSenha !== confirmarNovaSenha) {
        return response.status(400).send("Novas senhas não conferem.")
      }

      const personal = await connection('personal')
        .where('personal.id', '=', id)
        .first()

      var matchSenha = bcrypt.compareSync(senhaAntiga, personal.senha)
      if(!matchSenha) return response.status(400).send('Senha antiga inválida.')

      const salt = bcrypt.genSaltSync(10);
      var senhaCrypt = bcrypt.hashSync(novaSenha, salt)

      const resp = await connection('personal')
        .where('personal.id', '=', id)
        .update({ 
          nome,
          senha: senhaCrypt
        })
      return response.json(resp)

    } else {
      const resp = await connection('personal')
        .where('personal.id', '=', id)
        .update({ nome })
      return response.json(resp)

    }

  },

  async delete() {

  },

}