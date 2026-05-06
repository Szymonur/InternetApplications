import { FaCartPlus } from "react-icons/fa";

function Products({ products, addToCart }) {
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
                                    className="product-cart-icon"
                                    onClick={() => addToCart(p)}
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
}

export default Products;
