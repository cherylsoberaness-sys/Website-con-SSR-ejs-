import { getProducts, saveNewProduct, getProduct, editProduct, deleteProduct } from '../data/productsRepository.js';
import { Product } from '../models/product-model.js';




export async function productsController (req, res, next) {
    const userId = req.session.userId;

    let title = "Lista de productos";

    const filterOptions = {
        tag: req.query.tag,
        name: req.query.name,
        priceMin: req.query.priceMin ? Number(req.query.priceMin) : null,
        priceMax: req.query.priceMax ? Number(req.query.priceMax) : null,
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 4,
        sort: req.query.sort || 'name'
    }

    try {
        const products = await getProducts(userId, filterOptions);
        res.render('products.html', {
            title: title,
            products: products,
            tag: filterOptions.tag,
            page: filterOptions.page,
            name: filterOptions.name,
            priceMin: filterOptions.priceMin,
            priceMax: filterOptions.priceMax,
            sort: filterOptions.sort 
        });
    }
    catch (err){
        next(err);
    }

}


export function newProductController (req, res, next) {
    let title = "Crear nuevo producto";

    res.render('product.html', {
        title: title,
        errorMessage: null,
        values: {},
    });

}

export async function createProductController (req, res, next) {
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

    try {

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
    } catch (err) {
        next(err);
    }
}

export const editProductController = async (req, res, next) => {
    const productId = req.params.productId;
    const userId = req.session.userId;

    try {
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
                values: {
                    _id: product._id,
                    ...req.body}
            })
            return
        }

        await editProduct(
            productId, 
            {
            name: req.body.name,
            price: req.body.price,
            tags: req.body.tags
            },
            userId
        );
        
        res.redirect('/products');

    } catch (err) {
        next(err);
    }
}


export const deleteProductController = async (req, res, next) => {
    const userId = req.session.userId;
    const productId = req.params.productId;

   try {
    
        const product = await getProduct(productId);

        if (!product) {
            // Devolver 404
            next();
            return;
        }

    
        const newProducts =  await deleteProduct(userId, productId)
        res.json(newProducts);
        
    } catch (err) {
        next(err);
    }

}
