import React from 'react';

import "../styles/ContactUs.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
library.add(faGithub, faLinkedin);

function ContactUs(props) {
  return (
    <div className='contact-overlay-style'>
      <div className='contact-background' ref={props.modalRef}>
        <div className='team-for-column'>
          The Team
        </div>
        <div className='info'>
          <img className='contact-img' src='https://res.cloudinary.com/khaled-cloud/image/upload/v1660412452/Screen_Shot_2022-08-13_at_1.39.57_PM_kxvay1.png' alt='farzaneh' />
          <div className='name'>Farzaneh Akhounsadegh</div>
          <div className='job'>Full Stack Web Developer</div>
          <div style={{ paddingTop: '5px' }}>
            <a href='https://www.linkedin.com/in/farzanehsadegh/' target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon="fa-brands fa-linkedin" className='contact-icon' /></a>
            <a href='https://github.com/FarzanehSa' target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon icon="fa-brands fa-github" className='contact-icon' /></a>
          </div>
        </div>
        <div className='team'>
          The Team
        </div>
        <div className='info'>
          <img className='contact-img' src='https://res.cloudinary.com/khaled-cloud/image/upload/v1660412452/Screen_Shot_2022-08-13_at_1.40.26_PM_kuvneq.png' alt='khaled' />
          <div className='name'>Khaled Alkhatib</div>
          <div className='last-name' ></div>
          <div className='job'>Front End Web Developer</div>
          <div style={{ paddingTop: '5px' }}>
            <a href='https://www.linkedin.com/in/khaledalkhatib/' target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon icon="fa-brands fa-linkedin" className='contact-icon' /></a>
            <a href='https://github.com/Khaled91Alkhatib' target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon icon="fa-brands fa-github" className='contact-icon' /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;