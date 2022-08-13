import React, { useContext, useEffect, useState } from "react";
import Countdown from "react-countdown";
import { toast } from "react-toastify";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import GeneralContext from "../contexts/GeneralContext";

import "./ShoppingCart.scss";

const ShoppingCart = (props) => {
  const [cartCompleted, setCartCompleted] = useState(false);
  const { cart, setCart, url} = useContext(GeneralContext);
  // console.log("khaled", cart);

  useEffect(() => {
    // console.log("cart", cart);
    axios.get(`${url}/orders/validation`).then((res) => {
      const updatedInfo = res.data.updatedInfo;
      // console.log(updatedInfo);
      const updateCart = cart.map((product) => {
        const goodData = updatedInfo.filter(
          (row) => row.barcode === product.barcode
        )[0];

        if (goodData.qty > 0 && product.quantity > goodData.qty) {
          return {
            ...product,
            availability: goodData.qty,
            price: goodData.price,
            quantity: goodData.qty,
          };
        } else {
          return {
            ...product,
            availability: goodData.qty,
            price: goodData.price,
          };
        }
      });
      setCart(updateCart.filter((row) => row.availability !== 0));
    });
  }, [url]); // eslint-disable-line

  useEffect(() => {
    const timeout = setTimeout(() => {
      props.setCartClick(false);
    },600000)
    return (() => {
      clearTimeout(timeout);
    })
  }, [cart]); // eslint-disable-line
    

  const onRemoveClick = (barcode) => {
    setCart((pre) => pre.filter((item) => !(barcode === item.barcode)));
    if (cart.length === 1) {
      // we choose === 1 because the setState is asynchronous
      props.setCartClick(false);
    }
  };

  const totalEndPrice = cart.reduce((total, item) => {
    // console.log('price price', item.price)
    const totalPriceOfEachProduct = (item.quantity / 100) * item.price;
    // console.log('all product prices', totalPriceOfEachProduct);
    return totalPriceOfEachProduct + total;
  }, 0);
  const taxes = (totalEndPrice * 13) / 100;
  const totalAfterTaxes = ((totalEndPrice + taxes) * 100).toFixed(2);

  const cartItemsNumber = cart.reduce((pre, cur) => pre + cur.quantity, 0);

  async function handleToken(token, addresses) {
    let response;
    try {
      response = await axios.post(`${url}/orders`, {
        token,
        cart,
      });
      // console.log("stripe response", response);
    } catch (error) {
      // console.log('stripe response error', error);
    }
    
    // console.log('stripe response', response)
    if (response.data.status === 'success') {
      toast("Successful Payment", { type: "success" });
      setCart([]);
      setCartCompleted(true);
      // POST DATA to DB
      // axios.post('/', { cart })
    } else if (response.data.status === 'failure'){
      toast("Payment is not successful", { type: "error" });
    }
  }

  // console.log('stripe', process.env.REACT_APP_STRIPE_KEY);

  return (
    <div ref={props.modalRef} className="overlay-style">
      <div className="background">
        {cartCompleted ? (
          <div className="notes-and-shopping-button">
            <div className="thank-you-note">
              Thank you for choosing The Shoebox!
            </div>
            <br />
            <div className="enjoy-note">Enjoy your purchase!</div>
            <button
              className="continue-shopping"
              onClick={() => {
                props.setCartClick(false);
              }}
            >
              Back to The Shoebox
            </button>
          </div>
        ) : (
          <>
            {cart.length > 0 ? (
              <>
                <h1 className="cart-title">Shopping Cart</h1>
                <div className="align-top-shopping">
                  <button
                    className="top-continue-shopping"
                    onClick={() => {
                      props.setCartClick(false);
                    }}
                  >
                    Continue Shopping
                  </button>
                </div>
                <div className="cart-main-layout">
                  <Countdown className="timer" date={Date.now() + 600000} />
                  <div className="item-number">
                    {cartItemsNumber === 1
                      ? "1 item"
                      : `${cartItemsNumber} items`}
                  </div>
                  <table>
                    <thead>
                      <tr className="headers">
                        <th style={{ paddingLeft: "30px" }}>
                          Item Description
                        </th>
                        <th style={{ textAlign: "center" }}>Quantity</th>
                        <th style={{ textAlign: "center" }}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item, index) => {
                        // console.log(item);
                        return (
                          <tr key={item.barcode}>
                            <td className="image-to-data">
                              <div>
                                <img
                                  src={item.image1}
                                  alt="image1"
                                  width="220"
                                  height="220"
                                />
                              </div>
                              <div>
                                <div className="item-name">{item.name}</div>
                                <div className="data-below-name">
                                  <div># {item.barcode}</div>
                                  <div style={{ marginBottom: "10px" }}>
                                    Size: {item.size}
                                  </div>
                                  <div style={{ marginBottom: "10px" }}>
                                    Color: {item.color}
                                  </div>
                                </div>
                                <button
                                  onClick={() => onRemoveClick(item.barcode)}
                                  className="remove-button"
                                >
                                  <FontAwesomeIcon
                                    icon="fa-solid fa-trash-can"
                                    style={{ paddingRight: "5px" }}
                                  />
                                  Remove Item
                                </button>
                              </div>
                            </td>
                            <td className="quantity-and-price">
                              <button className="btn-plus-minus"
                                onClick={() =>{
                                  if (item.quantity > 1) {
                                    const newCart = cart.map((row) => {
                                      if (row.barcode === item.barcode) {
                                        return {
                                          ...row,
                                          quantity: item.quantity - 1,
                                        };
                                      } else {
                                        return { ...row };
                                      }
                                    });
                                    setCart(newCart);
                                 }}}
                              >
                                <FontAwesomeIcon icon="fa-solid fa-square-minus" />
                              </button>
                              <span className="cart-item-qty"> {item.quantity} </span>
                              <button className="btn-plus-minus"
                                onClick={() =>{
                                  if (item.quantity < item.availability) {
                                    const newCart = cart.map((row) => {
                                      if (row.barcode === item.barcode) {
                                        return {
                                          ...row,
                                          quantity: item.quantity + 1,
                                        };
                                      } else {
                                        return { ...row };
                                      }
                                    });
                                    setCart(newCart);
                                 }}}
                              >
                                <FontAwesomeIcon icon="fa-solid fa-square-plus" />
                              </button>
                            </td>
                            <td className="quantity-and-price">
                              CAD {(item.price / 100) * item.quantity}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div>
                    <div className="totals">
                      <h4 style={{ marginBottom: "1em" }}>
                        <div className="total-and-sub">
                          <div>Estimated GST/HST:</div>
                          <div>CAD {taxes.toFixed(2)}</div>
                        </div>
                      </h4>
                      <h3
                        style={{ marginTop: "0" }}
                        className="total-end-price"
                      >
                        <div className="total-and-sub">
                          <div>Total: </div>
                          <div>CAD {(totalEndPrice + taxes).toFixed(2)}</div>
                        </div>
                      </h3>
                    </div>
                    <div className="checkout-and-shopping">
                      <button
                        className="continue-shopping"
                        onClick={() => {
                          props.setCartClick(false);
                        }}
                      >
                        Continue Shopping
                      </button>
                      <StripeCheckout
                        stripeKey={process.env.REACT_APP_STRIPE_KEY}
                        token={handleToken}
                        amount={Math.floor(totalAfterTaxes)}
                        billingAddress
                        // shippingAddress
                        label="Checkout"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
