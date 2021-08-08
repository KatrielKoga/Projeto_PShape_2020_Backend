exports.up = async function(knex) {
    // CRIAR A TABELA
    return knex.schema.createTable('exercicio', table => {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.string('maquina');
      table.specificType('tipo', 'char(1)').notNullable();     
      table.integer('personal_id').references('id').inTable('personal').notNullable().unsigned().onDelete('CASCADE');
    })
  }
  
  exports.down = async function(knex) {
    // VOLTAR ATRAS (DELETAR A TABELA)
    return knex.schema.dropTable('exercicio');
  }