import React, { useEffect, useState } from 'react';
import './NewCollection.css';
import Item from '../Items/Item';

const NewCollections = () => {
  const [new_collection,setNew_collection] = useState([])

  useEffect(() =>{
    fetch('http://localhost:4000/newcollection')
    .then((response) => response.json())
    .then((data) => setNew_collection(data));
  },[])

  return (
    <div className="new-collections">

        <h1>New Collections</h1>
        <hr/>
        <div className="collections">
            {new_collection.map((item,i) => {
                return(
                    <Item key={i} id={item.id} 
                    name={item.name} image={item.image}
                    old_price={item.old_price}
                    new_price={item.new_price}/>
                )
            })}
        </div>
    </div>
  )
}

export default NewCollections