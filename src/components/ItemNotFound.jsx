import React from 'react';

import "../styles/ItemNotFound.scss";

const ItemNotFound = () => {

  return (
    <div className='no-item-found'>
      <p className="data-title-main">NO RESULTS FOUND.</p>
      <p className="data-title">
        BUT HERE ARE SOME ITEMS YOU MAY LIKE
      </p>
    </div>
  );
};

export default ItemNotFound;