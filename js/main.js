/**
 * VCare - Premium Evolution v2
 * 
 * Centralized State, Dynamic Rendering, and UX Contrast.
 */

const PRODUCTS = [
    { id: 'cleanser-1', name: 'Botanical Cleanser', price: 1499.00, img: 'assets/products/cleanser.png', desc: 'Gentle daily purification.' },
    { id: 'serum-1', name: 'Hydrating Serum', price: 2499.00, img: 'assets/products/serum.png', desc: 'Deep moisture replenishment.' },
    { id: 'cream-1', name: 'Night Recovery Cream', price: 3299.00, img: 'assets/products/cream.png', desc: 'Overnight cellular support.' },
    { id: 'oil-1', name: 'Antioxidant Oil', price: 2899.00, img: 'assets/products/oil.png', desc: 'Radiant environmental shield.' },
    { id: 'mist-1', name: 'Rose Water Mist', price: 1199.00, img: 'assets/products/mist.png', desc: 'Refreshing floral hydration.' },
    { id: 'charcoal-1', name: 'Charcoal Detox Mask', price: 1999.00, img: 'assets/products/charcoal.png', desc: 'Pore-clearing volcanic clay.' },
    { id: 'vit-c-1', name: 'Vitamin C Drops', price: 2999.00, img: 'assets/products/vit-c.png', desc: 'Brightening antioxidant boost.' },
    { id: 'balm-1', name: 'Barrier Support Balm', price: 1699.00, img: 'assets/products/balm.png', desc: 'Soothing lipid-rich repair.' },
    { id: 'toner-1', name: 'Exfoliating Toner', price: 1499.00, img: 'assets/products/toner.png', desc: 'Acid-balanced skin smoothing.' },
    { id: 'eye-1', name: 'Overnight Eye Cream', price: 2299.00, img: 'assets/products/eye.png', desc: 'Targets puffiness & fine lines.' },
    { id: 'face-oil-2', name: 'Mineral Face Oil', price: 2699.00, img: 'assets/products/face-oil-v2.png', desc: 'Ultra-lightweight nourishment.' },
    { id: 'milky-1', name: 'Gentle Milky Cleanser', price: 1399.00, img: 'assets/products/milky-cleanser.png', desc: 'Creamy, non-foaming wash.' },
    { id: 'clay-1', name: 'Clarifying Clay Mask', price: 1899.00, img: 'assets/products/clay-mask.png', desc: 'Refines texture and tone.' },
    { id: 'moist-1', name: 'Peptide Moisturizer', price: 2799.00, img: 'assets/products/moisturizer.png', desc: 'Firming amino acid complex.' },
    { id: 'lip-1', name: 'Lip Treatment Balm', price: 899.00, img: 'assets/products/lip.png', desc: 'Velvety, long-lasting moisture.' }
];

