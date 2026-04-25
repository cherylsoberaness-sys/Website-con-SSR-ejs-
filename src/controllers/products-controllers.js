import { getProducts, saveNewProduct } from '../data/productsRepository.js';
import { Product } from '../models/product-model.js';




export async function productsController (req, res, next) {
    const userId = req.session.userId;
    const { tag, page, limit, name, priceMin, priceMax, sort} = req.query;
    let title = "Lista de productos";

    try {
        const products = await getProducts(userId, tag, limit, page, name, priceMin, priceMax, sort);
        res.render('products.html', {
            title: title,
            products: products,
            tag: tag,
            page: page,
            name: name,
            priceMin: priceMin,
            priceMax: priceMax,
            sort: sort 
        });
    }
    catch (err){
        next(err);
    }

}


export function productController (req, res, next) {
    let title = "Crear nuevo producto";

    res.render('product.html', {
        title: title,
        errorMessage: null,
        values: {},
    });

}

export async function newProductController (req, res, next) {
    const userId = req.session.userId;
    //const { name, tags, price} =  req.query;
    const title = "Crear nuevo producto";

    if(!req.body.name || req.body.price === ''){
        const errorMessage = 'El nombre y precio del producto son obligatorios';
        res.render('product.html', {
            title: title,
            errorMessage: errorMessage,
            values: req.body
        })
        return
    }

    const newProduct = { 
        name: req.body.name,
        price: req.body.price,
        tags: req.body.tags,
        owner: userId
    }


    try {
        // funcion que guarda nuevo producto y tiene un objeto como argumento
        const createdProduct = await saveNewProduct(newProduct);
        res.redirect('/products/');
    }   
    catch (err) {
        next(err);
    }
} 

