exports.up = async function(knex) {
    // CRIAR A TABELA
    return knex.schema.createTable('aluno_treino', table => {
      table.increments('id').primary();
      table.integer('aluno_id').references('id').inTable('aluno').notNullable().unsigned();
      table.integer('treino_id').references('id').inTable('treino').notNullable().unsigned();
      table.date('data').notNullable();

    })
}

exports.down = async function(knex) {
    // VOLTAR ATRAS (DELETAR A TABELA)
    return knex.schema.dropTable('aluno_treino');
}