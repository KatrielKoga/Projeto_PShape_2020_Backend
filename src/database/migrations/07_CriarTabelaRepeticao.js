exports.up = async function(knex) {
    // CRIAR A TABELA
    return knex.schema.createTable('repeticao', table => {
      table.increments('id').primary();
      table.string('observacoes');
      table.integer('series').notNullable();
      table.integer('repeticao').notNullable();
      table.integer('carga').notNullable();      
    })
  }
  
  exports.down = async function(knex) {
    // VOLTAR ATRAS (DELETAR A TABELA)
    return knex.schema.dropTable('repeticao');
  }