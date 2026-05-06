import { FaShoppingCart } from "react-icons/fa";

function navBar({ cart, setView }) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

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
                    {totalItems > 0 && (
                        <span className="nav-icon-counter">{totalItems}</span>
                    )}
                    <FaShoppingCart className="product-cart-icon" />
                </div>
            </nav>
        </>
    );
}


export default navBar;
