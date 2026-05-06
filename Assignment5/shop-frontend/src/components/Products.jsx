import { FaCartPlus } from "react-icons/fa";

function Products({ products, addToCart }) {
    const handleAddToCard = (p) => {
        try {
            addToCart(p);
        } catch (e) {
            console.warn(e);
            alert(
                "Nie można zwiększyć ilości - brak wystarczającej liczby produktów w magazynie.",
            );
        }
    };
    return (
        <>
            <div className="products">
                {products &&
                    products.map((p) => (
                        <div key={p.id} className="product-row">
                            <div className="product product-details">
                                <div className="product-title">{p.title}</div>
                                <div className="product-description">
                                    {p.description}
                                </div>
                            </div>
                            <div className="product-stock">
                                Dostępność: {p.stock} szt.
                            </div>
                            <div className="product-price">{p.price} zł</div>
                            <div className="product-cart">
                                <FaCartPlus
                                    className="product-cart-icon icon"
                                    onClick={() => handleAddToCard(p)}
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
}

export default Products;
