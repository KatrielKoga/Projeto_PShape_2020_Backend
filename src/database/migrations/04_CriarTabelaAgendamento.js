exports.up = async function(knex) {
    // CRIAR A TABELA
    return knex.schema.createTable('agendamento', table => {
      table.increments('id').primary();
      table.string('observacoes');
      table.datetime('data_hora_agendamento').notNullable();
      table.datetime('data_hora_execucao');
      table.specificType('tipo', 'char(1)').notNullable();
      table.integer('personal_id').references('id').inTable('personal').notNullable().unsigned().onDelete('CASCADE');
      table.integer('aluno_id').references('id').inTable('alunos').notNullable().unsigned().onDelete('CASCADE');
    })
  }
  
  exports.down = async function(knex) {
    // VOLTAR ATRAS (DELETAR A TABELA)
    return knex.schema.dropTable('agendamento');
  }