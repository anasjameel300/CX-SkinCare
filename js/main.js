/**
 * WeCare - Premium Botanical Skincare
 * 
 * Centralized State, Dynamic Rendering, and User Experience.
 */

const PRODUCTS = [
    { id: 'cleanser-1', name: 'Botanical Cleanser', price: 1049.00, img: 'assets/products/cleanser.png', desc: 'Gentle daily purification.' },
    { id: 'serum-1', name: 'Hydrating Serum', price: 1749.00, img: 'assets/products/serum.png', desc: 'Deep moisture replenishment.' },
    { id: 'cream-1', name: 'Night Recovery Cream', price: 2299.00, img: 'assets/products/cream.png', desc: 'Overnight cellular support.' },
    { id: 'oil-1', name: 'Antioxidant Oil', price: 1999.00, img: 'assets/products/oil.png', desc: 'Radiant environmental shield.' },
    { id: 'mist-1', name: 'Rose Water Mist', price: 849.00, img: 'assets/products/mist.png', desc: 'Refreshing floral hydration.' },
    { id: 'charcoal-1', name: 'Charcoal Detox Mask', price: 1399.00, img: 'assets/products/charcoal.png', desc: 'Pore-clearing volcanic clay.' },
    { id: 'vit-c-1', name: 'Vitamin C Drops', price: 2099.00, img: 'assets/products/vit-c.png', desc: 'Brightening antioxidant boost.' },
    { id: 'balm-1', name: 'Barrier Support Balm', price: 1199.00, img: 'assets/products/balm.png', desc: 'Soothing lipid-rich repair.' },
    { id: 'toner-1', name: 'Exfoliating Toner', price: 1049.00, img: 'assets/products/toner.png', desc: 'Acid-balanced skin smoothing.' },
    { id: 'eye-1', name: 'Overnight Eye Cream', price: 1599.00, img: 'assets/products/eye.png', desc: 'Targets puffiness & fine lines.' },
    { id: 'face-oil-2', name: 'Mineral Face Oil', price: 1899.00, img: 'assets/products/face-oil-v2.png', desc: 'Ultra-lightweight nourishment.' },
    { id: 'milky-1', name: 'Gentle Milky Cleanser', price: 949.00, img: 'assets/products/milky-cleanser.png', desc: 'Creamy, non-foaming wash.' },
    { id: 'clay-1', name: 'Clarifying Clay Mask', price: 1299.00, img: 'assets/products/clay-mask.png', desc: 'Refines texture and tone.' },
    { id: 'moist-1', name: 'Peptide Moisturizer', price: 1949.00, img: 'assets/products/moisturizer.png', desc: 'Firming amino acid complex.' },
    { id: 'lip-1', name: 'Lip Treatment Balm', price: 599.00, img: 'assets/products/lip.png', desc: 'Velvety, long-lasting moisture.' }
];

const WeCare = {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    
    init() {
        this.setupNavigationTransitions();
        this.setupEventListeners();
        this.updateCartCount();
        this.renderProducts();
        this.initRevealAnimations();
        
        if (window.location.pathname.includes('cart.html')) {
            this.renderCart();
        }
    },

    setupNavigationTransitions() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 50);
    },

    setupEventListeners() {
        document.body.addEventListener('click', (e) => {
            // Quick Add
            if (e.target.classList.contains('add-to-cart')) {
                const id = e.target.dataset.id;
                this.addToCart(id);
                this.animateCartIcon();
                this.showToast('Product added to your ritual');
            }

            // Mobile Nav
            if (e.target.classList.contains('mobile-toggle')) {
                document.querySelector('.nav-links').classList.toggle('active');
            }
        });
        
        // Sticky Header Effect
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('main-nav');
            if (nav) {
                if (window.scrollY > 50) nav.classList.add('scrolled');
                else nav.classList.remove('scrolled');
            }
        });
    },

    renderProducts() {
        // Render Standard Grid
        const grid = document.querySelector('.product-grid.dynamic');
        if (grid) {
            grid.innerHTML = this.buildProductHTML(PRODUCTS);
            this.observeProducts(grid);
        }

        // Render Carousel
        const carousel = document.getElementById('featured-carousel');
        if (carousel) {
            const doubleProducts = [...PRODUCTS, ...PRODUCTS]; 
            carousel.innerHTML = this.buildProductHTML(doubleProducts);
            this.observeProducts(carousel);
        }
    },

    buildProductHTML(productsArray) {
        return productsArray.map(p => `
            <div class="product-card" data-reveal>
                <a href="product-detail.html?id=${p.id}">
                    <div class="product-thumb">
                        <img src="${p.img}" alt="${p.name}" loading="lazy">
                    </div>
                    <div class="product-meta">
                        <h3>${p.name}</h3>
                        <p class="price">₹${p.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                        <p class="desc">${p.desc}</p>
                    </div>
                </a>
                <button class="btn add-to-cart" 
                        data-id="${p.id}" 
                        data-name="${p.name}" 
                        data-price="${p.price}" 
                        data-img="${p.img}">Quick Add</button>
            </div>
        `).join('');
    },

    initRevealAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    },

    observeProducts(container) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        container.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    },

    addToCart(id) {
        const product = PRODUCTS.find(p => p.id === id);
        if (!product) return;

        const existing = this.cart.find(item => item.id === id);
        if (existing) {
            existing.quantity++;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        this.saveAndSync();
    },

    removeFromCart(id) {
        this.cart = this.cart.filter(item => item.id !== id);
        this.saveAndSync();
        this.renderCart();
    },

    updateQuantity(id, delta) {
        const item = this.cart.find(i => i.id === id);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                this.removeFromCart(id);
            } else {
                this.saveAndSync();
                this.renderCart();
            }
        }
    },

    saveAndSync() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartCount();
    },

    updateCartCount() {
        const count = this.cart.reduce((acc, i) => acc + i.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'inline-block' : 'none';
        });
    },

    animateCartIcon() {
        const cartIcon = document.querySelector('.cart-count');
        if (cartIcon) {
            cartIcon.classList.add('bounce');
            setTimeout(() => cartIcon.classList.remove('bounce'), 500);
        }
    },

    renderCart() {
        const list = document.getElementById('cart-list');
        const totalEl = document.getElementById('cart-total');
        if (!list) return;

        if (this.cart.length === 0) {
            list.innerHTML = '<div class="empty-state" style="text-align: center; padding: 5rem 0;"><h3>Your Ritual is Empty</h3><a href="shop.html" class="btn" style="margin-top: 2rem;">Explore Products</a></div>';
            totalEl.textContent = '₹0.00';
            return;
        }

        list.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                </div>
                <div class="qty">
                    <button onclick="WeCare.updateQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="WeCare.updateQuantity('${item.id}', 1)">+</button>
                </div>
                <button class="remove" onclick="WeCare.removeFromCart('${item.id}')">&times;</button>
            </div>
        `).join('');

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalEl.textContent = `₹${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    },

    showToast(msg) {
        const t = document.createElement('div');
        t.className = 'toast-ritual';
        t.textContent = msg;
        document.body.appendChild(t);
        setTimeout(() => t.classList.add('visible'), 10);
        setTimeout(() => {
            t.classList.remove('visible');
            setTimeout(() => t.remove(), 500);
        }, 3000);
    }
};

document.addEventListener('DOMContentLoaded', () => WeCare.init());
