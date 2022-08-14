import React, { useEffect } from "react";

import "./FooterLinks.scss";

function Shipping() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="main-layout">
      <div className="data">
        <p className="data-title-main">What's Your Shipping Policy?</p>
        <p className="paragraph-data">
          We accept orders online 24 hours a day, seven days a week. Orders entered on TheShoebox.ca will then be processed (pending credit card approval) and shipped out from our Brampton distribution center. Orders are limited to a single shipping address per order and will be shipped via standard or express.
        </p>
        <p className="paragraph-data">
          Orders placed Monday-Friday before 12 PM EST will begin processing that day, excluding holidays. Orders placed after 12 PM EST will begin processing the next business day. Orders placed on Friday after 12 PM EST will begin processing on the following Monday. If the merchandise selected is not currently available or if additional identification is needed for credit verification, The Shoebox Customer Service will contact you.
        </p>
        <p className="paragraph-data">
          We currently do not process orders on the weekend or holidays.
        </p>
        <p className="data-title">REFUSED SHIPMENTS</p>
        <p className="paragraph-data">
          If you decide to refuse any shipments from The Shoebox, you are responsible for the original shipping charges to you, any duties, taxes and/or customs charges that are incurred on the package (on both the original and return shipments), and the cost of returning the package to The Shoebox.
        </p>
        <p className="data-title">TRANSIT TIMES</p>
        <ul className="list">
          <li>Standard Shipping: 3-6 business days *</li>
        </ul>
        <p className="paragraph-data">
          * Delivery times include processing and delivery. Express delivery will ship the same day on orders placed before 12pm (EST). Shipping to remote locations may take longer.
        </p>
      </div>
    </div>
  );
}

export default Shipping;
