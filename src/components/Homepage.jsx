import React, { useState, useEffect } from "react";
import "../styles/Homepage.scss";

const Homepage = () => {

  const [photo1, setPhoto1] = useState(1);
  const [photo2, setPhoto2] = useState(10);
  const [photo3, setPhoto3] = useState(100);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  
  useEffect(() => {
    const rotatePhoto = setTimeout(() => {
      const sum = photo1 + photo2 + photo3;
      switch (sum) {
        case 111:
          setPhoto1(2);
          break;
        case 112:
          setPhoto2(20);
          break;
        case 122:
          setPhoto3(200);
          break;
        case 222:
          setPhoto1(1);
          break;
        case 221:
          setPhoto2(10);
          break;
        default:
          setPhoto3(100);
          break;
      }
    },10000);
    
    return (() => clearTimeout(rotatePhoto))
  },[photo1, photo2, photo3])

  return (
    <div style={{lineHeight:'1.6'}} className="homepage-layout">
      <div className="image-container">
        <img className="main-image" src={`../homeBackground-${photo1}.jpg`} alt="mainImage" />
        <img className="main-image" src={`../homeBackground-${photo2}.jpg`} alt="mainImage" />
        <img className="main-image" src={`../homeBackground-${photo3}.jpg`} alt="mainImage" />
      </div>
      <div className="text-under-image">
        <p className="data-title">
          Our Eaton Center location is open for Curbside Pickup, in-store shopping and delivery.
        </p>
        <p className="paragraph-data">
          The Shoebox is offering <strong>Free Shipping</strong> on all
          purchases. Please note the possibility of shipping delays due to
          unforeseen circumstances.
        </p>
        <p className="paragraph-data">
          Thank you for your patience and support. Stay safe and comfortable.
        </p>
      </div>
      <br />
      <div className="map-and-info">
        <div className="location-and-hours">
          <span className="location">
            <strong >
              Location:
            </strong>
          </span>
          <div className="l-h-info">
            <span>Eaton Center</span>
            <span>220 Yonge St, Toronto, ON M5B 2H1</span>
            <br />
            <br />
          </div>
        </div>
        <div className="location-and-hours">
          <span className="hours">
            <strong >
              Shop Hours:
            </strong>
          </span>
          <div className="l-h-info">
            <span>Monday - Friday: 10 - 5</span>
            <span>Saturday: 10 - 6</span>
            <span>Sunday: 10 - 4</span>
          </div>
        </div>
      </div>
      <br />
      <div className="complimentary-info">
        <p className="data-title">Complimentary Boot Care Service:</p>
        <p className="paragraph-data">
          Complimentary boot cleaning, polishing and conditioning service is
          available at our locations for our customers. (even if you purchased
          your boots from another retailer!).{" "}
        </p>
        <p className="paragraph-data">
          Please note the cleaning portion of this service applies to the upper
          of the boots only and not the sole. Please ensure the soles of your
          dropped-off boots are free of mud, debris and other organic material.
        </p>
        <p className="paragraph-data">
          This service is now a drop-off service with a 24 to 72-hour turnaround
          to allow adequate time for us to take care of your boots. Please limit
          boots to 3 pairs per customer at a time. We encourage you to call the
          store before you drop by to double-check they have capacity and to
          avoid disappointment.
        </p>
      </div>
    </div>
  );
};

export default Homepage;
