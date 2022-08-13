import React, {useState, useContext} from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import Rating from '@mui/material/Rating';

import GeneralContext from "../../contexts/GeneralContext";
import WriteReviewModal from './WriteReviewModal';
import ThanksModal from './ThanksModal';

import './Reviews.scss';

const Reviews = ({reviews, avgRating, product}) => {
  
  const [writeIsOpen, setWriteIsOpen] = useState(false);
  const [tnxIsOpen, setTnxIsOpen] = useState(false);
  const { url } = useContext(GeneralContext);

  function openWriteModal() {
    setWriteIsOpen(true);
  }
  function openTnxModal() {
    setTnxIsOpen(true);
  }
  function closeModal() {
    setWriteIsOpen(false);
    setTnxIsOpen(false);
  }

  const saveReview = (review) => {
    axios.post(`${url}/reviews`, {review})
    .then(res => {
      closeModal();
      openTnxModal();
    })
  }

  const commentsArray = reviews.map(review => {
    return (
      <section key={review.id} className="display-comment-section">
        <div className='comment-headline-rating'>
          <Rating name="rating" value={Number(review.rating)} readOnly size="small"/>
          <span> &nbsp;&nbsp;{review.headline}</span>
        </div>
        <span className='date'>{review.date}</span>
        <br />
        <br />
        <article>{review.comments}</article>
      </section>
    )
  });

  return (
    <div className='review-page-main' id="xxx">
      <div className='rating-summary'>
        <h3>{avgRating*20}% Customer Recommended </h3>
        <span>({reviews.length} reviews)</span>
        <br />
        <div><Rating name="average-rating" value={Number(avgRating)} readOnly /></div>
        <br />
        <button className='btn-write-review' onClick={openWriteModal}>WRITE A REVIEW</button>
        <Modal
          isOpen={writeIsOpen || tnxIsOpen}
          onRequestClose={closeModal}
          appElement={document.getElementById('root')}
          className="write-review-modal"
        >
          {writeIsOpen && <WriteReviewModal product={product} onClose={closeModal} onSubmit={saveReview}/>}
          {tnxIsOpen && <ThanksModal onClose={closeModal}/>}
        </Modal>
      </div>
      <div className='comments-container'>


        {commentsArray}


      </div>
    </div>
  );
};

export default Reviews;