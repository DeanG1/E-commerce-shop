import React from 'react';
import './Offers.css'
import exclusice_image from '../Assets/exclusive_image.png';

const Offers = () => {
  return (
    <div className="offers">
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers for you</h1>
            <p>Only best sellers products</p>
            <button>Check Now</button>
        </div>
        <div className="offers-right">
            <img src={exclusice_image} alt="there is no image"/>
        </div>
    </div>
  )
}

export default Offers