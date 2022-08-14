import React from "react";
import "../styles/Homepage.scss";

const Homepage = () => {
  return (
    <div style={{lineHeight:'1.6'}} className="homepage-layout">
      <div className="image-container">
        <img className="main-image" src="../main-image-3.png" alt="mainImage" />
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
