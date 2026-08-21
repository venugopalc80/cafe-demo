import './styles.css';

const menu = [
  { name: 'Cappuccino', price: 3.20, category: 'Coffee', image: '/assets/cappuccino.jpg', description: 'Smooth espresso with steamed milk and a touch of foam.' },
  { name: 'Latte', price: 3.00, category: 'Coffee', image: '/assets/latte.jpg', description: 'Silky steamed milk balanced with rich espresso.' },
  { name: 'Chocolate Croissant', price: 2.80, category: 'Bakery', image: '/assets/croissant.jpg', description: 'Buttery, flaky pastry filled with dark chocolate.' },
  { name: 'Club Sandwich', price: 5.50, category: 'Food', image: '/assets/sandwich.jpg', description: 'Toasted bread layered with fresh greens and chicken.' },
  { name: 'Cheesecake', price: 3.50, category: 'Dessert', image: '/assets/cheesecake.jpg', description: 'Creamy cheesecake with a delicate biscuit base.' },
  { name: 'Iced Coffee', price: 3.20, category: 'Coffee', image: '/assets/iced-coffee.jpg', description: 'Cold-brewed coffee served over ice and milk.' }
];

const state = { cart: [], category: 'All', mobileOpen: false };

const icon = (name) => {
  const icons = {
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13m-5-5 5 5-5 5"/></svg>',
    bag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l1 12H5L6 8Zm3 0a3 3 0 0 1 6 0"/></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    minus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/></svg>'
  };
  return icons[name];
};

