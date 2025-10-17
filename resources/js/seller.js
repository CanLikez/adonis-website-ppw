document.addEventListener('DOMContentLoaded', () => {
  const getProducts = () => {
    return JSON.parse(localStorage.getItem('products')) || [];
  };

// dashboard page
  const productListTable = document.getElementById('product-list-table');
  if (productListTable) {
    const products = getProducts();
    const tableBody = productListTable.querySelector('tbody');
    tableBody.innerHTML = '';

    products.forEach(product => {
      const row = `
        <tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>Rp ${product.price.toLocaleString('id-ID')}</td>
        </tr>
      `;
      tableBody.insertAdjacentHTML('beforeend', row);
    });
  }
// add product
const addProductForm = document.getElementById('add-product-form');
if (addProductForm) {
  addProductForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const products = getProducts();

    const newProduct = {
      id: Date.now().toString(),
      name: document.getElementById('productName').value,
      price: parseInt(document.getElementById('productPrice').value),
      imageSrc: document.getElementById('productImage').value,
    };

    products.push(newProduct);

    saveProducts(products);

    alert('Product has been added successfully!');
    
    window.location.href = '/seller/dashboard';
  });
}
});