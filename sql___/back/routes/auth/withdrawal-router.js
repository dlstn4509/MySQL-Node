const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { alert } = require('../../modules/util')
const { isUser, isGuest } = require('../../middlewares/auth-mw')

router.get('/', isUser, (req, res, next) => {
	req.app.locals.PAGE = 'WITHDRAWAL'
	req.app.locals.js = 'auth/withdrawal'
	req.app.locals.css = 'auth/withdrawal'
	req.app.locals.info = null
	res.status(200).render('auth/withdrawal')
})

router.post('/', async (req, res, next) => {
	try {
		const r = await createUser(req.body)
		if(r) res.redirect('/')
		else res.send(alert(ERROR.SQL_ERROR))
	}
	catch(err) {
		next(createError(err))
	}
})

module.exports = router