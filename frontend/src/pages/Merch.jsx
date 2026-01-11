import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import '../css/Merch.css';

const PRODUCTS = [
  { id: 1, name: "STI Carbon Chronograph Limited Edition", category: "Accessories", price: 499, image: "images/home_page/watch.jpg", badge: "Limited" },
  { id: 2, name: "Subaru Technical Softshell Jacket", category: "Apparel", price: 249, image: "images/home_page/jacket.jpg", badge: "New Arrival" },
  { id: 3, name: "1:18 Scale BRZ (World Rally Blue)", category: "Collectibles", price: 359, image: "images/home_page/model.jpg", badge: null },
  { id: 4, name: "Matte Black Tumbler (750ml)", category: "Accessories", price: 49, image: "images/home_page/tumbler.jpg", badge: "Best Seller" },
  { id: 5, name: "Performance Driving Gloves", category: "Apparel", price: 89, image: "images/home_page/gloves.jpg", badge: null },
  { id: 6, name: "Titanium Exhaust Tip Paperweight", category: "Collectibles", price: 59, image: "images/home_page/paperweight.jpg", badge: "Rare" }
];

const Merch = () => {
  const [filter, setFilter] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Checkout State
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  // NEW: Loading State
  const [isSending, setIsSending] = useState(false);

  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  // 1. Load Cart on Mount
  useEffect(() => {
    const storedCart = localStorage.getItem('subaru_cart');
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  // 2. Add to Cart Logic
  const addToCart = (product) => {
    const updatedCart = [...cartItems];
    const existingItem = updatedCart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCartItems(updatedCart);
    localStorage.setItem('subaru_cart', JSON.stringify(updatedCart));
    setIsCartOpen(true); 
  };

  // 3. Remove Item Logic
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('subaru_cart', JSON.stringify(updatedCart));
  };

  // 4. Handle Form Changes
  const handleInputChange = (e) => {
    setCheckoutForm({ ...checkoutForm, [e.target.name]: e.target.value });
  };

  // 5. EMAILJS SUBMIT LOGIC (FIXED)
  const handleOrderSubmit = (e) => {
    e.preventDefault();

    console.log("Submit clicked. Validating cart..."); // DEBUG

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Set Loading to TRUE (Button will change text)
    setIsSending(true);

    // A. Create a clean string of items for the email
    const orderDetails = cartItems.map(item => 
      `${item.name} (x${item.quantity}) - RM ${item.price * item.quantity}`
    ).join('\n');

    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // B. Prepare params
    const templateParams = {
      name: checkoutForm.name,
      email: checkoutForm.email,
      phone: checkoutForm.phone,
      date: new Date().toLocaleDateString(),
      car: `MERCH ORDER: \n${orderDetails}\nTOTAL: RM ${total}`,
      location: checkoutForm.address
    };

    console.log("Sending with params:", templateParams); // DEBUG

    // C. Send using the IDs provided
    emailjs.send(
      "service_7dqkhk8",     
      "template_6csqik5",    
      templateParams,
      "knfOXiPoTqfZ9Vr6g"    
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert("Order successfully placed! We will contact you for payment.");
      setCartItems([]);
      localStorage.removeItem('subaru_cart');
      setIsCartOpen(false);
      setIsCheckingOut(false);
      setCheckoutForm({ name: "", email: "", phone: "", address: "" });
      setIsSending(false); // Turn off loading
    })
    .catch((err) => {
      console.error("FAILED...", err);
      alert("Failed to send order. Please check the console (F12) for the error.");
      setIsSending(false); // Turn off loading
    });
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const filteredProducts = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="merch-page">
      <div className="merch-header">
        <h1 className="merch-title">Engineered <span style={{color:'#fff'}}>Lifestyle</span></h1>
        <p className="merch-subtitle">Official High-Performance Equipment</p>
      </div>

      <div className="merch-filters">
        {["All", "Apparel", "Accessories", "Collectibles"].map((cat) => (
          <button key={cat} className={`filter-btn ${filter === cat ? 'active' : ''}`} onClick={() => setFilter(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div className="merch-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="merch-card product-card">
            <div className="product-img-box">
              {product.badge && <span className="product-badge">{product.badge}</span>}
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <span className="product-cat">{product.category}</span>
              <h3 className="product-name">{product.name}</h3>
              <div className="product-footer">
                <span className="product-price">RM {product.price}</span>
                <button className="add-cart-btn" onClick={() => addToCart(product)}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="floating-cart-btn" onClick={() => setIsCartOpen(true)}>
        CART ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
      </button>

      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}></div>

      {/* --- CART DRAWER LOGIC --- */}
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>{isCheckingOut ? "CHECKOUT" : "YOUR GEAR"}</h2>
          <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>&times;</button>
        </div>

        {/* CONDITION: If Checking Out, Show Form. Else, Show List. */}
        {isCheckingOut ? (
          <div className="checkout-container">
            <button className="back-to-cart-btn" onClick={() => setIsCheckingOut(false)}>
              ← Back to Cart
            </button>
            <form className="checkout-form" onSubmit={handleOrderSubmit}>
              <input type="text" name="name" placeholder="Full Name" required onChange={handleInputChange} value={checkoutForm.name} />
              <input type="email" name="email" placeholder="Email Address" required onChange={handleInputChange} value={checkoutForm.email} />
              <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleInputChange} value={checkoutForm.phone} />
              <textarea name="address" placeholder="Shipping Address" rows="3" required onChange={handleInputChange} value={checkoutForm.address}></textarea>
              
              <div className="cart-total" style={{marginTop: '20px'}}>
                <span>TOTAL TO PAY</span>
                <span style={{color: '#c9a959'}}>RM {cartTotal.toLocaleString()}</span>
              </div>
              
              {/* UPDATED BUTTON: Shows Loading State */}
              <button 
                className="checkout-btn" 
                type="submit" 
                disabled={isSending}
                style={{ opacity: isSending ? 0.7 : 1, cursor: isSending ? 'not-allowed' : 'pointer' }}
              >
                {isSending ? "SENDING ORDER..." : "CONFIRM ORDER"}
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.length === 0 ? (
                <p className="empty-cart-msg">Your cart is empty.</p>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">RM {item.price}</span>
                      <span className="item-qty">x{item.quantity}</span>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>&times;</button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>TOTAL</span>
                  <span style={{color: '#c9a959'}}>RM {cartTotal.toLocaleString()}</span>
                </div>
                <button className="checkout-btn" onClick={() => setIsCheckingOut(true)}>
                  PROCEED TO CHECKOUT
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Merch;