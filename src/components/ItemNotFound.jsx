import React from 'react';

import "../styles/ItemNotFound.scss";

const ItemNotFound = () => {

  return (
    <div className='no-item-found'>
      <h2>NO RESULTS FOUND.</h2>
      <h4>BUT HERE ARE SOME ITEMS YOU MAY LIKE</h4>
    </div>
  );
};

export default ItemNotFound;