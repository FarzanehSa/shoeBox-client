//  This componet is for product that shows in list of products
import React, {useContext, useEffect, useState} from 'react';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';

import Colors from '../components/SingleProductPage/Colors'

import '../styles/Product.scss';

const Product = ({product, colorOptions}) => {

  const [colorsFamily, setColorsFamily] = useState([]);
  const [productX, setProductX] = useState(product);

  useEffect(() => {
    const colors = colorOptions.map(row => {
      return (row.id === productX.id) ? {...row, selected: true} : {...row, selected: false}
    });
    setColorsFamily(colors);
  }, [productX]);

  const changeColorHandler = (pro) => {
    setProductX(pro);
  };

  return (

    <div className='product'>
      <NavLink  to={`${productX.id}`}>

      <p>
        <img className='product-image' src={`${productX.image1}`} alt="pro" width="317" height="317"/>
      </p>
      </NavLink>
      <Colors colorsFamily={colorsFamily} onColor={changeColorHandler} />
      <NavLink to={`${productX.id}`}>
      <div className='name-and-price'>
        <div className='name-only'>{productX.name}</div>
        <div className='price-only'>CAD {productX.price / 100}</div>
      </div>
      </NavLink>
    </div>
  );
};

export default Product;