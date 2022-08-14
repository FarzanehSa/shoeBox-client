import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Reviews.scss';

const ThanksModal = ({onClose}) => {


  return (  
    <div className='thanks-page'>
      <button onClick={onClose} className="btn-close-modal"><FontAwesomeIcon icon="fa-solid fa-xmark" /></button>
      <p className='data-title'>THANK YOU!</p>
      <p className='paragraph-data'>
        We will process your review and publish it within 3-7 business days.
      </p>
    </div>
  );
};

export default ThanksModal;