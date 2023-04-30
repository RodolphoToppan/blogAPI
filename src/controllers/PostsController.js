const knex = require('../database/knex')

class PostsController {
  async create(request, response) {
    const { title, body } = request.body
    const { userId } = request.params

    await knex('posts').insert({ title, body, userId })

    response.json()
  }

  async show(request, response) {
    const { id, userId } = request.params

    if (userId) {
      const userPosts = await knex('posts').select().where('userId', userId)

      return response.json(userPosts)
    }

    if (!id) {
      const posts = await knex('posts').select()

      return response.json(posts)
    }

    const post = await knex('posts').select().where('id', id)

    return response.json(post)
  }

  async delete(request, response) {
    const { id } = request.params

    await knex('posts').where('id', id).delete()

    return response.json()
  }
}

module.exports = PostsController
