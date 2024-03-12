const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { default: axios } = require("axios");

app.use(express.json());
//With the help of this express json
//whatever request we will get from response
//that will be automatically passed through json

app.use(cors());
//With the help of this cors
//we will allow our frontend to access our backend

// Database Connection with MongoDB

mongoose.connect(
  "mongodb+srv://webdevD:manutd0301@cluster0.bnsxrkg.mongodb.net/e-commerce"
);

//API Creation

app.get("/", (req, res) => {
  res.send("Express app is running!");
});

// Image Storage Engine

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });
//Creating upload endpoint for images
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Schema for Creating Products
// id
// name
// image
// category
// new_price
// old_price
// date
// avaliable
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avaliable: {
    type: Boolean,
    default: true,
  },
});

// Creating API For CREATING PRODUCTS
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  //Get the last product
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    //Get the id of the last product
    //Add 1 to the id
    //Set the id of the last product
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  //Create a new product
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    date: req.body.date,
    avaliable: req.body.avaliable,
  });
  console.log(product);
  //Save the product in the database
  await product.save();
  console.log("Saved");
  //Send the response
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Creating API For DELETING PRODUCTS

app.post("/removeproduct", async (req, res) => {
  //Delete the product
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  //Send the response
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Creating API for getting all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All products fetched!");
  res.send(products);
});

//Schema creating for User model

const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartDate: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//Creating API for user registration
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({
        success: false,
        errors: "existing user found with the same email address",
      });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartDate: cart,
  });
  await user.save();

  //Create token using this object
  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "sercret_ecom");
  //Send the response
  res.json({ success: true, token });
});

//Creating endpoint user login

app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong password!" });
    }
  } else {
    res.json({ success: false, errors: "Wrong email id!" });
  }
});

//Creating endpoint for newcollection data
app.get("/newcollections", async (req, res) => {
  //Get the last 8 products
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  //Send the response
  console.log("New Collection Fetched!");
  res.send(newcollection);
});

//Creating endpoint for popular in women category
app.get('/popularinwomen', async (req, res) => {
  let products = await Product.find({});
  let popular_in_women = products.slice(0,4);
  console.log("Popular in women fetched!");
  res.send(popular_in_women);  
})

// Creating middleware to fetch user
const fetchUser = async (req,res,next) => {
  const token = req.header('auth-token');
  if(!token){
    res.status(401).send({errors:"Please authenticate using a valid token!"})

  }
  else{
    try{
      const data = jwt.verify(token,'secret_ecom');
      req.user = data.user;
      next();
    }
    catch (error){
      res.status(401).send({errors:"Please authenticate using a valid token!"})
    }
  }
}
//Creating endpoint to remove product from cartData
app.post('/removefromcart', fetchUser, async (req,res) =>{
  let userData = await Users.findOne({_id:req.user.id});
  //Modify cartData
  console.log("removed", req.body.itemId);
  if(userData.cartData[req.body.itemId] > 0)
  userData.cartData[req.body.item] -= 1;
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
  res.send("Removed!");
})

//Creating endpoint for adding item/products in cartdata
app.post('/addtocart',fetchUser, async (req,res) => {
  let userData = await Users.findOne({_id:req.user.id});
  console.log("added", req.body.itemId);
  
  //Modify cartData
  userData.cartData[req.body.item] += 1;
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
  res.send("Added!");
})

//creating endpoint to get cartdata
app.post('/getcart', fetchUser, async (req,res) => {
  console.log("GetCart");
  let userData = await Users.findOne({_id:req.user.id});
  res.json(userData.cartData);
})


app.listen(port, (error) => {
  if (!error) {
    console.log(`Server running on port: ${port}`);
  } else {
    console.log(`Error ${error}`);
  }
});
