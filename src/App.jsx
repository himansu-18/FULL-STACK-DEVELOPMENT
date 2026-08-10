import { useEffect, useMemo, useState } from 'react'
import './App.css'

const categories = ['All products', 'Tech', 'Home', 'Style', 'Wellness']
const coupons = { WELCOME10: 10, WEEKEND15: 15 }
const productDetails = [
  ['Everyday Laptop Stand', 'A clean aluminum stand for a more comfortable desk.', 'Tech'],
  ['Wireless Desk Lamp', 'Warm, adjustable light for focused work and quiet evenings.', 'Home'],
  ['Linen Weekend Shirt', 'Soft, breathable linen made for easy everyday dressing.', 'Style'],
  ['Daily Face Cleanser', 'A gentle botanical cleanser for a fresh morning ritual.', 'Wellness'],
  ['Noise-Canceling Headphones', 'Immersive sound with calm, comfortable ear cushions.', 'Tech'],
  ['Stoneware Coffee Mug', 'Hand-finished ceramic for your first coffee of the day.', 'Home'],
  ['Canvas Carryall Bag', 'A strong, spacious tote that goes everywhere with you.', 'Style'],
  ['Essential Oil Roll-On', 'A pocket-sized blend for a small moment of calm.', 'Wellness'],
  ['Compact Bluetooth Speaker', 'Rich, room-filling sound in a simple compact form.', 'Tech'],
  ['Woven Table Runner', 'An understated texture to make everyday meals special.', 'Home'],
  ['Classic Cotton Cap', 'A lightweight, easy-wearing cap for sunny days.', 'Style'],
  ['Sleep Mist Spray', 'A soft lavender mist to help you settle into the evening.', 'Wellness'],
  ['Stainless Water Bottle', 'A reusable bottle that keeps drinks cool throughout the day.', 'Wellness'],
  ['Reusable Shopping Bag', 'A strong foldable bag for groceries and everyday errands.', 'Style'],
  ['USB-C Charging Cable', 'A durable fast-charging cable for your everyday devices.', 'Tech'],
  ['Hand Wash Set', 'A gentle, fresh-scented hand wash for the whole family.', 'Wellness'],
  ['Soft Cotton Towels', 'Everyday bath towels made from absorbent cotton.', 'Home'],
  ['Desk Storage Box', 'A simple organizer for cables, stationery, and small items.', 'Home'],
  ['Daily Sunscreen SPF 50', 'Lightweight daily protection for comfortable skin.', 'Wellness'],
  ['Hardcover Notebook', 'A sturdy lined notebook for lists, notes, and ideas.', 'Style'],
  ['Pocket Power Bank', 'Compact backup power for busy days away from a socket.', 'Tech'],
  ['Leakproof Lunch Box', 'A practical lunch box with separate compartments.', 'Home'],
  ['Bamboo Toothbrush Set', 'A simple reusable set for a cleaner daily routine.', 'Wellness'],
  ['Compact Rain Umbrella', 'A lightweight umbrella that fits easily in your bag.', 'Style'],
]
const productImages = [
  'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1509762774605-f07235a08f1f?auto=format&fit=crop&w=900&q=85',
]
const storage = { cart: 'bunova-cart', wishlist: 'bunova-wishlist', orders: 'bunova-orders' }
const readStorage = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) || fallback } catch { return fallback } }
const formatPrice = (value) => `₹${value.toLocaleString('en-IN')}`

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All products')
  const [cart, setCart] = useState(() => readStorage(storage.cart, []))
  const [wishlist, setWishlist] = useState(() => readStorage(storage.wishlist, []))
  const [orders, setOrders] = useState(() => readStorage(storage.orders, []))
  const [couponInput, setCouponInput] = useState('')
  const [coupon, setCoupon] = useState(null)
  const [couponMessage, setCouponMessage] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [upiId, setUpiId] = useState('')
  const [paymentMessage, setPaymentMessage] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [profileTab, setProfileTab] = useState('orders')
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [reviewProduct, setReviewProduct] = useState(null)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [confirmation, setConfirmation] = useState(null)

  useEffect(() => { localStorage.setItem(storage.cart, JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem(storage.wishlist, JSON.stringify(wishlist)) }, [wishlist])
  useEffect(() => { localStorage.setItem(storage.orders, JSON.stringify(orders)) }, [orders])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=24')
      .then((response) => { if (!response.ok) throw new Error(); return response.json() })
      .then((posts) => setProducts(posts.map((post, index) => {
        const [title, description, category] = productDetails[index]
        const price = [1299, 2499, 1799, 899, 3299, 1499][index % 6]
        return { id: post.id, title, description, category, price, originalPrice: Math.round(price * 1.2), discount: 20, rating: (4.2 + (index % 7) / 10).toFixed(1), reviewCount: 12 + index * 4, stock: 20, image: productImages[index], reviews: [{ name: 'Aarav', rating: 5, text: 'Useful, well made, and exactly as described.' }] }
      })))
      .catch(() => setError('The catalog is taking a moment. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  const filteredProducts = useMemo(() => products.filter((product) => {
    const text = `${product.title} ${product.description} ${product.category}`.toLowerCase()
    return (activeCategory === 'All products' || product.category === activeCategory) && text.includes(query.toLowerCase())
  }), [activeCategory, products, query])
  const searchSuggestions = useMemo(() => products.filter((product) => `${product.title} ${product.category}`.toLowerCase().includes(query.toLowerCase())).slice(0, 5), [products, query])
  const recommended = useMemo(() => {
    const source = selectedProduct ? products.filter((product) => product.category === selectedProduct.category && product.id !== selectedProduct.id) : products
    return source.filter((product) => Number(product.rating) >= 4.5).slice(0, 3)
  }, [products, selectedProduct])
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const discount = coupon ? Math.min(Math.round(subtotal * coupon / 100), subtotal) : 0
  const taxableAmount = Math.max(0, subtotal - discount)
  const cgst = Math.round(taxableAmount * .09)
  const sgst = Math.round(taxableAmount * .09)
  const delivery = !cart.length ? 0 : subtotal > 5000 ? 0 : subtotal > 2000 ? 49 : 99
  const total = Math.max(0, taxableAmount + cgst + sgst + delivery)

  const addToCart = (product, quantity = 1) => {
    if (!product.stock) return
    setCart((current) => { const found = current.find((item) => item.id === product.id); return found ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) : [...current, { ...product, quantity }] })
  }
  const updateQuantity = (id, change) => setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + change } : item).filter((item) => item.quantity > 0))
  const toggleWishlist = (product) => setWishlist((current) => current.some((item) => item.id === product.id) ? current.filter((item) => item.id !== product.id) : [...current, product])
  const applyCoupon = () => { const code = couponInput.trim().toUpperCase(); if (coupons[code]) { setCoupon(coupons[code]); setCouponMessage(`${coupons[code]}% discount applied`) } else { setCoupon(null); setCouponMessage('Invalid coupon. Try WELCOME10 or WEEKEND15.') } }
  const clearCoupon = () => { setCoupon(null); setCouponInput(''); setCouponMessage('Coupon removed') }
  const openProduct = (product) => { setSelectedProduct(product); setReviewProduct(null) }
  const submitReview = (event) => {
    event.preventDefault()
    if (!reviewProduct || !reviewRating) return
    setProducts((current) => current.map((product) => product.id === reviewProduct.id ? { ...product, rating: ((Number(product.rating) + reviewRating) / 2).toFixed(1), reviewCount: product.reviewCount + 1, reviews: [...product.reviews, { name: 'You', rating: reviewRating, text: reviewText || 'Great everyday product.' }] } : product))
    setReviewProduct(null); setReviewRating(0); setReviewText('')
  }
  const placeOrder = () => {
    if (paymentMethod === 'upi' && !upiId.trim()) { setPaymentMessage('Please enter your UPI ID'); return }
    if (!cart.length) return
    const order = { id: `BV-${Date.now().toString().slice(-6)}`, date: new Date().toLocaleDateString('en-IN'), items: cart.map((item) => ({ ...item })), total, paymentMethod, status: 'Confirmed' }
    setOrders((current) => [order, ...current]); setCart([]); setCoupon(null); setCouponInput(''); setPaymentMessage(''); setIsCartOpen(false); setConfirmation(order); window.location.hash = 'top'
  }

  return <div className="storefront">
    <div className="announcement">Free delivery above ₹5,000 <span>•</span> ₹49 above ₹2,000 <span>•</span> Easy 7-day returns</div>
    <header className="header"><a className="brand" href="#top">BUNOVA</a><nav><a href="#shop">Shop</a><a href="#recommendations">Recommended</a><a href="#about">Our story</a></nav><div className="header-actions"><div className="search-wrap"><label className="search"><span>⌕</span><input value={query} onFocus={() => setIsSearchFocused(true)} onBlur={() => setTimeout(() => setIsSearchFocused(false), 120)} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" />{query && <button type="button" className="clear-search" onMouseDown={() => setQuery('')} aria-label="Clear search">×</button>}</label>{isSearchFocused && query.trim() && <div className="search-suggestions">{searchSuggestions.length ? searchSuggestions.map((product) => <button type="button" className="suggestion" key={product.id} onMouseDown={() => { openProduct(product); setIsSearchFocused(false) }}><img src={product.image} alt="" /><span><b>{product.title}</b><small>{product.category}</small></span><strong>{formatPrice(product.price)}</strong></button>) : <div className="no-suggestions">No products found</div>}</div>}</div><button className="profile-button" type="button" onClick={() => setIsProfileOpen(true)}>Profile</button><button className="wishlist-button" type="button" onClick={() => { setProfileTab('wishlist'); setIsProfileOpen(true) }}>♡ <b>{wishlist.length}</b></button><button className="cart-button" type="button" onClick={() => setIsCartOpen(true)}>Cart <b>{itemCount}</b></button></div></header>
    <main id="top">
      <section className="hero-section"><div className="hero-copy"><p className="eyebrow">BUNOVA / CURATED FOR THE EVERYDAY</p><h1>Everyday finds,<br /><em>chosen better.</em></h1><p className="hero-text">Discover thoughtfully selected products made to fit your everyday life.</p><a className="primary-link" href="#shop">Shop Now <span>↘</span></a></div><div className="hero-image"><img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85" alt="Everyday essentials" /><div className="hero-note">01 / 04<br /><strong>Discover something new.</strong></div></div></section>
      <section className="shop-section" id="shop"><div className="section-heading"><div><p className="eyebrow">THE COLLECTION</p><h2>Find your next favourite.</h2></div><span className="result-count">{filteredProducts.length} pieces</span></div><div className="filters">{categories.map((category) => <button className={activeCategory === category ? 'active' : ''} type="button" key={category} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>{loading && <div className="loading">Fetching the latest edit...</div>}{error && <div className="empty-state"><p>{error}</p><button type="button" onClick={() => window.location.reload()}>Reload catalog</button></div>}{!loading && !error && filteredProducts.length > 0 && <div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} isWishlisted={wishlist.some((item) => item.id === product.id)} onOpen={openProduct} onAdd={addToCart} onWishlist={toggleWishlist} onReview={setReviewProduct} />)}</div>}{!loading && !filteredProducts.length && <div className="empty-state"><p>No products found.</p><button type="button" onClick={() => { setQuery(''); setActiveCategory('All products') }}>Clear search</button></div>}</section>
      <section className="recommendation" id="recommendations"><div><p className="eyebrow">{selectedProduct ? `MORE FROM ${selectedProduct.category.toUpperCase()}` : 'BASED ON WHAT IS LOVED'}</p><h2>Small upgrades,<br /><em>big difference.</em></h2><p>Thoughtful everyday pieces, selected to complement your browsing.</p><a className="text-link" href="#shop">Shop recommendations ↗</a></div><div className="recommendation-list">{recommended.map((product) => <button type="button" className="recommendation-item" key={product.id} onClick={() => openProduct(product)}><img src={product.image} alt="" /><span><b>{product.title}</b><small>{product.category} · {formatPrice(product.price)}</small></span><i>↗</i></button>)}</div></section>
    </main>
    <footer id="about"><div className="footer-brand"><div className="brand">BUNOVA</div><p>Discover something new.</p></div><div><h4>Shop</h4><a href="#shop">All Products</a><a href="#shop">New Arrivals</a><a href="#recommendations">Best Sellers</a></div><div><h4>Help</h4><a href="#about">Contact Us</a><a href="#about">Shipping</a><a href="#about">Returns</a><a href="#about">FAQs</a></div><div><h4>Connect</h4><span>Instagram</span><span>GitHub</span><span>LinkedIn</span></div><small className="copyright">© 2026 BUNOVA. All rights reserved.</small></footer>
    {isCartOpen && <CartDrawer cart={cart} itemCount={itemCount} subtotal={subtotal} discount={discount} coupon={coupon} couponInput={couponInput} couponMessage={couponMessage} cgst={cgst} sgst={sgst} delivery={delivery} total={total} paymentMethod={paymentMethod} upiId={upiId} paymentMessage={paymentMessage} onClose={() => setIsCartOpen(false)} onQuantity={updateQuantity} onCoupon={applyCoupon} onClearCoupon={clearCoupon} onPayment={setPaymentMethod} onUpi={setUpiId} onCouponInput={setCouponInput} onPlace={placeOrder} />}
    {selectedProduct && <ProductModal product={selectedProduct} isWishlisted={wishlist.some((item) => item.id === selectedProduct.id)} onClose={() => setSelectedProduct(null)} onAdd={addToCart} onBuy={(product, quantity) => { addToCart(product, quantity); setSelectedProduct(null); setIsCartOpen(true) }} onWishlist={toggleWishlist} onReview={(product) => { setSelectedProduct(null); setReviewProduct(product); setReviewRating(0) }} />}
    {reviewProduct && <ReviewModal product={reviewProduct} rating={reviewRating} text={reviewText} onClose={() => setReviewProduct(null)} onRating={setReviewRating} onText={setReviewText} onSubmit={submitReview} />}
    {confirmation && <ConfirmationModal order={confirmation} onClose={() => setConfirmation(null)} />}
    {isProfileOpen && <ProfilePanel tab={profileTab} setTab={setProfileTab} wishlist={wishlist} orders={orders} onClose={() => setIsProfileOpen(false)} onOpen={openProduct} onAdd={addToCart} onRemoveWishlist={toggleWishlist} />}
  </div>
}

