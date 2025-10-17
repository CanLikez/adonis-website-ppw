import type { HttpContext } from '@adonisjs/core/http'

export default class SellerDashboardController {
  public async dashboard({ view }: HttpContext) {
    return view.render('pages/seller/dashboard')
  }

  public async showAddProduct({ view }: HttpContext) {
    return view.render('pages/seller/addProduct')
  }

  public async showAllWishlist({ view }: HttpContext) {
    return view.render('pages/seller/wishlistView')
  }
}
