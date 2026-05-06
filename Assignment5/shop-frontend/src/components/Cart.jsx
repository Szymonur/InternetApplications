import { FaTrashAlt, FaMinus, FaPlus } from "react-icons/fa";

function Cart({ cart, setView, updateQuantity, removeFromCart, buyItems }) {
    const totalPrice = cart
        .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
        .toFixed(2);

    const handleUpdateQuantity = (id, delta) => {
        try {
            updateQuantity(id, delta);
        } catch (e) {
            console.warn(e);
            alert(
                "Nie można zwiększyć ilości - brak wystarczającej liczby produktów w magazynie.",
            );
        }
    };

    const handleBuy = async () => {
        try {
            const message = await buyItems();
            alert(message);
            setView("products");
        } catch (e) {
            console.error(e);
            alert("Błąd podczas zakupu: " + e.message);
        }
    };

    return (
        <div className="cart-container">
            <h2>Twój Koszyk</h2>
            {cart.length === 0 ? (
                <p className="empty-cart-message">Koszyk jest pusty.</p>
            ) : (
                <div className="cart-list">
                    {cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <div className="item-details">
                                <h3>{item.title}</h3>
                                <p>{item.price} zł</p>
                            </div>
                            <div className="product-stock">
                                Dostępność: {item.stock} szt.
                            </div>
                            <div className="cart-actions">
                                <FaMinus
                                    onClick={() =>
                                        handleUpdateQuantity(item.id, -1)
                                    }
                                    className="icon"
                                />
                                <span className="cart-item-quantity">
                                    {item.quantity}
                                </span>
                                <FaPlus
                                    onClick={() =>
                                        handleUpdateQuantity(item.id, 1)
                                    }
                                    className="icon"
                                />
                                <FaTrashAlt
                                    className="remove-icon icon"
                                    onClick={() => removeFromCart(item.id)}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="cart-summary">
                        <h3>Suma: {totalPrice} zł</h3>
                    </div>
                </div>
            )}
            <div className="cart-buttons">
                <button
                    className="back-button"
                    onClick={() => setView("products")}
                >
                    Wróć do zakupów
                </button>

                <button 
                    className="buy-button" 
                    onClick={handleBuy}
                    disabled={cart.length === 0}
                >
                    Kup
                </button>
            </div>
        </div>
    );
}

export default Cart;
