document.addEventListener('DOMContentLoaded', () => {
    // --- Sticky Header ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // --- Mobile Menu ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // --- Slider ---
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    // --- FAQ Toggle ---
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            q.parentElement.classList.toggle('active');
        });
    });

    // --- Cart Management ---
    updateCartDisplay();

    // --- Auth Check ---
    const user = JSON.parse(localStorage.getItem('krv_user'));
    const authLinks = document.querySelectorAll('.auth-required');
    authLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (!user) {
                e.preventDefault();
                window.location.href = 'auth.html';
            }
        });
    });
});

// --- Cart Global Functions ---
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('krv_cart') || '[]');
    const countEl = document.getElementById('cartCount');
    if (countEl) countEl.innerText = cart.length;
}

function addToCart(id, name, price) {
    const cart = JSON.parse(localStorage.getItem('krv_cart') || '[]');
    cart.push({ id, name, price, orderId: 'ORD' + Date.now() });
    localStorage.setItem('krv_cart', JSON.stringify(cart));
    updateCartDisplay();
    alert('Service added to cart!');
}

// --- Order Flow Helper ---
function processOrder(orderDetails) {
    const orders = JSON.parse(localStorage.getItem('krv_orders') || '[]');
    const newOrder = {
        id: 'ORD' + Math.floor(Math.random() * 1000000),
        date: new Date().toLocaleDateString(),
        ...orderDetails,
        status: 'Paid'
    };
    orders.push(newOrder);
    localStorage.setItem('krv_orders', JSON.stringify(orders));
    localStorage.removeItem('krv_cart'); // Clear cart
    return newOrder.id;
}
