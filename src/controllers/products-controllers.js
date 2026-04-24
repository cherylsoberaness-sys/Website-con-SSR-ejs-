import { getProducts } from '../data/productsRepository.js';
import { Product } from '../models/product-model.js';




export async function productsController (req, res, next) {
    const userId = req.session.userId;
    const { tag, page, limit, name, priceMin, priceMax, sort} = req.query;
    let title = "Lista de productos";

    try {
        const products = await getProducts(userId, tag, limit, page, name, priceMin, priceMax, sort);
        console.log(products);
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



