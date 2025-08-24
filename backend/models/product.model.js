import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true

    },
    image: {
        type: String,
        required: true
    }
}, {
    timeStamps: true // Automatically adds createdAt and updatedAt fields
});

const Product = mongoose.model('Product', productSchema);// Mongoose will convert the Product into products collection in MongoDB. It just want you write like this with singular and capitalize lette mongoose will the rest for you.

export default Product;