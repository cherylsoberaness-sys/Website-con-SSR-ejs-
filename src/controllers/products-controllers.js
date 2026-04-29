import { getProducts, saveNewProduct, getProduct, editProduct } from '../data/productsRepository.js';
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

export const getProductController = async (req, res, next) => {
    const productId = req.params.productId;

    const title = "Detalles del producto";

    const product = await getProduct(productId);
    if(!product) {
        next()
        return;
    }

    res.render('product.html', {
        title: title,
        errorMessage: null,
        values: {
            _id: product._id,
            productName: product.name,
            //product.tags trae el array de tags por tanto en ejs preguntar tags.includes('tech') si lo incluye marcarlo checked.
            tags: product.tags || [],
            price: product.price
        }
    });
}

export const editProductController = async (req, res, next) => {
    const productId = req.params.productId;
    const userId = req.session.userId;
    const product = await getProduct(productId);
    if(!product) {
        next()
        return;
    }

    const title = "Detalles del producto";

    if(!req.body.name || req.body.price === ''){
        const errorMessage = 'El nombre y precio del producto son obligatorios';
        res.render('product.html', {
            title: title,
            errorMessage: errorMessage,
            values: req.body
        })
        return
    }

    let tags = req.body.tags;
    if(typeof tags === "string") {
        tags = [tags]
    }
    if(!Array.isArray(tags)) {
        throw new Error ("tags debe ser un array")
    }

    await editProduct(
        productId, 
        {
        name: req.body.name,
        price: req.body.price,
        tags: tags,
        },
        userId
    );
    
    res.redirect('/products');
}

