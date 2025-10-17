document.addEventListener('DOMContentLoaded', () => {
  const getProducts = () => {
    return JSON.parse(localStorage.getItem('products')) || []
  }

  // dashboard page
  const productListTable = document.getElementById('product-list-table')
  if (productListTable) {
    const products = getProducts()
    const tableBody = productListTable.querySelector('tbody')
    tableBody.innerHTML = ''

    products.forEach((product) => {
      const row = `
        <tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>Rp ${product.price.toLocaleString('id-ID')}</td>
        </tr>
      `
      tableBody.insertAdjacentHTML('beforeend', row)
    })
  }
  // add product
  const addProductForm = document.getElementById('add-product-form')
  if (addProductForm) {
    addProductForm.addEventListener('submit', (event) => {
      event.preventDefault()

      const products = getProducts()

      const newProduct = {
        id: Date.now().toString(),
        name: document.getElementById('productName').value,
        price: parseInt(document.getElementById('productPrice').value),
        imageSrc: document.getElementById('productImage').value,
      }

      products.push(newProduct)

      saveProducts(products)

      alert('Product has been added successfully!')

      window.location.href = '/seller/dashboard'
    })
  }
  // wishlist
  const analyticsList = document.getElementById('wishlist-analytics-list')
  if (analyticsList) {
    const analyticsData = JSON.parse(localStorage.getItem('wishlistAnalytics')) || {}
    const products = getProducts()

    analyticsList.innerHTML = ''
    const sortedAnalytics = Object.entries(analyticsData).sort(
      ([, countA], [, countB]) => countB - countA
    )

    if (sortedAnalytics.length === 0) {
      analyticsList.innerHTML = '<li>No wishlist data has been recorded yet.</li>'
    } else {
      sortedAnalytics.forEach(([productId, count]) => {
        const product = products.find((p) => p.id === productId)
        if (product) {
          const listItem = `<li><strong>${product.name}:</strong> Wishlisted ${count} times</li>`
          analyticsList.insertAdjacentHTML('beforeend', listItem)
        }
      })
    }
  }
})
