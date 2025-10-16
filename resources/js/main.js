document.addEventListener('DOMContentLoaded', () => {
  const getWishlist = () => {
    const wishlistJSON = localStorage.getItem('wishlist')
    return wishlistJSON ? JSON.parse(wishlistJSON) : []
  }

  const saveWishlist = (wishlist) => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }

  const wishlistButtons = document.querySelectorAll('.wishlist-btn')

  wishlistButtons.forEach((button) => {
    const productId = button.dataset.productId
    let currentWishlist = getWishlist()

    if (currentWishlist.includes(productId)) {
      button.classList.add('active')
      button.querySelector('i').classList.replace('far', 'fas')
    }

    button.addEventListener('click', () => {
      const heartIcon = button.querySelector('i')
      let wishlist = getWishlist()

      if (wishlist.includes(productId)) {
        wishlist = wishlist.filter((id) => id !== productId)
        button.classList.remove('active')
        heartIcon.classList.replace('fas', 'far')
      } else {
        wishlist.push(productId)
        button.classList.add('active')
        heartIcon.classList.replace('far', 'fas')
      }

      saveWishlist(wishlist)
      console.log('Wishlist diperbarui:', getWishlist())
    })
  })

  // build wishlist
  const wishlistGrid = document.getElementById('wishlist-grid')

  if (wishlistGrid) {
    const wishlistIds = getWishlist()

    wishlistGrid.innerHTML = ''

    if (wishlistIds.length === 0) {
      const emptyMessageHTML = `
        <div class="empty-wishlist-message">
        <h2>Your Wishlist is Empty</h2>
        <p>Looks like you haven't added any items yet. Explore our collection to find something you'll love!</p>
        <a href="/product" class="main-checkout-button">Explore Products</a>
        </div>
    `
      wishlistGrid.innerHTML = emptyMessageHTML
    } else {
      const wishlistedProducts = allProducts.filter((product) => wishlistIds.includes(product.id))
      // template
      wishlistedProducts.forEach((product) => {
        const productCardHTML = `
          <div class="product-card">
            <div class="product-image-container">
              <img src="${product.imageSrc}" alt="${product.imageAlt}" class="product-image" />
            </div>
            <div class="product-info">
              <h3 class="product-name">${product.name}</h3>
              <p class="product-price">Rp ${product.price}</p>
              <div class="product-action">
                <a href="#" class="product-cta">View Details</a>
                <button class="wishlist-btn active" aria-label="Add to wishlist" data-product-id="${product.id}">
                  <i class="fas fa-heart"></i>
                </button>
                <button class="product-cart-btn" aria-label="Add to cart" data-product-id="${product.id}">
                  <i class="fas fa-shopping-cart"></i>
                </button>
              </div>
            </div>
          </div>
        `
        wishlistGrid.insertAdjacentHTML('beforeend', productCardHTML)
      })
    }
  }

  // search logic
  const searchForm = document.getElementById('search-form')
  if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault()
      const searchInput = searchForm.querySelector('.search-input')
      const query = searchInput.value.trim()

      if (query) {
        window.location.href = `/search?q=${encodeURIComponent(query)}`
      }
    })
  }
  // search page result logic
  const searchResultsGrid = document.getElementById('search-results-grid')
  if (searchResultsGrid) {
    const params = new URLSearchParams(window.location.search)
    const query = params.get('q')?.toLowerCase() || ''

    const titleElement = document.getElementById('search-results-title')
    if (query) {
      titleElement.textContent = `Results for "${params.get('q')}"`
    }

    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query)
    )
    // template
    if (filteredProducts.length > 0) {
      filteredProducts.forEach((product) => {
        const productCardHTML = `
          <div class="product-card">
             <div class="product-image-container">
              <img src="${product.imageSrc}" alt="${product.imageAlt}" class="product-image" />
            </div>
            <div class="product-info">
              <h3 class="product-name">${product.name}</h3>
              <p class="product-price">Rp ${product.price}</p>
              <div class="product-action">
                <a href="#" class="product-cta">View Details</a>
                <button class="wishlist-btn" data-product-id="${product.id}">
                  <i class="far fa-heart"></i>
                </button>
                <button class="product-cart-btn" aria-label="Add to cart" data-product-id="${product.id}">
                  <i class="fas fa-shopping-cart"></i>
                </button>
              </div>
            </div>
          </div>
        `
        searchResultsGrid.insertAdjacentHTML('beforeend', productCardHTML)
      })
    } else {
      searchResultsGrid.innerHTML = `
        <div class="empty-wishlist-message">
          <h2>No results found</h2>
          <p>We couldn't find any products matching your search. Please try a different keyword.</p>
          <a href="/product" class="main-checkout-button">View All Products</a>
        </div>
      `
    }
  }
  // transaction page
