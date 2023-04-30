const { Router } = require('express')

const CommentsController = require('../controllers/CommentsController')

const commentsRoutes = Router()

const commentsController = new CommentsController()

commentsRoutes.post('/:postId', commentsController.create)
commentsRoutes.get('/:postId', commentsController.show)
commentsRoutes.delete('/:id', commentsController.delete)

module.exports = commentsRoutes
