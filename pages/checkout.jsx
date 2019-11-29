import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const Cart = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [cart, setCart] = React.useState([]);
  const [totalValue, setTotalValue] = React.useState(0);
  const [orderTitle, setOrderTitle] = React.useState("");

  React.useEffect(() => {
    setIsLoading(true);

    async function fetchCart() {
      const parsedStorage = JSON.parse(localStorage.getItem("cart"));
      parsedStorage.forEach(async cartItemId => {
        const { data } = await axios.get(
          `https://was-react-hackathon-fall-2019.firebaseio.com/products/${cartItemId}.json`
        );
        console.log(data);
        setCart(currentCart => [...currentCart, data]);
        setTotalValue(currentTotalValue => currentTotalValue + data["price"]);
      });
      setIsLoading(false);
    }

    fetchCart();
  }, []);

  const deleteCartItem = id => {
    const currentStorage = localStorage.getItem("cart");
    let parsedStorage = "";
    if (currentStorage) {
      parsedStorage = JSON.parse(currentStorage);
    }

    const newStorage = parsedStorage.filter(cartItem => cartItem !== id);
    localStorage.setItem("cart", JSON.stringify(newStorage));
  };

  const submitOrder = () => {
    alert(`${orderTitle} has been created!`);
  };

  return (
    <div>
      <h1>Checkout</h1>
      <label htmlFor="orderTitle" className="d-block h5">
        Name your order
      </label>
      <input
        type="text"
        classname="d-block"
        value={orderTitle}
        onChange={({ target }) => setOrderTitle(target.value)}
      />
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        cart &&
        cart.length > 0 &&
        cart.map(item => (
          <div key={item.id}>
            <CartItem {...item} />
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-danger"
                onClick={() => deleteCartItem(item.id)}
              >
                Delete item
              </button>
            </div>
          </div>
        ))
      )}
      {!isLoading && <p>Total value: ${totalValue}</p>}
      <button className="btn btn-primary" onClick={submitOrder}>
        Create order
      </button>
    </div>
  );
};

const CartItem = ({ id, name, price, images }) => {
  return (
    <Link href={`/products/[productId]`} as={`/products/${id}`} passHref>
      <a className="text-decoration-none">
        <div className="card mt-3">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h5 className="card-title mb-0">{name}</h5>
              <p className="text-success mb-0">${price}</p>
            </div>
          </div>
        </div>
        <style jsx>{`
          a:hover {
            text-decoration: none;
          }
        `}</style>
      </a>
    </Link>
  );
};

export default Cart;