function ProductCard({ product, isWishlisted, onOpen, onAdd, onWishlist, onReview }) { return <article className="product-card"><div className="product-image"><img src={product.image} alt={product.title} /><span>{product.category}</span><button className={`heart-button ${isWishlisted ? 'liked' : ''}`} type="button" onClick={() => onWishlist(product)} aria-label="Toggle wishlist">{isWishlisted ? '♥' : '♡'}</button><button className="add-button" type="button" onClick={() => onAdd(product)} aria-label={`Add ${product.title} to cart`}>+</button></div><button className="product-main" type="button" onClick={() => onOpen(product)}><div className="product-info"><div><h3>{product.title}</h3><p>{product.description}</p></div><strong>{formatPrice(product.price)}</strong></div><div className="price-meta"><del>{formatPrice(product.originalPrice)}</del><b>{product.discount}% off</b></div><div className="rating">★★★★★ <span>{product.rating} ({product.reviewCount})</span></div><div className="availability">Available worldwide</div></button><button className="review-button" type="button" onClick={() => onReview(product)}>See reviews · Write a review</button></article> }
function CartDrawer({ cart, itemCount, subtotal, discount, coupon, couponInput, couponMessage, cgst, sgst, delivery, total, paymentMethod, upiId, paymentMessage, onClose, onQuantity, onCoupon, onClearCoupon, onPayment, onUpi, onCouponInput, onPlace }) { return <div className="overlay" onClick={onClose}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-heading"><div><p className="eyebrow">YOUR CART</p><h2>{itemCount} {itemCount === 1 ? 'item' : 'items'}</h2></div><button type="button" onClick={onClose}>×</button></div>{!cart.length ? <div className="empty-cart"><span>○</span><h3>Your cart is waiting.</h3><p>Add something thoughtful to get started.</p><button type="button" onClick={onClose}>Continue shopping</button></div> : <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div><b>{item.title}</b><small>{formatPrice(item.price)}</small><div className="quantity"><button type="button" onClick={() => onQuantity(item.id, -1)}>−</button><span>{item.quantity}</span><button type="button" onClick={() => onQuantity(item.id, 1)}>+</button><button className="remove-item" type="button" onClick={() => onQuantity(item.id, -item.quantity)}>Remove</button></div></div></div>)}</div><div className="checkout"><div className="coupon-row"><input value={couponInput} onChange={(event) => onCouponInput(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && onCoupon()} placeholder="Coupon code" /><button type="button" onClick={onCoupon}>Apply</button></div><small className={coupon ? 'coupon-message success' : 'coupon-message'}>{couponMessage}</small>{coupon && <button className="remove-coupon" type="button" onClick={onClearCoupon}>Remove coupon</button>}<div className="payment-options"><p>Payment method</p><label><input type="radio" name="payment" checked={paymentMethod === 'upi'} onChange={() => onPayment('upi')} /> UPI</label><label><input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => onPayment('cod')} /> Cash on Delivery</label>{paymentMethod === 'upi' && <input className="upi-input" value={upiId} onChange={(event) => onUpi(event.target.value)} placeholder="Enter UPI ID, e.g. name@upi" />}{paymentMessage && <small className="payment-message">{paymentMessage}</small>}</div><PriceRow label="Subtotal" value={subtotal} />{coupon && <PriceRow label={`Discount (${coupon}%)`} value={-discount} savings />}<PriceRow label="CGST (9%)" value={cgst} /><PriceRow label="SGST (9%)" value={sgst} /><PriceRow label="Delivery" value={delivery} free={delivery === 0} /><div className="total-row"><span>Total</span><b>{formatPrice(total)}</b></div><button className="checkout-button" type="button" onClick={onPlace}>Place order <span>↗</span></button></div></>}</aside></div> }
function PriceRow({ label, value, savings, free }) { return <div className={`price-row ${savings ? 'savings' : ''}`}><span>{label} {free && <small>Free above ₹5,000</small>}</span><b>{free ? 'FREE' : formatPrice(value)}</b></div> }
function ProductModal({ product, isWishlisted, onClose, onAdd, onBuy, onWishlist, onReview }) { const [quantity, setQuantity] = useState(1); return <div className="overlay" onClick={onClose}><div className="product-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" type="button" onClick={onClose}>×</button><img src={product.image} alt={product.title} /><div className="product-modal-copy"><p className="eyebrow">{product.category}</p><h2>{product.title}</h2><div className="rating">★★★★★ <span>{product.rating} · {product.reviewCount} reviews</span></div><div className="modal-price"><b>{formatPrice(product.price)}</b><del>{formatPrice(product.originalPrice)}</del><span>{product.discount}% off</span></div><p>{product.description} Designed for reliable everyday use with worldwide availability.</p><strong className="modal-stock">✓ In stock · Available worldwide</strong><div className="modal-actions"><div className="quantity"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><span>{quantity}</span><button type="button" onClick={() => setQuantity(quantity + 1)}>+</button></div><button className="modal-cart" type="button" onClick={() => { onAdd(product, quantity); onClose() }}>Add to cart</button><button className="modal-buy" type="button" onClick={() => onBuy(product, quantity)}>Buy now</button></div><button className={`wishlist-action ${isWishlisted ? 'liked' : ''}`} type="button" onClick={() => onWishlist(product)}>{isWishlisted ? '♥ Remove from wishlist' : '♡ Add to wishlist'}</button><button className="modal-reviews" type="button" onClick={() => onReview(product)}>Read customer reviews</button><div className="review-preview">{product.reviews.slice(0, 2).map((review) => <div key={`${review.name}-${review.text}`}><b>{review.name} · {'★'.repeat(review.rating)}</b><p>{review.text}</p></div>)}</div></div></div></div> }
function ReviewModal({ product, rating, text, onClose, onRating, onText, onSubmit }) { return <div className="overlay" onClick={onClose}><form className="review-modal" onSubmit={onSubmit} onClick={(event) => event.stopPropagation()}><button className="modal-close" type="button" onClick={onClose}>×</button><p className="eyebrow">CUSTOMER REVIEW</p><h2>How was your {product.title}?</h2><div className="review-stars">{[1, 2, 3, 4, 5].map((star) => <button type="button" className={star <= rating ? 'selected' : ''} key={star} onClick={() => onRating(star)}>★</button>)}</div><textarea value={text} onChange={(event) => onText(event.target.value)} placeholder="Tell us what you think (optional)" rows="4" /><button className="submit-review" type="submit" disabled={!rating}>Submit review</button></form></div> }
function ConfirmationModal({ order, onClose }) { return <div className="overlay" onClick={onClose}><div className="confirmation-modal" onClick={(event) => event.stopPropagation()}><span className="confirmation-icon">✓</span><p className="eyebrow">BUNOVA ORDER</p><h2>Order Confirmed</h2><b className="order-id">{order.id}</b><div className="order-steps"><span className="done">✓<small>Confirmed</small></span><span className="done">✓<small>Packed</small></span><span>○<small>Shipped</small></span><span>○<small>Delivered</small></span></div><div className="confirmation-items">{order.items.map((item) => <p key={item.id}><span>{item.title} × {item.quantity}</span><b>{formatPrice(item.price * item.quantity)}</b></p>)}</div><div className="confirmation-details"><p><span>Order date</span><b>{order.date}</b></p><p><span>Total</span><b>{formatPrice(order.total)}</b></p><p><span>Payment</span><b>{order.paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery'}</b></p><p><span>Delivery</span><b>Worldwide delivery</b></p></div><button className="checkout-button" type="button" onClick={onClose}>Continue shopping</button></div></div> }
function ProfilePanel({ tab, setTab, wishlist, orders, onClose, onOpen, onAdd, onRemoveWishlist }) { const tabs = ['profile', 'orders', 'wishlist', 'addresses', 'payments']; return <div className="overlay" onClick={onClose}><aside className="profile-panel" onClick={(event) => event.stopPropagation()}><div className="drawer-heading"><div className="profile-heading"><div className="profile-avatar">C</div><div><p className="eyebrow">BUNOVA PROFILE</p><h2>Welcome back</h2><small>customer@bunova.store</small></div></div><button type="button" onClick={onClose}>×</button></div><div className="profile-nav">{tabs.map((item) => <button className={tab === item ? 'active' : ''} type="button" key={item} onClick={() => setTab(item)}>{item === 'profile' ? 'My Profile' : item === 'orders' ? 'My Orders' : item === 'wishlist' ? `Wishlist (${wishlist.length})` : item === 'addresses' ? 'Saved Addresses' : 'Payment Methods'}</button>)}<button type="button" onClick={onClose}>Logout</button></div>{tab === 'profile' && <div className="profile-content"><h3>My Profile</h3><div className="profile-facts"><p><span>Name</span><b>Everyday shopper</b></p><p><span>Email</span><b>customer@bunova.store</b></p><p><span>Delivery</span><b>Worldwide available</b></p></div><p className="profile-note">Your profile is stored locally for this demo. No account or backend authentication is required.</p></div>}{tab === 'orders' && <div className="profile-content"><h3>My Orders ({orders.length})</h3>{orders.length ? orders.map((order) => <article className="order-card" key={order.id}><div><b>{order.id}</b><small>{order.date} · {order.paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery'}</small></div><strong>{formatPrice(order.total)}</strong><ul>{order.items.map((item) => <li key={item.id}>{item.title} × {item.quantity}</li>)}</ul><span className="order-status">Confirmed → Packed → Shipped → Delivered</span></article>) : <EmptyPanel text="Your orders will appear here after checkout." />}</div>}{tab === 'wishlist' && <div className="profile-content"><h3>Wishlist ({wishlist.length})</h3>{wishlist.length ? <div className="wishlist-list">{wishlist.map((product) => <div className="wishlist-row" key={product.id}><img src={product.image} alt="" /><button type="button" onClick={() => onOpen(product)}><b>{product.title}</b><small>{formatPrice(product.price)}</small></button><button type="button" onClick={() => onAdd(product)}>Add to cart</button><button type="button" onClick={() => onRemoveWishlist(product)} aria-label="Remove from wishlist">×</button></div>)}</div> : <EmptyPanel text="Save products here to find them later." />}</div>}{tab === 'addresses' && <div className="profile-content"><h3>Saved Addresses</h3><div className="saved-box"><b>Home</b><p>Demo address, Bengaluru, Karnataka 560001</p><small>Used for worldwide delivery demo</small></div></div>}{tab === 'payments' && <div className="profile-content"><h3>Payment Methods</h3><div className="saved-box"><b>UPI</b><p>Payment details are requested securely at checkout.</p></div><div className="saved-box"><b>Cash on Delivery</b><p>Available for eligible orders.</p></div></div>}</aside></div> }
function EmptyPanel({ text }) { return <div className="empty-panel"><span>□</span><p>{text}</p></div> }

export default App
