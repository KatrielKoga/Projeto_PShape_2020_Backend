exports.up = async function(knex) {
  // CRIAR A TABELA
  return knex.schema.table('alunos', function (table) {
    table.integer('ativo').defaultTo(1)
  })     
  
}

exports.down = async function(knex) {
  // VOLTAR ATRAS (DELETAR A TABELA)
  return knex.schema.table('alunos', function (table) {
    table.dropColumn('ativo')
  })   
}