function loadMenu() {
  fetch('/api/menu')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('menu-list');
      list.innerHTML = '';
      data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
          <input type="text" value="${item.name}" id="name-${item.id}" />
          <input type="text" value="${item.description}" id="desc-${item.id}" />
          <input type="number" value="${item.price}" id="price-${item.id}" />
          <button onclick="updateItem('${item.id}')">تعديل</button>
          <button onclick="deleteItem('${item.id}')">حذف</button>
        `;
        list.appendChild(div);
      });
    });
}

document.getElementById('add-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const newItem = {
    id: Date.now().toString(),
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    price: parseFloat(document.getElementById('price').value)
  };

  fetch('/api/menu', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newItem)
  }).then(() => {
    loadMenu();
    e.target.reset();
  });
});

function updateItem(id) {
  const updated = {
    id,
    name: document.getElementById(`name-${id}`).value,
    description: document.getElementById(`desc-${id}`).value,
    price: parseFloat(document.getElementById(`price-${id}`).value)
  };

  fetch(`/api/menu/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updated)
  }).then(() => loadMenu());
}

function deleteItem(id) {
  fetch(`/api/menu/${id}`, { method: 'DELETE' }).then(() => loadMenu());
}

loadMenu();
