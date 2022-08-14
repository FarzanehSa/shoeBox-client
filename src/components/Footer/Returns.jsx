import React from 'react';

import "./FooterLinks.scss";

const Returns = () => {
  return (
    <div className='main-layout'>
      <div className='data'>
        <p className="data-title-main">Free Return Policy</p>
        <p className="paragraph-data">
          At Shoebox, our goal is simple: We want you to feel as confident in your order as we do in our products. You may return merchandise purchased online for size, fit or style reasons within 60 days of shipment of your order provided it has not been damaged, washed, altered or worn. Returning your merchandise is free and easy to do - we provide a pre-paid shipping label for FREE returns.
        </p>
        <p className="paragraph-data">
          Please note that purchases from Shoebox must be returned using the return label that came with your shipment to the address on the packing slip.
        </p>
        <p className="data-title">RETURN EXCEPTIONS</p>
        <p className="paragraph-data">
          If returns are shipped to us from outside Canada, any taxes, duties, custom fees or shipping charges incurred from the return will be the responsibility of the customer.
          Please note and keep the return tracking number until your account is credited. Customers can make returns via the free shipping label.
        </p>
        <p className="paragraph-data">
          If your package was shipped via TForce and you currently have a Canada Post return label, to facilitate the return process please be sure to complete the shipping information (Name and Address) as well as the order number in the Order Number Field indicated on the return label.
        </p>
        <p className="data-title">GETTING CREDIT</p>
        <p className="paragraph-data">
          We'll do everything we can to take care of your return quickly. Your refund will be credited to your initial form of payment in 7-10 business days, in the amount of the purchase price plus any applicable taxes. It may take one or more billing cycles for your credit to appear after your return has been processed. Processing time varies seasonally.
        </p>
      </div>
    </div>
  );
};

export default Returns;