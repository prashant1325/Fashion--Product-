// Set the API URL for your deployed backend
const API_URL = 'https://fashion-product-6fnr.vercel.app';

// Load products from backend
async function loadProducts() {
  try {
    const res = await fetch(`${API_URL}/api/products`);
    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    const el = document.getElementById('products'); 
    if (!el) return;

    el.innerHTML = '';
    data.forEach(p => {
      const d = document.createElement('div'); 
      d.className = 'card';
      d.innerHTML = `
        <h3>${p.title}</h3>
        <p>${p.description || ''}</p>
        <p>Seller: ${p.seller.name}</p>
        <p>Price: ₹${p.price}</p>
        <button onclick="view('${p._id}')">View</button>
      `;
      el.appendChild(d);
    });
  } catch (err) {
    console.error(err);
    alert("Unable to load products at the moment.");
  }
}

// View product details
function view(id) { 
  window.location = 'index.html#' + id; 
}

// Sell form submission
document.getElementById('sellForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) { 
    alert('Please login to sell'); 
    window.location = 'login.html'; 
    return; 
  }

  const f = new FormData(e.target);
  const body = { 
    title: f.get('title'), 
    price: Number(f.get('price')), 
    description: f.get('description'), 
    image: f.get('image') 
  };

  try {
    const res = await fetch(`${API_URL}/api/products`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
        Authorization: 'Bearer ' + token
      }, 
      body: JSON.stringify(body)
    });

    const data = await res.json();
    if (res.ok){ 
      alert('Submitted for approval'); 
      e.target.reset(); 
    } else {
      alert(data.msg || 'Error submitting product');
    }
  } catch (err) {
    console.error(err);
    alert('Server error. Please try again later.');
  }
});

// Initial load
loadProducts();
