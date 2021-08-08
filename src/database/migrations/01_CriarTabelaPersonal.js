exports.up = async function(knex) {
    // CRIAR A TABELA
    return knex.schema.createTable('personal', table => {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.string('email').notNullable().unique();
      table.string('senha').notNullable();
    })
}

exports.down = async function(knex) {
    // VOLTAR ATRAS (DELETAR A TABELA)
    return knex.schema.dropTable('personal');
}