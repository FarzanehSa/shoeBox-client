import React, { useEffect } from 'react';

import "./FooterLinks.scss";

function Warranty() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="main-layout">
      <div className='data'>
        <p className="data-title-main">Is My Item Under Warranty?</p>
        <br />
        <p className="data-title">LIMITED WARRANTY</p>
        <p className="paragraph-data">
          Since 2000, The Shoebox has been committed to offering the finest products, using only the best materials and applying strict quality control standards. The Shoebox products are warranted to be free of defects in material and workmanship for 12 months from date of purchase. Our warranty is an expression of our confidence in the material and workmanship of our company's products, and assures unsurpassed quality for rugged, dependable products. Because The Shoebox cannot control the quality of Products sold by unauthorized sellers, this warranty applies only to Products that were purchased from The Shoebox or a The Shoebox authorized seller, unless otherwise prohibited by law. The Shoebox reserves the right to reject warranty claims from purchasers for Products purchased from unauthorized sellers, including unauthorized Internet sites. This warranty does not apply to the effects of normal wear and tear, nor does it apply to Products that have been damaged by misuse, neglect, accident modification or unauthorized repair.
        </p>
        <p className="data-title">WARRANTY CLAIM INSTRUCTIONS</p>
        <p className="paragraph-data">
          If you believe your product is defective, please email a completed Warranty Return Form to us at warranty@theshoebox.com <strong>along with the following pictures</strong>:
        </p>
        <div>
        <ul className="list">
          <li>Internal tags showing style number and size</li>
          <li>Product in its entirety</li>
          <li>Bottom of soles showing tread, for footwear</li>
          <li>Defective area</li>
          <li>Proof of purchase within 12 months from the original date of purchase</li>
        </ul>
        </div>
      </div>
    </div>
  );
}

export default Warranty;