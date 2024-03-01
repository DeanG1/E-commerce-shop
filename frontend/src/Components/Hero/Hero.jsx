import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'
const Hero = () => {
  return (
    <div className="hero">
        <div className="hero-left">
            <h2>New Arrivals Only</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>New</p>
                    <img src={hand_icon} alt="there is no image"/>
                </div>
                <p>Collection</p>
                <p>For Everyone</p>
            </div>
            <div className="hero-latest-btn">
                <div>
                    Latest Collection
                </div>
                <img src={arrow_icon} alt='there is no image'/>
            </div>
        </div>
        <div className="hero-right">
            <img src={hero_image} alt="there is no image"/>
        </div>
    </div>
  )
}

export default Hero