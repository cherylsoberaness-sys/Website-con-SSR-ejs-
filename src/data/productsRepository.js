import { Product } from '../models/product-model.js';
import { User } from '../models/user-model.js';

/*
export async function getProducts() {
    const result = await Product.find({});
    return result; 
}*/


export async function getProducts(userId, tag=null, limit=4, page=1,
    name=null, priceMin=null, priceMax=null, sort='name'
) {
    
    const filter = { 
        owner: userId,
    }

    if(tag){
        filter.tags = tag;
    }
    if(name){
        filter.name = { $regex: '^' + name, $options: 'i' };
    }
    if (priceMin || priceMax){
        filter.price = {$gte: Number(priceMin), $lte: Number(priceMax)}
    }

    const skip =  (page - 1) * limit; 

    return await Product.find(filter).skip(skip).limit(limit).sort(sort);

}


export async function saveNewProduct(product) {
    if(product.tags && !Array.isArray(product.tags)){
        product.tags = [product.tags]
    }

    const newProduct = new Product(product);
    await newProduct.save();
    return newProduct;
}


export async function getProduct(productId) {
    const product = Product.findById(productId);
    return product;
}