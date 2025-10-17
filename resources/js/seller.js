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
});