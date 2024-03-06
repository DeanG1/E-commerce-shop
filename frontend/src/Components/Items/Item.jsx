import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  const {all_product} = props;
  return (
    <div className='item-container'>
      <div className="item">
          <Link onClick={window.scrollTo(0,0)} to={`/product/${props.id}`}><img src={props.image} alt="There is no image" /></Link>
          <p>{props.name}</p>
          <div className="item-prices">
              <div className="item-price-new">
                  ${props.new_price}
              </div>
              <div className="item-price-old">
                  ${props.old_price}
              </div>
          </div>
      </div>
    </div>
  )
}

export default Item