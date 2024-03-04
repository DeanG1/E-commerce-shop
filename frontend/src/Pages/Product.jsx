import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';

const Product = () => {

  const {all_products} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_products.find((e) => e.id === Number(productId));

  //We use useParams to get the product id

  return (
    <div>
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox/>
    </div>
  )
}

export default Product