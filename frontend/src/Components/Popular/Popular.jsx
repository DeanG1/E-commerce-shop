import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Items/Item'
const Popular = () => {

  // We declare a cons for popular in women
  const [popularInWomen, setPopularInWomen] = useState([]);

  useEffect(() => { 
    fetch('http://localhost:4000/popularinwomen')
    .then((response) => response.json())
    .then((data) => setPopularInWomen(data));
  },[])

  return (
    <div className='popular'>
        <h1>Popular in Women</h1>
        <hr/>
        <div className="popular-item">
            {popularInWomen.map((item, index) => {
                return(
                    <Item key={index} id={item.id} 
                    name={item.name} image={item.image}
                    new_price={item.new_price} old_price={item.old_price}
                    />
                )
            })}
        </div>
    </div>
  )
}

export default Popular