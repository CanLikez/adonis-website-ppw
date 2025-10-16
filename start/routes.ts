/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
const ProductsController = () => import('#controllers/products_controller')
const SearchController = () => import('#controllers/search_controller')
const WishlistsController = () => import('#controllers/wishlists_controller')
const CheckoutsController = () => import('#controllers/checkout_controller')

router.on('/').render('pages/user/home')
router.on('/about').render('pages/user/about')
router.on('/login').render('pages/login')
router.on('/contact').render('pages/user/contact')

router.get('/product', [ProductsController, 'index'])
router.get('/wishlistUser', [WishlistsController, 'show'])
router.get('/search', [SearchController, 'show'])
router.get('/checkout', [CheckoutsController, 'show'])
