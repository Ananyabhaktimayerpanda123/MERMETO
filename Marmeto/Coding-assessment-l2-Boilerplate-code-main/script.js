console.log("====================================");
console.log("Connected");
console.log("====================================");

// Fetch cart data from the JSON API
async function fetchCartData() {
  const response = await fetch(
    "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889i"
  ); // Replace with the actual API URL
  const data = await response.json();
  populateCart(data);
}

function populateCart(data) {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  data.items.forEach((item) => {
    const subtotal = (item.price / 100) * item.quantity;

    const row = document.createElement("tr");
    row.innerHTML = `
            <td class="sofa"><img src="${item.image}" alt="${
      item.title
    }" /></td>
            <td class="rate">${item.title}</td>
            <td class="rate">₹${(item.price / 100).toLocaleString()}</td>
            <td>
              <input
                class="quantity-input"
                type="number"
                value="${item.quantity}"
                min="1"
                onchange="updateQuantity(this, ${item.id})"
              />
            </td>
            <td class="subtotal">₹${subtotal.toLocaleString()}</td>
            <td>
              <span
                class="trash-icon"
                onclick="removeItem(${item.id})"
                title="Remove Item"
              >
                <i class="fa-solid fa-trash"></i>
              </span>
            </td>
          `;
    cartItemsContainer.appendChild(row);
  });

  updateCartTotals(data);
}

async function updateQuantity(input, itemId) {
  const newQuantity = parseInt(input.value);

  fetchCartData();
}

async function removeItem(itemId) {
  fetchCartData();
}

// Update cart totals dynamically
function updateCartTotals(data) {
  const subtotal = data.items.reduce(
    (sum, item) => sum + (item.price / 100) * item.quantity,
    0
  );

  document.getElementById(
    "cart-subtotal"
  ).textContent = `₹${subtotal.toLocaleString()}`;
  document.getElementById(
    "cart-total"
  ).textContent = `₹${subtotal.toLocaleString()}`;
}

// Initialize cart data on page load
fetchCartData();
