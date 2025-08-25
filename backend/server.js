import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies. allows us to accept json data in the req.body.

app.get("/api/products", async (req, res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    }catch(error){
        console.log("error in fetching products:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
})

app.post("/api/products", async (req, res)=>{
    const product = req.body; // user will send this data 

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message: "All fields are required"});
    }

    const newProduct = new Product(product);

    try{
        newProduct.save();
        res.status(201).json({success: true, message: "Product created successfully", data: newProduct})
    }catch(error){
        console.log("Error in create Product", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
});

app.delete("/api/products/:id", async (req, res)=>{
    const {id} = req.params; 
    console.log("id:", id);
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted succesfully."})
    }catch(error){
        console.log("error in deleting product:", error.message);
        res.status(404).json({success: false, message: "Product not found"});
    }
})


app.listen(5000, () => {
    connectDB();
    console.log('Server started at http://localhost:5000');
})
