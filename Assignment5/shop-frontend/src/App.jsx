import { useState } from "react";
import "./App.css";
import Products from "./components/Products.jsx";
import NavBar from "./components/NavBar.jsx";
import CartView from "./components/Cart.jsx";
import { useProducts } from "./hooks/useProducts.js";

function App() {
    const { products, addToCart, cart, updateQuantity, removeFromCart } = useProducts();
    const [view, setView] = useState("products"); // 'products' lub 'cart'

    return (
        <>
            <div className="container">
                <NavBar cart={cart} setView={setView} />
                {view === "products" ? (
                    <Products products={products} addToCart={addToCart} />
                ) : (
                    <CartView 
                        cart={cart} 
                        setView={setView} 
                        updateQuantity={updateQuantity} 
                        removeFromCart={removeFromCart} 
                    />
                )}
            </div>
        </>
    );
}

export default App;