const getCart = () => {
    const cartJSON = localStorage.getItem('cart');
    return cartJSON ? JSON.parse(cartJSON) : [];
};

const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const cartButtons = document.querySelectorAll('.product-cart-btn');

cartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        if (!productId) return;

        let cart = getCart();
        
        const existingProductIndex = cart.findIndex(item => item.id === productId);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].qty++;
        } else {
            cart.push({ id: productId, qty: 1 });
        }

        saveCart(cart);
        
        console.log('Keranjang diperbarui:', getCart());
        button.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-shopping-cart"></i>';
        }, 1500);
    });
});
// checkout logic

const cartItemsContainer = document.getElementById('cart-items-container');
if (cartItemsContainer) {

    const renderCheckout = () => {
        const cart = getCart();
        const orderTotalContainer = document.getElementById('order-total-container');

        cartItemsContainer.innerHTML = '';
        orderTotalContainer.innerHTML = '';

        if (cart.length > 0) {
            let subtotal = 0;

            cart.forEach(cartItem => {
                const productDetail = allProducts.find(p => p.id === cartItem.id);
                if (!productDetail) return;

                const itemTotal = productDetail.price * cartItem.qty;
                subtotal += itemTotal;

                const itemHTML = `
                    <div class="order-item" data-id="${productDetail.id}">
                        <img src="${productDetail.imageSrc}" alt="${productDetail.imageAlt}">
                        <div class="item-details">
                            <p class="item-name">${productDetail.name}</p>
                            <div class="quantity-selector">
                                <button class="minus" data-id="${productDetail.id}">-</button>
                                <span class="qty">${cartItem.qty}</span>
                                <button class="plus" data-id="${productDetail.id}">+</button>
                            </div>
                        </div>
                        <div class="item-price-group">
                            <p class="item-price">Rp ${itemTotal.toLocaleString('id-ID')}</p>
                            <button class="remove-item" data-id="${productDetail.id}">Remove</button>
                        </div>
                    </div>
                `;
                cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
            });

            const shipping = 20000;
            const total = subtotal + shipping;

            const totalHTML = `
                <div class="total-row">
                    <span>Subtotal</span>
                    <span>Rp ${subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div class="total-row">
                    <span>Shipping</span>
                    <span>Rp ${shipping.toLocaleString('id-ID')}</span>
                </div>
                <div class="total-row grand-total">
                    <span>Total</span>
                    <span>Rp ${total.toLocaleString('id-ID')}</span>
                </div>
            `;
            orderTotalContainer.innerHTML = totalHTML;
        } else {
            cartItemsContainer.innerHTML = '<p style="text-align:center; color: #777;">Your cart is empty.</p>';
        }
    };

    // change quantity
    const updateQuantity = (productId, change) => {
        let cart = getCart();
        const productIndex = cart.findIndex(item => item.id === productId);
        if (productIndex > -1) {
            cart[productIndex].qty += change;
            if (cart[productIndex].qty <= 0) {
                cart.splice(productIndex, 1);
            }
            saveCart(cart);
            renderCheckout();
        }
    };

    const removeItem = (productId) => {
        let cart = getCart();
        const updatedCart = cart.filter(item => item.id !== productId);
        saveCart(updatedCart);
        renderCheckout();
    };
    cartItemsContainer.addEventListener('click', (event) => {
        const target = event.target;
        const productId = target.dataset.id;
        
        if (!productId) return;

        if (target.classList.contains('plus')) {
            updateQuantity(productId, 1);
        } else if (target.classList.contains('minus')) {
            updateQuantity(productId, -1);
        } else if (target.classList.contains('remove-item')) {
            removeItem(productId);
        }
    });

    renderCheckout();
}
})
