function Cart({ cart, setView, updateQuantity, removeFromCart }) {
    const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0).toFixed(2);

    return (
        <div className="cart-container">
            <h2>Twój Koszyk</h2>
            {cart.length === 0 ? (
                <p>Koszyk jest pusty.</p>
            ) : (
                <div className="cart-list">
                    {cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <div className="item-details">
                                <h3>{item.title}</h3>
                                <p>{item.price} zł x {item.quantity}</p>
                            </div>
                            <div className="cart-actions">
                                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                <button className="remove-button" onClick={() => removeFromCart(item.id)}>
                                    Usuń
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="cart-summary">
                        <h3>Suma: {totalPrice} zł</h3>
                    </div>
                </div>
            )}
            <button className="back-button" onClick={() => setView("products")}>
                Wróć do zakupów
            </button>
        </div>
    );
}

export default Cart;
