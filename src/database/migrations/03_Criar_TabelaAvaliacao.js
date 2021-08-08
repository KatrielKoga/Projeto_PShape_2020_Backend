exports.up = async function(knex) {
    // CRIAR A TABELA
    return knex.schema.createTable('avaliacao', table => {
      table.increments('id').primary();
      table.integer('aluno_id').references('id').inTable('alunos').notNullable().unsigned().onDelete('CASCADE');
      table.date('data_avaliacao').notNullable();
      table.float('altura').notNullable();
      table.float('peso').notNullable();
      table.float('dobra_tricipal').notNullable();
      table.float('dobra_bicipal').notNullable();
      table.float('dobra_toracica').notNullable();
      table.float('dobra_panturrilha').notNullable();
      table.float('dobra_abdominal').notNullable();
      table.float('dobra_coxa').notNullable();
      table.float('dobra_subescapular').notNullable();
      table.float('dobra_supra_iliaca').notNullable();
      table.float('dobra_axilar').notNullable();
      table.binary('foto');
    })
  }
  
  exports.down = async function(knex) {
    // VOLTAR ATRAS (DELETAR A TABELA)
    return knex.schema.dropTable('avaliacao');
  }