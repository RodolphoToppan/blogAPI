const knex = require('../database/knex')

class CommentsController {
  async create(request, response) {
    const { name, email, body } = request.body
    const { postId } = request.params

    await knex('comments').insert({ name, email, body, postId })

    response.json()
  }

  async show(request, response) {
    const { postId } = request.params

    const comments = await knex('comments').select().where('postId', postId)

    return response.json(comments)
  }

  async delete(request, response) {
    const { id } = request.params

    await knex('comments').select().where('id', id).delete()

    return response.json()
  }
}

module.exports = CommentsController
