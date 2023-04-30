const { Router } = require('express')

const PostsController = require('../controllers/PostsController')

const postsRoutes = Router()

const postsController = new PostsController()

postsRoutes.post('/:userId', postsController.create)
postsRoutes.get('/:userId', postsController.show)
postsRoutes.get('/:id', postsController.show)
postsRoutes.get('/', postsController.show)
postsRoutes.delete('/:id', postsController.delete)

module.exports = postsRoutes