function render() {
  const filtered = state.category === 'All' ? menu : menu.filter(i => i.category === state.category);
  const cartCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  document.querySelector('#app').innerHTML = `
    <div class="site-shell">
      <div class="announcement">
        <div>Freshly roasted beans. Baked daily.</div>
        <div class="announcement-right"><span>${icon('clock')} Mon–Sun · 8:00 AM–9:00 PM</span><span>${icon('pin')} 123 Coffee Lane, London</span></div>
      </div>

      <header class="nav-wrap">
        <a class="brand" href="#home" aria-label="Brew Haven home">
          <span class="brand-mark">BH</span>
          <span><strong>Brew Haven</strong><small>Café & Eatery</small></span>
        </a>
        <button class="mobile-toggle" aria-label="Open navigation">${icon(state.mobileOpen ? 'close' : 'menu')}</button>
        <nav class="${state.mobileOpen ? 'open' : ''}">
          <a class="active" href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#menu">Menu</a>
          <a href="#shop">Shop</a>
          <a href="#reservation">Reservation</a>
          <a href="#journal">Journal</a>
          <a href="#contact">Contact</a>
        </nav>
        <button class="cart-btn" id="cartButton" aria-label="Open cart">${icon('bag')}<span>${cartCount}</span></button>
      </header>

      <main>
        <section class="hero" id="home">
          <div class="hero-overlay"></div>
          <div class="hero-content">
            <p class="eyebrow">Best coffee in town</p>
            <h1>Good Coffee.<br><em>Great Moments.</em></h1>
            <p class="hero-copy">Welcome to Brew Haven, where every cup is a celebration of flavour and every visit feels like home.</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="#menu">Explore Menu ${icon('arrow')}</a>
              <a class="btn btn-outline" href="#reservation">Reserve a Table</a>
            </div>
          </div>
          <div class="hero-dots"><span class="active"></span><span></span><span></span></div>
        </section>

        <section class="values">
          <div><span class="value-icon">☕</span><div><strong>Quality Coffee</strong><p>Finest beans, carefully roasted.</p></div></div>
          <div><span class="value-icon">✦</span><div><strong>Freshly Baked</strong><p>Pastries baked fresh every morning.</p></div></div>
          <div><span class="value-icon">⌂</span><div><strong>Cozy Ambience</strong><p>A warm place to slow down.</p></div></div>
          <div><span class="value-icon">♥</span><div><strong>Made with Love</strong><p>Every dish crafted with care.</p></div></div>
        </section>

        <section class="menu-section" id="menu">
          <div class="section-heading">
            <div><p class="eyebrow dark">Our menu</p><h2>Explore our popular items</h2></div>
            <button class="text-btn" id="fullMenu">View Full Menu ${icon('arrow')}</button>
          </div>
          <div class="filters">
            ${['All','Coffee','Bakery','Food','Dessert'].map(c => `<button class="${state.category === c ? 'selected' : ''}" data-category="${c}">${c}</button>`).join('')}
          </div>
          <div class="menu-grid">
            ${filtered.map(item => `
              <article class="menu-card">
                <div class="menu-image"><img src="${item.image}" alt="${item.name}" loading="lazy"></div>
                <div class="menu-info"><div><h3>${item.name}</h3><strong>£${item.price.toFixed(2)}</strong></div><p>${item.description}</p><button class="add-btn" data-add="${item.name}">Add to order ${icon('plus')}</button></div>
              </article>
            `).join('')}
          </div>
        </section>

        <section class="story" id="about">
          <div class="story-image"><img src="/assets/cafe-interior.jpg" alt="Warm café interior"></div>
          <div class="story-copy">
            <p class="eyebrow dark">Our story</p>
            <h2>A little more than coffee.</h2>
            <p>Brew Haven was created for the moments between the big ones: a slow morning, a good conversation, a laptop session that runs long, or simply five quiet minutes with a great cup.</p>
            <p>We source thoughtfully, bake daily, and keep the room warm, relaxed and welcoming.</p>
            <a class="btn btn-dark" href="#contact">Meet Brew Haven ${icon('arrow')}</a>
          </div>
        </section>

        <section class="specials" id="shop">
          <div class="specials-heading"><p class="eyebrow">Today's specials</p><h2>Treat yourself today</h2><p>Our kitchen favourites, available while they last.</p></div>
          <div class="special-grid">
            ${menu.slice(0,4).map(item => `<article><img src="${item.image}" alt="${item.name}"><div><span>${item.category}</span><h3>${item.name}</h3><strong>£${item.price.toFixed(2)}</strong></div></article>`).join('')}
          </div>
        </section>

        <section class="reservation" id="reservation">
          <div><p class="eyebrow dark">Make it a moment</p><h2>Reserve your table.</h2><p>Planning breakfast, a catch-up or a quiet afternoon? Tell us when you'll be joining us.</p></div>
          <form id="reservationForm">
            <div class="form-row"><label>Name<input name="name" required placeholder="Your name"></label><label>Email<input type="email" name="email" required placeholder="you@example.com"></label></div>
            <div class="form-row"><label>Date<input type="date" name="date" required></label><label>Time<select name="time"><option>09:00</option><option>10:30</option><option>12:00</option><option>14:00</option><option>17:30</option><option>19:00</option></select></label></div>
            <label>Guests<select name="guests"><option>2 guests</option><option>3 guests</option><option>4 guests</option><option>5 guests</option><option>6+ guests</option></select></label>
            <button class="btn btn-primary" type="submit">Request reservation ${icon('arrow')}</button>
            <p class="form-message" id="reservationMessage"></p>
          </form>
        </section>

        <section class="journal" id="journal">
          <div class="section-heading"><div><p class="eyebrow dark">From the journal</p><h2>Stories worth lingering over</h2></div><button class="text-btn">Read the journal ${icon('arrow')}</button></div>
          <div class="journal-grid">
            <article><img src="/assets/journal-1.jpg" alt="Coffee beans"><p>Behind the brew</p><h3>Why the roast matters more than you think.</h3></article>
            <article><img src="/assets/journal-2.jpg" alt="Fresh pastry"><p>From the oven</p><h3>The simple ritual of a freshly baked morning.</h3></article>
            <article><img src="/assets/hero.jpg" alt="Café table"><p>Café culture</p><h3>Five ways to make your coffee break count.</h3></article>
          </div>
        </section>

        <section class="contact" id="contact">
          <div><p class="eyebrow">Come say hello</p><h2>Your table is waiting.</h2></div>
          <div class="contact-details"><p>${icon('pin')} 123 Coffee Lane, London, UK</p><p>${icon('clock')} Mon–Sun · 8:00 AM–9:00 PM</p><p>hello@brewhavencafe.co.uk</p></div>
          <a class="btn btn-outline light" href="#reservation">Book a table</a>
        </section>
      </main>

      <footer>
        <div class="footer-main">
          <div class="footer-brand"><div class="brand"><span class="brand-mark">BH</span><span><strong>Brew Haven</strong><small>Café & Eatery</small></span></div><p>Good coffee, good food and good company, every day.</p></div>
          <div><h4>Explore</h4><a href="#about">About</a><a href="#menu">Menu</a><a href="#shop">Shop</a><a href="#journal">Journal</a></div>
          <div><h4>Visit</h4><a href="#reservation">Reservations</a><a href="#contact">Contact</a><a href="#home">Opening hours</a></div>
          <div><h4>Stay in the loop</h4><p>Seasonal specials, events and café news.</p><form id="newsletter"><input type="email" required placeholder="Email address"><button aria-label="Subscribe">→</button></form><small id="newsletterMessage"></small></div>
        </div>
        <div class="footer-bottom"><span>© 2026 Brew Haven Café. Demo website by The Pixel Muses.</span><span>Privacy · Terms</span></div>
      </footer>
    </div>

    <aside class="cart-drawer" id="cartDrawer" aria-hidden="true">
      <div class="drawer-header"><h2>Your order</h2><button id="closeCart" aria-label="Close cart">${icon('close')}</button></div>
      <div class="cart-items">${state.cart.length ? state.cart.map(item => `<div class="cart-item"><img src="${item.image}" alt=""><div><h3>${item.name}</h3><p>£${(item.price * item.qty).toFixed(2)}</p><div class="qty"><button data-minus="${item.name}">${icon('minus')}</button><span>${item.qty}</span><button data-plus="${item.name}">${icon('plus')}</button></div></div></div>`).join('') : '<div class="empty-cart"><span>☕</span><h3>Your basket is empty</h3><p>Add something delicious from the menu.</p></div>'}</div>
      <div class="cart-footer"><div><span>Subtotal</span><strong>£${cartTotal.toFixed(2)}</strong></div><button class="btn btn-primary" id="checkoutButton" ${state.cart.length ? '' : 'disabled'}>Continue to checkout ${icon('arrow')}</button></div>
    </aside>
    <div class="drawer-backdrop" id="drawerBackdrop"></div>
  `;

  bindEvents();
}

