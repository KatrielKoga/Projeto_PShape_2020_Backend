exports.up = async function(knex) {
  // CRIAR A TABELA
  return knex.schema.createTable('alunos', table => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('observacoes');
    table.string('objetivo');
    table.specificType('sexo', 'char(1)').notNullable();
    table.specificType('telefone', 'char(11)');
    table.specificType('whatsapp', 'char(14)');
    table.integer('personal_id').references('id').inTable('personal').notNullable().unsigned().onDelete('CASCADE');
    table.date('data_nasc').notNullable();  
  })
}

exports.down = async function(knex) {
  // VOLTAR ATRAS (DELETAR A TABELA)
  return knex.schema.dropTable('alunos');
}