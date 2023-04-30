exports.up = knex =>
  knex.schema.createTable('comments', table => {
    table
      .integer('postId')
      .references('id')
      .inTable('posts')
      .onDelete('CASCADE')
    table.increments('id')
    table.text('name')
    table.text('email')
    table.text('body')
  })

exports.down = knex => knex.schema.dropTable('comments')
