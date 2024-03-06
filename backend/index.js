const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

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
  image:{
    type:String,
    required: true,
  },
  category:{
    type:String,
    required:true,
  },
  new_price:{
    type:Number,
    required:true,
  },
  old_price:{
    type:Number,
    required:true,
  },
  date:{
    type:Date,
    default:Date.now,
  },
  avaliable:{
    type:Boolean,
    default:true,
  },
});

//API for Adding Products
app.post('/addproduct',async (req,res) => {
    //Create a new product
    const product = new Product({
        id:req.body.id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
        date:req.body.date,
        avaliable:req.body.avaliable,
    });
    console.log(product);
    //Save the product in the database
    await product.save();
    console.log("Saved");
    //Send the response
    res.json({
        success:true,
        name:req.body.name,
    })
})


app.listen(port, (error) => {
  if (!error) {
    console.log(`Server running on port: ${port}`);
  } else {
    console.log(`Error ${error}`);
  }
});
