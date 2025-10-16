import type { HttpContext } from '@adonisjs/core/http'

export default class SellerDashboardController {
  public async dashboard({ view }: HttpContext) {
    return view.render('pages/seller/dashboard')
  }

  public async showAddForm({ view }: HttpContext) {
    return view.render('pages/seller/add_product')
  }

  public async showWishlistAnalytics({ view }: HttpContext) {
    return view.render('pages/seller/wishlist_analytics')
  }
}
