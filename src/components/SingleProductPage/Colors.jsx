import React from 'react';
import './Colors.scss';

const Colors = (props) => {

  const colorsArry = props.colorsFamily.map(product => {
    let myClass = "";
    if (product.selected) myClass = "color-selected";
    return (
      <div key={product.id}>
        <button 
          className={`${product.color.toLowerCase()} btn ${myClass}`} 
          onClick={() => props.onColor(product)}
        />
      </div>
    )
  })
  
  return (
    <div className='color-list'>
      {colorsArry}
    </div>
  );
};

export default Colors;