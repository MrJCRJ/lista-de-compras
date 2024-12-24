// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDutFQP9_45moJ-UClqkFyrfzywT4A3yBE",
  authDomain: "lista-de-compras-b515d.firebaseapp.com",
  projectId: "lista-de-compras-b515d",
  storageBucket: "lista-de-compras-b515d.firebasestorage.app",
  messagingSenderId: "355940573912",
  appId: "1:355940573912:web:b125673829e7db08b3edad",
};

// Inicializar o Firebase
firebase.initializeApp(firebaseConfig);

// Referência ao Firestore
const db = firebase.firestore();

function toggleBought(id, currentStatus) {
  db.collection("products")
    .doc(id)
    .update({
      bought: !currentStatus,
    })
    .then(() => {
      renderItems();
    })
    .catch((error) => {
      console.error("Erro ao atualizar status: ", error);
    });
}

function deleteItem(id) {
  db.collection("products")
    .doc(id)
    .delete()
    .then(() => {
      alert("Produto deletado com sucesso!");
      renderItems();
    })
    .catch((error) => {
      console.error("Erro ao deletar produto: ", error);
    });
}

function renderItems() {
  const itemList = document.getElementById("items");
  itemList.innerHTML = "";

  db.collection("products")
    .orderBy("createdAt", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const item = doc.data();
        const id = doc.id;

        const li = document.createElement("li");
        li.innerHTML = `
        <div>
          <img src="${item.image}" alt="${
          item.name
        }" style="width: 50px; height: 50px;">
          <strong>${item.name}</strong> - ${
          item.category
        } (R$${item.price.toFixed(2)})
          <a href="${item.link}" target="_blank">Ver Produto</a>
        </div>
        <button onclick="deleteItem('${id}')">Deletar</button>
        <button onclick="toggleBought('${id}', ${item.bought})">
          ${item.bought ? "Não Comprado" : "Comprado"}
        </button>
      `;
        itemList.appendChild(li);
      });
    });
}

document.getElementById("item-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Capturar valores do formulário
  const name = document.getElementById("item-name").value;
  const category = document.getElementById("item-category").value;
  const price = document.getElementById("item-price").value;
  const link = document.getElementById("item-link").value;
  const image = document.getElementById("item-image").value;

  db.collection("products")
    .add({
      name: name,
      category: category,
      price: parseFloat(price),
      link: link,
      image: image,
      bought: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      alert("Produto adicionado com sucesso!");
      renderItems(); // Atualiza a lista de itens
      document.getElementById("item-form").reset();
    })
    .catch((error) => {
      console.error("Erro ao adicionar produto: ", error);
    });

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

  // Atualizar a lista
  renderItems();

  // Limpar formulário
  document.getElementById("item-form").reset();
});

// Inicializar a lista ao carregar a página
renderItems();