function addToCart(name) {
  const item = menu.find(i => i.name === name);
  const existing = state.cart.find(i => i.name === name);
  if (existing) existing.qty += 1;
  else state.cart.push({ ...item, qty: 1 });
  render();
  openCart();
}

function openCart() {
  const drawer = document.querySelector('#cartDrawer');
  const backdrop = document.querySelector('#drawerBackdrop');
  drawer.classList.add('open'); backdrop.classList.add('open'); drawer.setAttribute('aria-hidden','false');
}
function closeCart() {
  document.querySelector('#cartDrawer')?.classList.remove('open');
  document.querySelector('#drawerBackdrop')?.classList.remove('open');
}

function bindEvents() {
  document.querySelectorAll('[data-category]').forEach(btn => btn.addEventListener('click', () => { state.category = btn.dataset.category; render(); }));
  document.querySelectorAll('[data-add]').forEach(btn => btn.addEventListener('click', () => addToCart(btn.dataset.add)));
  document.querySelector('#cartButton')?.addEventListener('click', openCart);
  document.querySelector('#closeCart')?.addEventListener('click', closeCart);
  document.querySelector('#drawerBackdrop')?.addEventListener('click', closeCart);
  document.querySelectorAll('[data-plus]').forEach(btn => btn.addEventListener('click', () => { const i = state.cart.find(x => x.name === btn.dataset.plus); i.qty++; render(); openCart(); }));
  document.querySelectorAll('[data-minus]').forEach(btn => btn.addEventListener('click', () => { const i = state.cart.find(x => x.name === btn.dataset.minus); i.qty--; if(i.qty <= 0) state.cart = state.cart.filter(x => x.name !== i.name); render(); if(state.cart.length) openCart(); }));
  document.querySelector('#checkoutButton')?.addEventListener('click', () => { alert('Demo checkout: your order is ready to be connected to Stripe or a café POS.'); });
  document.querySelector('#reservationForm')?.addEventListener('submit', e => { e.preventDefault(); document.querySelector('#reservationMessage').textContent = 'Thanks! Your reservation request has been received. We will confirm it shortly.'; e.target.reset(); });
  document.querySelector('#newsletter')?.addEventListener('submit', e => { e.preventDefault(); document.querySelector('#newsletterMessage').textContent = 'You’re on the list. Welcome to Brew Haven.'; e.target.reset(); });
  document.querySelector('.mobile-toggle')?.addEventListener('click', () => { state.mobileOpen = !state.mobileOpen; render(); });
  document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => { state.mobileOpen = false; }));
}

render();