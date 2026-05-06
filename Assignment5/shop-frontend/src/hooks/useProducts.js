import { useState, useEffect } from "react";

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const syncCartWithProducts = (freshProducts, currentCart) => {
        return currentCart.map((item) => {
            const fresh = freshProducts.find((p) => p.id === item.id);
            if (fresh) {
                const availableQuantity =
                    item.quantity > fresh.stock ? fresh.stock : item.quantity;
                return { ...fresh, quantity: availableQuantity };
            }
            return { ...item, stock: 0 };
        });
    };

    const fetchProducts = () => {
        fetch("http://localhost:8080/product", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) throw new Error("Błąd sieci!");
                return response.json();
            })
            .then((myJson) => {
                setProducts(myJson);
                setCart((prevCart) => syncCartWithProducts(myJson, prevCart));
            })
            .catch((error) => {
                console.error("Get json error: ", error);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addToCart = (product) => {
        const freshProduct =
            products.find((p) => p.id === product.id) || product;
        const existingItem = cart.find((item) => item.id === product.id);
        const currentQuantity = existingItem ? existingItem.quantity : 0;

        if (currentQuantity + 1 > freshProduct.stock) {
            throw new Error(
                "Cannot add product to cart. The request quantity is greater than avaliable stock",
            );
        }

        setCart((prevCart) => {
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                );
            }
            return [...prevCart, { ...freshProduct, quantity: 1 }];
        });
    };

    const updateQuantity = (productId, delta) => {
        const freshProduct = products.find((p) => p.id === productId);
        const itemInCart = cart.find((item) => item.id === productId);
        if (!itemInCart) return;

        const newQuantity = itemInCart.quantity + delta;

        if (delta > 0) {
            const limit = freshProduct ? freshProduct.stock : itemInCart.stock;
            if (newQuantity > limit) {
                throw new Error(
                    "Cannot increase quantity. Not enough stock available.",
                );
            }
        }

        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === productId
                        ? {
                              ...item,
                              ...(freshProduct || {}),
                              quantity: Math.max(0, newQuantity),
                          }
                        : item,
                )
                .filter((item) => item.quantity > 0),
        );
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };

    const buyItems = async () => {
        const response = await fetch("http://localhost:8080/product/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ items: cart }),
            redirect: "follow",
        });

        const data = await response.json();

        if (!response.ok) {
            if (data.products) {
                setProducts(data.products);
                setCart((prevCart) =>
                    syncCartWithProducts(data.products, prevCart),
                );
            }
            throw new Error(data.error || "Błąd podczas zakupu");
        }

        setProducts(data);
        setCart((prevCart) => syncCartWithProducts(data, prevCart));
        clearCart();
        return "Zakup zakończony pomyślnie!";
    };

    return {
        products,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        buyItems,
    };
}
