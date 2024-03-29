import React,{useState} from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import axios from 'axios';
const AddProduct = () => {
  
  const [image,setImage] = useState(false)
  const [productDetails,setProductDetails] = useState({
      name:"",
      image:"",
      category:"women",
      new_price:"",
      old_price:""
  })

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  const changeHandler = (e) => {
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }
  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append('product', image);
  
    try {
      // Upload image
      const uploadResponse = await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      responseData = uploadResponse.data;
  
      if (responseData.success) {
        // Update product image URL
        product.image = responseData.image_url;
        console.log(product);
  
        // Add product
        const addProductResponse = await axios.post('http://localhost:4000/addproduct', product, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (addProductResponse.data.success) {
          alert("Product added!");
        } else {
          alert("Failed to add product");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to upload image or add product");
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Type here..." />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Type here..." />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="Type here..." />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} className="add-product-selector" name="category">
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image?URL.createObjectURL(image):upload_area}
            className="addproduct-thumbnail-img"
            alt="there is no image"
          />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
      </div>
      <button onClick={() => {Add_Product()}} className="addproduct-btn">Add</button>
    </div>
  );
};

export default AddProduct;
