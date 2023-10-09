const slider = document.querySelector(".slider");
const images = slider.querySelectorAll("img");
let currentIndex = 0;

const itemCountElement = document.getElementById("item-count");

// Slider 
function showSlide(index) {
  images.forEach((image, i) => {
    if (i === index) {
      image.style.display = "block";
    } else {
      image.style.display = "none";
    }
  });
}

function autoSlide() {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showSlide(currentIndex);
  }, 2000); 
}

showSlide(currentIndex);
autoSlide();

//------------------------------------------------
const products = [
  {
    name: "Woman Watch",
    category: "Watches",
    imageUrl: "../img/1.webp",
    price: 70,
  },
  {
    name: "Woman Watch",
    category: "Watches",
    imageUrl: "../img/2.webp",
    price: 30,
  },
  {
    name: "Men Watch",
    category: "Watches",
    imageUrl: "../img/3.webp",
    price: 40,
  },
  {
    name: "Men Watch",
    category: "Watches",
    imageUrl: "../img/4.webp",
    price: 50,
  },
  {
    name: "Red Dress",
    category: "Clothing",
    imageUrl: "../img/1d.webp",
    price: 190,
  },
  {
    name: "Green Dress",
    category: "Clothing",
    imageUrl: "../img/2d.webp",
    price: 120.5,
  },
  {
    name: "White Dress",
    category: "Clothing",
    imageUrl: "../img/3d.webp",
    price: 99.99,
  },
  {
    name: "Spring Dress",
    category: "Clothing",
    imageUrl: "../img/4d.webp",
    price: 150,
  },
  {
    name: "Princess Shoe",
    category: "Shoes",
    imageUrl: "../img/1s.jpg",
    price: 100,
  },
  {
    name: "High Heel Shoe",
    category: "Shoes",
    imageUrl: "../img/2s.jpg",
    price: 30.99,
  },
  {
    name: "Boot",
    category: "Shoes",
    imageUrl: "../img/3s.jpg",
    price: 25,
  },
  {
    name: "Colorful Shoe",
    category: "Shoes",
    imageUrl: "../img/4s.jpg",
    price: 20.5,
  },

  {
    name: "Eye Shadow",
    category: "Makeup",
    imageUrl: "../img/1m.webp",
    price: 13.5,
  },

  {
    name: "High Lighter",
    category: "Makeup",
    imageUrl: "../img/2m.jpg",
    price: 12,
  },

  {
    name: "Mascara",
    category: "Makeup",
    imageUrl: "../img/3p.jpg",
    price: 8,
  },

  {
    name: "Lop Stick",
    category: "Makeup",
    imageUrl: "../img/4m.jpg",
    price: 5,
  },
];

//-------------------------------------------------------------
// Filteration 
function filterProducts(category) {
  const productSection = document.querySelector(".product-section");
  productSection.innerHTML = "";

  if (category === "All") {
    products.forEach((product, index) => displayProduct(product, index));
  } else {
    const filteredProducts = products.filter(
      (product) => product.category === category
    );
    filteredProducts.forEach((product) => displayProduct(product));
  }
}

//Create and append on tags
function displayProduct(product, index) {
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");

  const image = document.createElement("img");
  image.src = product.imageUrl;
  image.alt = product.name;

  const productName = document.createElement("p");
  productName.textContent = product.name;

  const productPrice = document.createElement("p");
  productPrice.textContent = `$${product.price.toFixed(2)}`;

 
  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Add to Cart";
  addToCartButton.setAttribute("data-index", index);
  addToCartButton.addEventListener("click", addToCartHandler);

  productCard.appendChild(image);
  productCard.appendChild(productName);
  productCard.appendChild(productPrice);
  productCard.appendChild(addToCartButton);

  const productSection = document.querySelector(".product-section");
  productSection.appendChild(productCard);
}

// Add event listener to the dropdown menu
const categoryDropdown = document.getElementById("categoryDropdown");
categoryDropdown.addEventListener("change", () => {
  const selectedCategory = categoryDropdown.value;
  filterProducts(selectedCategory);
});

// Initialize with "All" category selected
filterProducts("All");

// Initialize an empty shopping cart
const shoppingCart = [];

// Function to add a product to the shopping cart
function addToCart(product) {
  shoppingCart.push(product);
  updateCart();
  // Store the updated cart in local storage
  localStorage.setItem("cart", JSON.stringify(shoppingCart));
}

// Function to handle "Add to Cart" button click
function addToCartHandler(event) {
  const productIndex = event.target.getAttribute("data-index");
  const selectedProduct = products[productIndex];
  addToCart(selectedProduct);
  openCartModal(); // Open the cart modal when adding a product
}

// Function to update the cart display
function updateCart() {
  const cartContainer = document.querySelector(".cart-container");
  cartContainer.innerHTML = "";

  let total = 0;

  shoppingCart.forEach((product, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    const itemImage = document.createElement("img");
    itemImage.src = product.imageUrl; // Set the image source
    itemImage.alt = product.name; // Set the alt text for the image
    cartItem.appendChild(itemImage);

    const itemName = document.createElement("span");
    itemName.textContent = product.name;

    const itemPrice = document.createElement("span");
    itemPrice.textContent = `$${product.price.toFixed(2)}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeFromCart(index));

    cartItem.appendChild(itemName);
    cartItem.appendChild(itemPrice);
    cartItem.appendChild(removeButton);

    cartContainer.appendChild(cartItem);

    total += product.price;
  });

  itemCountElement.textContent = shoppingCart.length;

  // Display the total price
  const totalContainer = document.querySelector(".total-container");
  totalContainer.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to remove an item from the cart
function removeFromCart(index) {
  shoppingCart.splice(index, 1);
  updateCart();
}

// Add event listener to the close button
const closeCartButton = document.querySelector(".close-cart-modal");
closeCartButton.addEventListener("click", closeCartModal);

// Function to open the cart modal
function openCartModal() {
  const cartModal = document.querySelector(".cart-modal");
  cartModal.classList.add("show");
}

// Function to close the cart modal
function closeCartModal() {
  const cartModal = document.querySelector(".cart-modal");
  cartModal.classList.remove("show");
}

const cartIcon = document.getElementById("cart-icon");
cartIcon.addEventListener("click", openCartModal);

// Initialize the cart from local storage if available
const storedCart = localStorage.getItem("cart");
if (storedCart) {
  shoppingCart.push(...JSON.parse(storedCart));
  updateCart();
}

// Get a reference to the scroll-to-top button
const scrollToTopButton = document.getElementById("scrollToTopBtn");

// Add a click event listener to the button
scrollToTopButton.addEventListener("click", () => {
  // Scroll to the top of the page smoothly
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", () => {
 
  if (window.scrollY >= 500) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
});
