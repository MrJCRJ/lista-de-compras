document.getElementById("item-form").addEventListener("submit", function(e) {
  e.preventDefault();

  // Capturar valores do formulário
  const name = document.getElementById("item-name").value;
  const category = document.getElementById("item-category").value;
  const price = document.getElementById("item-price").value;

  // Criar novo item
  const item = document.createElement("li");
  item.innerHTML = `<strong>${name}</strong> - ${category} (R$${price})`;

  // Adicionar ao DOM
  document.getElementById("items").appendChild(item);

  // Limpar o formulário
  document.getElementById("item-form").reset();
});
