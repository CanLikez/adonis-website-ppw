/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.on('/').render('pages/user/home')
router.on('/product').render('pages/user/product')
router.on('/about').render('pages/user/about')
router.on('/checkout').render('pages/user/checkout')
