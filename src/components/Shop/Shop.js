import React, { useEffect, useState } from "react";
import "./shop.css";
import Products from "./../Products/Products";
import Cart from "./../Cart/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { AddToDb, RemoveFromDb, getFromDb, AddChoosedItem } from "../../FakeDb";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [chooseProduct, setChooseProduct] = useState({});

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const storedCart = getFromDb();
    const previousCart = [];
    for (const id in storedCart) {
      const foundProduct = products.find((product) => product.id == id);
      if (foundProduct) {
        const quantity = storedCart[id];
        foundProduct.quantity = quantity;
        previousCart.push(foundProduct);
      }
    }
    setCart(previousCart);
  }, [products]);

  useEffect(() => {
    const storedChoosedItem = localStorage.getItem("choosed_item");
    const foundProduct = products.find(product => product.id == storedChoosedItem);
    if(foundProduct){
      setChooseProduct(foundProduct);
    }
  }, [products]);

  const cartHandler = (product) => {
    let newCart = [];
    const exists = cart.find((id) => id.id === product.id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      const rest = cart.filter((rest) => rest.id !== product.id);
      product.quantity = product.quantity + 1;
      newCart = [...rest, product];
    }
    setCart(newCart);
    AddToDb(product.id);
  };

  const removeItem = (item) => {
    const newCart = cart.filter((product) => product.id !== item.id);
    setCart(newCart);
    RemoveFromDb(item.id);
  };

  const removeChoosedItem = () => {
    setChooseProduct({});
    localStorage.removeItem("choosed_item")
  };

  const choose = () => {
    const random = Math.floor(Math.random() * products.length);
    const choosedItem = products[random];
    setChooseProduct(choosedItem);
    AddChoosedItem(choosedItem.id);
  };

  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((product) => (
          <Products
            key={product.id}
            product={product}
            cartHandler={cartHandler}
          ></Products>
        ))}
      </div>
      <div className="cart-container">
        <h4>Selected Items</h4>
        <div>
          {cart.map((item) => (
            <Cart key={item.id} item={item} removeItem={removeItem}></Cart>
          ))}
        </div>
        <button className="choose" onClick={choose}>
          {" "}
          Choose One{" "}
        </button>
        {Object.keys(chooseProduct).length > 0 && (
          <div className="choosed">
            <FontAwesomeIcon
              onClick={() => removeChoosedItem(chooseProduct)}
              className="icon"
              icon={faTrashCan}
            ></FontAwesomeIcon>
            <img className="w-25" src={chooseProduct.img} alt="" />
            <h6>{chooseProduct.name}</h6>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
