async function loadProducts(){
  const res = await fetch('http://localhost:5000/api/products');
  const data = await res.json();
  const el = document.getElementById('products'); if(!el) return;
  el.innerHTML='';
  data.forEach(p=>{
    const d = document.createElement('div'); d.className='card';
    d.innerHTML = `<h3>${p.title}</h3><p>${p.description||''}</p><p>Seller: ${p.seller.name}</p><p>Price: ₹${p.price}</p>
      <button onclick="view('${p._id}')">View</button>`;
    el.appendChild(d);
  });
}
function view(id){ window.location = 'index.html#'+id; }

document.getElementById('sellForm')?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const token = localStorage.getItem('token');
  if(!token){ alert('Please login to sell'); window.location='login.html'; return; }
  const f = new FormData(e.target);
  const body = { title:f.get('title'), price: Number(f.get('price')), description: f.get('description'), image: f.get('image') };
  const res = await fetch('http://localhost:5000/api/products', {method:'POST', headers:{'Content-Type':'application/json', Authorization: 'Bearer '+token}, body: JSON.stringify(body)});
  const data = await res.json();
  if(res.ok){ alert('Submitted for approval'); e.target.reset(); } else alert(data.msg||'Error');
});

loadProducts();
