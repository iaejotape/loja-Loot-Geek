// ========================================
// LOOT GEEK - GAME STORE (Bootstrap Version)
// JavaScript Functionality
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const searchInput = document.getElementById("searchInput");
  const cartCount = document.getElementById("cartCount");
  const filterBtns = document.querySelectorAll(".btn-filter");
  const wishlistBtns = document.querySelectorAll(".btn-wishlist");
  const addCartBtns = document.querySelectorAll(".btn-add-cart");

  let cartItems = 0;

  // ========================================
  // FILTER BUTTONS
  // ========================================
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // ========================================
  // WISHLIST TOGGLE
  // ========================================
  wishlistBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const icon = btn.querySelector("i");

      if (icon.classList.contains("bi-heart")) {
        icon.classList.remove("bi-heart");
        icon.classList.add("bi-heart-fill");
        btn.classList.add("active");
        showToast("Adicionado aos favoritos.");
      } else {
        icon.classList.remove("bi-heart-fill");
        icon.classList.add("bi-heart");
        btn.classList.remove("active");
        showToast("Removido dos favoritos");
      }
    });
  });

  // ========================================
  // ADD TO CART
  // ========================================
  addCartBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const originalHTML = btn.innerHTML;

      // Update button state
      btn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Adicionado!';
      btn.classList.add("added");

      // Update cart count
      cartItems++;
      if (cartCount) {
        cartCount.textContent = cartItems;
      }

      showToast("Produto adicionado ao carrinho.");

      // Reset button after delay
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.classList.remove("added");
      }, 2000);
    });
  });

  // ========================================
  // SEARCH FUNCTIONALITY
  // ========================================
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      const productItems = document.querySelectorAll(".product-item");

      productItems.forEach((item) => {
        const name =
          item.querySelector(".product-name")?.textContent.toLowerCase() || "";
        const category =
          item.querySelector(".product-category")?.textContent.toLowerCase() ||
          "";

        if (name.includes(searchTerm) || category.includes(searchTerm)) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });
  }

  // ========================================
  // TOAST NOTIFICATION
  // ========================================
  function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector(".toast-notification");
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("is-hiding");
      setTimeout(() => toast.remove(), 200);
    }, 3000);
  }
});