const VCare = {
    uxMode: localStorage.getItem('uxMode') || 'good',
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    popupShown: localStorage.getItem('badUxPopupShown') === 'true',
    
    init() {
        this.applyUXMode();
        this.setupNavigationTransitions();
        this.setupEventListeners();
        this.updateCartCount();
        this.renderProducts();
        this.initRevealAnimations();
        
        if (window.location.pathname.includes('cart.html')) {
            this.renderCart();
        }

        // Newsletter Popup Logic
        if (this.uxMode === 'bad' && !this.popupShown) {
            setTimeout(() => this.showNewsletterPopup(), 1500);
        }
    },

    setupNavigationTransitions() {
        if (this.uxMode === 'good') {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 50);
        }
    },

    setupEventListeners() {
        document.body.addEventListener('click', (e) => {
            // UX Toggle
            if (e.target.closest('.ux-toggle')) {
                this.toggleUX();
            }

            // Quick Add
            if (e.target.classList.contains('add-to-cart')) {
                const id = e.target.dataset.id;
                this.handleAction(() => {
                    this.addToCart(id);
                    this.animateCartIcon();
                });
            }

            // Mobile Nav
            if (e.target.classList.contains('mobile-toggle')) {
                document.querySelector('.nav-links').classList.toggle('active');
            }
        });
    },

    toggleUX() {
        this.uxMode = this.uxMode === 'good' ? 'bad' : 'good';
        localStorage.setItem('uxMode', this.uxMode);
        // Refresh to apply full scope changes cleanly
        window.location.reload();
    },

    applyUXMode() {
        if (this.uxMode === 'bad') {
            document.body.classList.add('bad-ux');
            document.querySelector('.ux-toggle')?.classList.add('active');
        } else {
            document.body.classList.remove('bad-ux');
            document.querySelector('.ux-toggle')?.classList.remove('active');
        }
    },

    handleAction(callback) {
        if (this.uxMode === 'bad') {
            const delay = Math.random() * 500 + 300;
            const loader = document.createElement('div');
            loader.className = 'bad-loader';
            loader.innerHTML = 'PROCESSING... SYNCING DATABASE... ERROR 404... RECOLORING PIXELS...';
            document.body.appendChild(loader);
            
            setTimeout(() => {
                loader.remove();
                callback();
            }, 300);
        } else {
            callback();
            this.showToast('Product added to your ritual');
        }
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
            const doubleProducts = [...PRODUCTS, ...PRODUCTS]; // Duplicate for infinite scroll loop
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
        if (this.uxMode === 'good') {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
        }
    },

    observeProducts(container) {
        if (this.uxMode === 'good') {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            container.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
        }
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
        this.handleAction(() => {
            this.cart = this.cart.filter(item => item.id !== id);
            this.saveAndSync();
            this.renderCart();
        });
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
        if (cartIcon && this.uxMode === 'good') {
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
                    <p>₹${item.price.toFixed(2)}</p>
                </div>
                <div class="qty">
                    <button onclick="VCare.updateQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="VCare.updateQuantity('${item.id}', 1)">+</button>
                </div>
                <button class="remove" onclick="VCare.removeFromCart('${item.id}')">&times;</button>
            </div>
        `).join('');

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalEl.textContent = `₹${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    },

    showNewsletterPopup() {
        const popup = document.createElement('div');
        popup.className = 'newsletter-popup';
        popup.innerHTML = `
            <div class="popup-box">
                <button class="close-popup" style="opacity: 0.1; cursor: not-allowed;" disabled>X</button>
                <h2 style="font-size: 60px; color: red;">JOIN OUR LIST!!!</h2>
                <p>DO NOT MISS OUT ON 0.5% OFF YOUR SECOND ORDER*</p>
                <input type="email" id="news-email" placeholder="YOUR EMAIL ADDRESS" style="width: 80%; padding: 1rem; margin: 2rem 0; border: 5px solid lime;">
                <br>
                <button class="btn-bad" style="background: yellow; color: blue; padding: 2rem; font-weight: bold;">SIGN UP NOW</button>
                <p style="font-size: 10px; margin-top: 10px; color: black;">*T&C Apply. Offer valid for 2 minutes. We will sell your data.</p>
            </div>
        `;
        document.body.appendChild(popup);
        this.popupShown = true;

        const emailInput = popup.querySelector('#news-email');
        const closeBtn = popup.querySelector('.close-popup');

        emailInput.addEventListener('input', () => {
            if (emailInput.value.length > 5) {
                closeBtn.style.opacity = '1';
                closeBtn.style.cursor = 'wait';
                closeBtn.disabled = false;
            } else {
                closeBtn.style.opacity = '0.1';
                closeBtn.style.cursor = 'not-allowed';
                closeBtn.disabled = true;
            }
        });

        closeBtn.onclick = () => {
            if (this.uxMode === 'bad') {
                if (Math.random() > 0.5) {
                    alert('ERROR: Please confirm you are not a robot by clicking OK.');
                    alert('Are you sure?');
                    popup.remove();
                    this.popupShown = true;
                    localStorage.setItem('badUxPopupShown', 'true');
                } else {
                    popup.remove();
                    this.popupShown = true;
                    localStorage.setItem('badUxPopupShown', 'true');
                }
            } else {
                popup.remove();
            }
        };
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

document.addEventListener('DOMContentLoaded', () => VCare.init());
