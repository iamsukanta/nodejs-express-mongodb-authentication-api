const express = require('express')
const router = express.Router()
const usersapiAction = require('../actions/usersapi.action')
const userMiddleware = require('../middlewares/user.middleware.js')

router.post('/create', usersapiAction.create)
	.post('/login', usersapiAction.login)
	.get('/me', userMiddleware.checkToken, usersapiAction.me)
	.get('/refresh', userMiddleware.checkToken, usersapiAction.refresh)
	.get('/', userMiddleware.checkToken, usersapiAction.list)
	.put('/:id', userMiddleware.checkToken, usersapiAction.update)
	.delete('/:id', userMiddleware.checkToken, usersapiAction.destroy)

module.exports = router
