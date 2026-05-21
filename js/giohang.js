const cartKey = 'cart';
const cartItemsBody = document.getElementById('cart-items');
const cartEmpty = document.getElementById('cart-empty');
const cartSummary = document.getElementById('cart-summary');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchForm = document.querySelector('.frm_search');

function getCart() {
    return JSON.parse(localStorage.getItem(cartKey)) || [];
}

function saveCart(cart) {
    localStorage.setItem(cartKey, JSON.stringify(cart));
}

function parsePrice(priceString) {
    const numberString = priceString.replace(/[^0-9]/g, '');
    return Number(numberString) || 0;
}

function formatPrice(value) {
    return value.toLocaleString('vi-VN') + '₫';
}

function renderCart() {
    const cart = getCart();
    cartItemsBody.innerHTML = '';

    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartSummary.style.display = 'none';
        return;
    }

    cartEmpty.style.display = 'none';
    cartSummary.style.display = 'block';

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        const itemTotal = parsePrice(item.price) * item.quantity;
        total += itemTotal;
        count += item.quantity;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="cart-product">
                <div class="cart-product-image">
                    <img src="${item.image}" alt="${item.name}" width="90">
                </div>
                <div class="cart-product-name">${item.name}</div>
            </td>
            <td>${item.price}</td>
            <td>
                <div class="cart-quantity">
                    <button class="qty-btn" data-action="decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
                </div>
            </td>
            <td>${formatPrice(itemTotal)}</td>
            <td>
                <button class="btn-remove" data-id="${item.id}">Xóa</button>
            </td>
        `;

        cartItemsBody.appendChild(row);
    });

    cartCount.innerText = count;
    cartTotal.innerText = formatPrice(total);
}

function updateQuantity(productId, delta) {
    const cart = getCart();
    const item = cart.find(x => x.id === productId);
    if (!item) return;

    item.quantity = Math.max(1, item.quantity + delta);
    saveCart(cart);
    renderCart();
}

function removeItem(productId) {
    const cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
    renderCart();
}

function clearCart() {
    localStorage.removeItem(cartKey);
    renderCart();
}

function handleSearch(event) {
    if (event) {
        event.preventDefault();
    }
    const keyword = searchInput.value.trim();
    if (keyword) {
        window.location.href = `danhsachSP.html?search=${encodeURIComponent(keyword)}`;
    }
}

if (cartItemsBody) {
    cartItemsBody.addEventListener('click', function (event) {
        const button = event.target.closest('button');
        if (!button) return;

        const productId = button.dataset.id;
        const action = button.dataset.action;
        if (action === 'increase') {
            updateQuantity(productId, 1);
        } else if (action === 'decrease') {
            updateQuantity(productId, -1);
        } else if (button.classList.contains('btn-remove')) {
            removeItem(productId);
        }
    });
}

if (clearCartBtn) {
    clearCartBtn.addEventListener('click', function () {
        clearCart();
    });
}

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function () {
        const cart = getCart();
        if (cart.length === 0) {
            alert('Giỏ hàng của bạn đang trống.');
            return;
        }
        alert('Cảm ơn bạn! Đơn hàng của bạn đã được gửi.');
        clearCart();
    });
}

if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
}

if (searchBtn) {
    searchBtn.addEventListener('click', handleSearch);
}

if (searchInput) {
    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            handleSearch(event);
        }
    });
}

renderCart();
