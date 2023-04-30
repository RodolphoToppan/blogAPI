const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')
const knex = require('../database/knex')

class UsersController {
  async create(request, response) {
    const { name, username, email, password } = request.body
    const hashedPassword = await hash(password, 8)

    if (!name) {
      throw new AppError('O nome é obrigatório')
    }

    const [checkEmailExists] = await knex('users')
      .select()
      .where('email', email)

    if (checkEmailExists) {
      throw new AppError('Usuário já está cadastrado')
    }

    await knex('users').insert({
      name,
      username,
      email,
      password: hashedPassword
    })

    response.status(201).json()
  }

  async update(request, response) {
    const { name, username, email, password, oldPassword } = request.body
    const { id } = request.params

    const [user] = await knex('users').select().where('id', id)
    if (!user) {
      throw new AppError('Usuário não encontrado')
    }

    const [userWithEmailUpdated] = await knex('users')
      .select()
      .where('email', email || null)

    if (userWithEmailUpdated && userWithEmailUpdated.id !== user.id) {
      throw new AppError('Esse e-mail já está em uso')
    }

    const [userWithUsernameUpdated] = await knex('users')
      .select()
      .where('username', username || null)

    if (userWithUsernameUpdated && userWithUsernameUpdated.id !== user.id) {
      throw new AppError('Esse username já está em uso')
    }
    user.name = name ?? user.name
    user.email = email ?? user.email
    user.username = username ?? user.username

    if (password && !oldPassword) {
      throw new AppError('Digite a senha antiga')
    }

    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password)
      if (!checkOldPassword) {
        throw new AppError('A senha antiga não confere')
      }
      user.password = await hash(password, 8)
    }

    await knex('users')
      .where('id', id)
      .update({ name: user.name, email: user.email, password: user.password })

    return response.json()
  }

  async show(request, response) {
    const { id } = request.params

    if (!id) {
      const users = await knex('users').select()

      return response.json(users)
    }

    const user = await knex('users').select().where('id', id)

    return response.json(user)
  }
}

module.exports = UsersController
