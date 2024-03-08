import React,{useState} from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
const AddProduct = () => {

  const [image,setImage] = useState(false)

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input type="text" name="name" placeholder="Type here..." />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="text" name="old_price" placeholder="Type here..." />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type="text" name="new_price" placeholder="Type here..." />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select className="add-product-selector" name="category">
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
      <button className="addproduct-btn">Add</button>
    </div>
  );
};

export default AddProduct;
