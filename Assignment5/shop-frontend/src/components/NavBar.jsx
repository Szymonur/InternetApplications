import { FaShoppingCart } from "react-icons/fa";

function navBar({ cart, setView }) {
    return (
        <>
            <nav>
                <div 
                    className="nav-title" 
                    onClick={() => setView("products")}
                    style={{ cursor: "pointer" }}
                >
                    Sklep Wspinaczkowy
                </div>
                <div 
                    className="nav-icon" 
                    onClick={() => setView("cart")}
                    style={{ cursor: "pointer" }}
                >
                    {cart.length > 0 && (
                        <span className="nav-icon-counter">{cart.length}</span>
                    )}
                    <FaShoppingCart className="product-cart-icon" />
                </div>
            </nav>
        </>
    );
}

export default navBar;
