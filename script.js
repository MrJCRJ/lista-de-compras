function toggleBought(id) {
  items = items.map((item) =>
    item.id === id ? { ...item, bought: !item.bought } : item
  );
  localStorage.setItem("items", JSON.stringify(items));
  renderItems();
}

function deleteItem(id) {
  items = items.filter((item) => item.id !== id);
  localStorage.setItem("items", JSON.stringify(items));
  renderItems();
}

function renderItems() {
  const itemList = document.getElementById("items");
  itemList.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <img src="${item.image}" alt="${
      item.name
    }" style="width: 50px; height: 50px;">
        <strong>${item.name}</strong> - ${item.category} (R$${item.price})
        <a href="${item.link}" target="_blank">Ver Produto</a>
      </div>
      <button onclick="deleteItem(${item.id})">Deletar</button>
      <button onclick="toggleBought(${item.id})">
        ${item.bought ? "Não Comprado" : "Comprado"}
      </button>
    `;
    itemList.appendChild(li);
  });
}

let items = JSON.parse(localStorage.getItem("items")) || [];

document.getElementById("item-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Capturar valores do formulário
  const name = document.getElementById("item-name").value;
  const category = document.getElementById("item-category").value;
  const price = document.getElementById("item-price").value;
  const link = document.getElementById("item-link").value;
  const image = document.getElementById("item-image").value;

  // Criar novo item
  const item = {
    id: Date.now(),
    name,
    category,
    price,
    link,
    image,
    bought: false,
  };

  // Salvar no array e LocalStorage
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));

  // Atualizar a lista
  renderItems();

  // Limpar formulário
  document.getElementById("item-form").reset();
});

// Inicializar a lista ao carregar a página
renderItems();
