exports.up = knex =>
  knex.schema.createTable('posts', table => {
    table.integer('userId').references('id').inTable('users')
    table.increments('id')
    table.text('title')
    table.text('body')
  })

exports.down = knex => knex.schema.dropTable('posts')
