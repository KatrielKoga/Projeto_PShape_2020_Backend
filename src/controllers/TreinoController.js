const { format } = require('mysql')
const connection = require('../database/connection')
const { getById } = require('./AlunoController')

module.exports = {
  async create( request, response ) {
    const { nome, exercicios } = request.body
    const aluno_id = request.query.aluno
    const treino = request.query.treino
    const data = new Date()

  if(treino) {
    await connection('aluno_treino').insert({
      aluno_id,
      treino_id: treino,
      data 
    })
    return response.status(204).send()
  }

    const treino_id = await connection('treino').insert({
      nome
    })

    const aluno_treino_id = await connection('aluno_treino').insert({
      aluno_id,
      treino_id,
      data 
    })

    exercicios.forEach( async exercicio => {
      const tipo = await connection('exercicio')
      .select('tipo')
      .where('exercicio.id', '=', exercicio.exercicio_id)

      if(tipo[0].tipo === 'R') {
        const repeticao_id = await connection('repeticao').insert({
          series: exercicio.detalhes.series,
          repeticao: exercicio.detalhes.repeticao,
          carga: exercicio.detalhes.carga,
          observacoes: exercicio.detalhes.observacoes
        })

        await connection('treino_exercicio')
          .insert({
            treino_id,
            exercicio_id: exercicio.exercicio_id,
            repeticao_id
          })

      } else {
        const tempo_id = await connection('tempo').insert({
          tempo: exercicio.detalhes.tempo,
          observacoes: exercicio.detalhes.observacoes
        })

        await connection('treino_exercicio')
          .insert({
            treino_id,
            exercicio_id: exercicio.exercicio_id,
            tempo_id
          })
      }

    });

    return response.json(aluno_treino_id)
  },

  async update(request, response) {
    const { id } = request.params
    const { nome, exercicios } = request.body
    
    await connection('treino')
      .where('treino.id', '=', id) 
      .update({
        nome
      })

      const exerciciosRepeticaoBco = await connection('treino_exercicio')
      .where('treino_exercicio.treino_id', '=', id)
      .select('repeticao_id')
      
      
      const exerciciosTempoBco = await connection('treino_exercicio')
      .where('treino_exercicio.treino_id', '=', id)
      .select('tempo_id')
      
      await connection('treino_exercicio')
      .where('treino_exercicio.treino_id', '=', id)
      .del()


      exerciciosRepeticaoBco.forEach(async exercicio => {
        if(exercicio.repeticao_id !== null){
          await connection('repeticao')
            .where('repeticao.id', '=', exercicio.repeticao_id)
            .del()
        }
        // console.log("repeticao =",exercicio.repeticao_id)
      })


    exerciciosTempoBco.forEach(async exercicio => {
      if(exercicio.tempo_id !== null){
        await connection('tempo')
          .where('tempo.id', '=', exercicio.tempo_id)
          .del()
      }
      // console.log("tempo =", exercicio.tempo_id)
    })


      exercicios.forEach( async (exercicio) => {
        const tipo = await connection('exercicio')
        .select('tipo')
        .where('exercicio.id', '=', exercicio.exercicio_id)
  
        if(tipo[0].tipo === 'R') {
          const repeticao_id = await connection('repeticao').insert({
            series: exercicio.detalhes.series,
            repeticao: exercicio.detalhes.repeticao,
            carga: exercicio.detalhes.carga,
            observacoes: exercicio.detalhes.observacoes
          })
  
          await connection('treino_exercicio')
            .insert({
              treino_id: id,
              exercicio_id: exercicio.exercicio_id,
              repeticao_id
            })
  
        } else {
          const tempo_id = await connection('tempo').insert({
            tempo: exercicio.detalhes.tempo,
            observacoes: exercicio.detalhes.observacoes
          })
  
          await connection('treino_exercicio')
            .insert({
              treino_id: id,
              exercicio_id: exercicio.exercicio_id,
              tempo_id
            })
        }
  
      });

    
    return response.status(204).send()
  },

  async delete(request, response) {
    const { id } = request.params
    const  aluno = request.query.aluno

      if(aluno) {
        await connection('aluno_treino')
        .where('aluno_treino.treino_id', '=', id)
        .andWhere('aluno_treino.aluno_id', '=', aluno)
        .update({ativo: 0})
      } else {
        await connection('treino')
          .where('treino.id', '=', id)
          .update({ativo: 0})
        
        await connection('aluno_treino')
          .where('aluno_treino.treino_id', '=', id)
          .andWhereNot('aluno_treino.aluno_id', null)
          .update({ativo: 0})
      }


  
    return response.status(204).send()
  },

  async index(request, response) {
    const aluno_id = request.query.aluno
    const nomeTreino = request.query.nome
    
    if(aluno_id && nomeTreino){
      const treinos = await connection('aluno_treino')
        .join('treino', 'aluno_treino.treino_id', '=', 'treino.id')
        .where('aluno_treino.aluno_id', '=', aluno_id )
        .andWhere('treino.nome', '=', nomeTreino)
        .andWhere('aluno_treino.ativo', '=', 1)
        .andWhere('treino.ativo', '=', 1)
        .orderBy('treino.nome')
      return response.json(treinos)
    }else if(aluno_id){
      const treinos = await connection('aluno_treino')
        .join('treino', 'aluno_treino.treino_id', '=', 'treino.id')
        .where('aluno_treino.aluno_id', '=', aluno_id )
        .andWhere('aluno_treino.ativo', '=', 1)
        .orderBy('aluno_treino.data')
      return response.json(treinos)
    }else if(nomeTreino) {
      const treinos = await connection('aluno_treino')
        // .join('treino', 'aluno_treino.treino_id', '=', 'treino.id')
        .whereNull('aluno_treino.aluno_id')
        .join('treino', 'aluno_treino.treino_id', '=', 'treino.id')
        .where("treino.nome", "=", nomeTreino)
        .andWhere('treino.ativo', '=', 1)
        .orderBy('treino.nome')
      return response.json(treinos)
    }else {
      const treinos = await connection('treino')
        .whereNotNull('treino.nome')
        .andWhere('treino.ativo', '=', 1)
        .orderBy('treino.nome')
      return response.json(treinos)
    }
    
    // return response.json(treinos)
  },

  async getById(request, response) {
    const {id} = request.params

    const treino = await connection('treino')
      .where('treino.id', '=', id )
      .join('aluno_treino', 'treino.id', '=', 'aluno_treino.treino_id')

    const exerciciosRepet = await connection('treino_exercicio')
      .where('treino_exercicio.treino_id', '=', id)
      .join('exercicio', 'treino_exercicio.exercicio_id', '=', 'exercicio.id')
      // .join('tempo', 'treino_exercicio.tempo_id', '=', 'tempo.id')
      .join('repeticao', 'treino_exercicio.repeticao_id', '=', 'repeticao.id')
    
    
    const exerciciosTempo = await connection('treino_exercicio')
      .where('treino_exercicio.treino_id', '=', id)
      .join('exercicio', 'treino_exercicio.exercicio_id', '=', 'exercicio.id')
      .join('tempo', 'treino_exercicio.tempo_id', '=', 'tempo.id')
      // .join('repeticao', 'treino_exercicio.repeticao_id', '=', 'repeticao.id')
      

    const exercicioRow = [...exerciciosRepet, ...exerciciosTempo]
    const exercicios = exercicioRow.map(ex => {
      let detalhes
      if(ex.tipo === "R"){
        detalhes = {
          series: ex.series,
          repeticao: ex.repeticao,
          carga: ex.carga,
          observacoes: ex.observacoes
        }
      }else {
        detalhes = {
          tempo: ex.tempo,
          observacoes: ex.observacoes
        }
      }
      const formatado = {
        exercicio_id: ex.exercicio_id,
        // exercicio_nome: ex.nome,
        detalhes
      }
      return formatado
    })


    const final = {
      nome: treino[0].nome,
      aluno_id: treino[0].aluno_id,
      exercicios,
    }

      return response.json(final)
  }
}