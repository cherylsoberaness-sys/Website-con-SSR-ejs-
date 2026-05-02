import { Product } from '../models/product-model.js';
import { User } from '../models/user-model.js';

/*
export async function getProducts() {
    const result = await Product.find({});
    return result; 
}*/

export async function getProducts(userId, filterOptions) {
    const { page, limit, sort} = filterOptions

    const filter = {
        owner: userId
    }
    if (filterOptions.tag) {
        filter.tags = filterOptions.tag;
    }
    if(filterOptions.name){
        filter.name = { $regex: '^' + filterOptions.name, $options: 'i' };
    }
    if (filterOptions.priceMin || filterOptions.priceMax){
        filter.price = {};
        if(filterOptions.priceMin != null ) filter.price.$gte = filterOptions.priceMin;
        if(filterOptions.priceMax != null ) filter.price.$lte = filterOptions.priceMax;  
        //filter.price = {$gte: filterOptions.priceMin, $lte: filterOptions.priceMax}
    }
    
    const skip =  (page - 1) * limit; 
    return await Product.find(filter).skip(skip).limit(limit).sort(sort);

}


export async function saveNewProduct(product) {    
    const newProduct = new Product(product);
    await newProduct.save();
    return newProduct;
}


export async function getProduct(productId) {
    const product = await Product.findById(productId);
    return product;
}

export async function editProduct(productId, updateData, ownerId) {
   const product = await Product.findOneAndUpdate(
    {
        _id: productId,     
        owner: ownerId
    },
    {
        $set: updateData
    }
   )

   return product
}



export async function deleteProduct(userId, productId) {
    return await Product.deleteOne({
        _id: productId,
        owner: userId
    })
}