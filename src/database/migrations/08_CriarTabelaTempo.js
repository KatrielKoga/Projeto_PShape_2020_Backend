exports.up = async function(knex) {
    // CRIAR A TABELA
    return knex.schema.createTable('tempo', table => {
      table.increments('id').primary();
      table.string('observacoes');
      table.integer('tempo').notNullable();    
    })
  }
  
  exports.down = async function(knex) {
    // VOLTAR ATRAS (DELETAR A TABELA)
    return knex.schema.dropTable('tempo');
  }