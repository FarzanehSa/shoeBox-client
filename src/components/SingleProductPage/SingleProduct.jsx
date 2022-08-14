import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { toast } from 'react-toastify';

import LinearProgress from "@mui/material/LinearProgress";
import Rating from '@mui/material/Rating';

import GeneralContext from "../../contexts/GeneralContext";
import NotExistPage from "../NotExistPage";
import Image from "./Image";
import Colors from "./Colors";
import Sizes from "./Sizes";
import Reviews from "./Reviews";

import "./SingleProduct.scss";

const SingleProduct = (props) => {
  const [id, setId] = useState(Number(useParams().id));
  const [product, setProduct] = useState({});
  const [availableSizes, setAvailableSizes] = useState([]);
  const [images, setImages] = useState([]);
  const [colorsFamily, setColorsFamily] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const [description, setDescription] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [resError, setResError] = useState(false)

  const { products, setCart, cart, url } = useContext(GeneralContext);

  // console.log("selectedSize", selectedSize)
  useEffect(() => {
    if (products) {
      getProductById(id);
    }
  }, [url]); // eslint-disable-line

  useEffect(() => {
    if (product.sku) {
      // find and set colorsFamily
      // specify which product's color is selected
      const productFamily = product.sku.slice(0, 4);
      const allColors = products
        .filter((product) => product.sku.slice(0, 4) === productFamily)
        .map((row) => {
          return row.id === product.id
            ? { ...row, selected: true }
            : { ...row, selected: false };
        });
      setColorsFamily(allColors);

      // make images array ready
      const imagesArray = [];
      if (product.image1) imagesArray.push(product.image1);
      if (product.image2) imagesArray.push(product.image2);
      if (product.image3) imagesArray.push(product.image3);
      setImages(imagesArray);

      // update the address bar when product has been changed
      window.history.replaceState(
        "",
        "",
        `/collection/${product.category}/${id}`
      );

      const descriptionArray = product.description
        .split("\n")
        .map((line, index) => {
          return <li key={index}>{line}</li>;
        });
      setDescription(descriptionArray);

      // reset selected size when product has been changed
      setSelectedSize({});
    }
  }, [products, product, id]);

  const getProductById = (id) => {
    axios.get(`${url}/api/products/${id}`).then((response) => {
      // console.log(Number(response.data.averageRating.avg));
      // handle success
      if (response.data.errCode === 1005) {setResError(true)}
      setAvailableSizes((prev) => response.data.availableSizes);
      if (response.data.product) {setProduct((prev) => response.data.product);}
      if (response.data.reviews) {setReviews((prev) => response.data.reviews);}
      if (response.data.averageRating) {setAvgRating((prev) => Number(response.data.averageRating.avg));}
    })
    .catch(error => {
      console.log(error.message);
    })
  };

  // image click left
  const rotateLeft = () => {
    const singleImage = images.shift();
    setImages((prev) => [...prev, singleImage]);
  };

  // image click right
  const rotateRight = () => {
    const singleImag = images.pop();
    setImages((prev) => [singleImag, ...prev]);
  };

  const changeColorHandler = (pro) => {
    setId(pro.id);
    getProductById(pro.id);
  };

  const onSelectSize = (data) => {
    setSelectedSize((prev) => data);
  };

  const addToCart = () => {

    const newCartItem = {
      barcode: selectedSize.barcode,
      size: selectedSize.size,
      availability: selectedSize.quantity,
      product_id: product.id,

      name: product.name,
      color: product.color,
      price: product.price,
      image1: product.image1,

      quantity: 1
    };

    // console.log('➕', newCartItem);

    const existingItemInCart = cart.find((item) => {
      return item.barcode === newCartItem.barcode;
    });

    // console.log("exists", existingObjectInCart);
    if (!existingItemInCart) {
      setCart([...cart, newCartItem]); // you can use prev here as well and spread it then add product
    } else {  
      if (existingItemInCart.quantity < selectedSize.quantity) {
        existingItemInCart.quantity += 1;
        setCart([...cart]);
      }
    }
  };

  // console.log("counter", counter)
  // console.log("👟", product);         // 🚨🚨🚨
  // console.log('⚫️⚪️',colorsFamily);    // 🚨🚨🚨
  // console.log('🗾',images);           // 🚨🚨🚨
  // console.log("◻️◾️", availableSizes);  // 🚨🚨🚨
  // console.log("💢", selectedSize);    // 🚨🚨🚨
  // console.log("🍾💩🍺", reviews);    // 🚨🚨🚨
  // console.log("⭐️", avgRating);    // 🚨🚨🚨

  return products && (
    <div className="single-product">       
      {products.length !== 0 && Object.keys(product).length !== 0 &&
        <div className="single-box">
          <div className="single-box-top">
            <div className="item-d-important single-p-column">
              <span className="product-name">{product.name}</span>
              <span className="product-price">${(product.price / 100).toFixed(2)}</span>
              <div><Rating name="average-rating" value={Number(avgRating)} readOnly /></div>
              <div className="s-p-sku">SKU #{product.sku} </div>
            </div>
            <div className="single-product-image">
              <Image
                images={images}
                onLeft={rotateLeft}
                onRight={rotateRight}
              />
            </div>
            <div className="item-details">
              <div className="item-d-important single-p-row">
                <div className="product-name">{product.name}</div>
                <div><Rating name="average-rating" value={Number(avgRating)} readOnly /></div>
                <div>SKU #{product.sku} </div>
                <div className="product-price">
                  ${(product.price / 100).toFixed(2)}
                </div>
              </div>
              <div className="p-color-size">
                <div className="product-color">
                  <span className="color-title">Color: {product.color}</span>
                  <Colors colorsFamily={colorsFamily} onColor={changeColorHandler} />
                </div>
                <div className="product-size">
                  <span className="product-size-title">Size:</span>
                  <Sizes
                    availableSizes={availableSizes}
                    onSelectSize={onSelectSize}
                    select={selectedSize} /*onAdd={onAdd}*/
                  />
                </div>
                <button
                  className="add-to-cart tool-tip"
                  disabled={!selectedSize.id}
                  onClick={addToCart}
                >
                  Add To Cart
                  <br />
                  <span className={selectedSize.id ? "tool-tip-text-disabled" : "tool-tip-text"}>Please Choose Size!</span>
                </button>
              </div>
              <br />
            </div>
          </div>
          <div className="single-product-description">
            <ul className="list">
              <span className="Desc-title">DESCRIPTION</span>
              <br />
              <br />
              {description}
            </ul>
          </div>
          <Reviews reviews={reviews} avgRating={avgRating} product={product}/>
        </div>
      }
      {products.length !== 0 && resError &&
        <NotExistPage />
      }
      {(products.length === 0 || Object.keys(product).length === 0) && !resError && (
        <div className="page-loading">
          <LinearProgress color="secondary" />
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
