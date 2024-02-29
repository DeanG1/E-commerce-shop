import React, {useState} from 'react'
import './Navbar.css'
import logo from "../Assets/logo.png"
import cart_icon from "../Assets/cart_icon.png"

const Navbar = () => {

  const [menu, setMenu] = useState("shop");

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="There is no image"/>
        <p>Shopper</p>
      </div>
      <ul className='nav-menu'>
        <li onClick={() => {setMenu("shop")}}>Shop {menu === "shop" ? <hr/> : null}</li>
        <li onClick={() => {setMenu("mens")}}>Mens {menu === "mens" ? <hr/> : null}</li>
        <li onClick={() => {setMenu("womens")}}>Womens {menu === "womens" ? <hr/> : null}</li>
        <li onClick={() => {setMenu("kids")}}>Kids {menu === "kids" ? <hr/> : null}</li>
      </ul>
      <div className="nav-login-cart">
        <button>Login</button>
        <img src={cart_icon} alt="There is no image"/>
        <div className="nav-cart-count">
          0
        </div>
      </div>
    </div>
  )
}

export default Navbar