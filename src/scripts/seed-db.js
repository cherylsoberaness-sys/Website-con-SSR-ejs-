import { connectToDB } from "../lib/database.js";
import { User } from "../models/user-model.js";
import { Product } from "../models/product-model.js";


console.log("Inicializando SeedDb");
const connection = await connectToDB();
console.log(`Conectado a MongoDB: ${connection.name}`);


await seedUsers();
await seedProducts();
//const ed = await User.findOne( { email: 'ed@nd.io' }).select('+password');
//console.log(`usuario: ${ed.name}, id: ${ed._id}, contraseña: ${ed.password}`);


await connection.close();
process.exit(0);


async function seedUsers () {

    const USERS = [
        { name: 'Ed Bebop', email: 'ed@nd.io', password: await User.hashPassword('112345454')},
        { name: 'Spike Spiegel', email: 'Ss@nd.io', password: await User.hashPassword('1232498349')}
    ];

    const deleteResult = await User.deleteMany({}); //eso devuelve un objeto 
    console.log(`Eliminados [${deleteResult.deletedCount}] user`)

    const insertedUsers = await User.insertMany(USERS);

    console.log(`Insertados [${insertedUsers.length}]`);
}


async function seedProducts() {

    const [ed, sS] = await Promise.all([
        User.findOne({ email: 'ed@nd.io'}),
        User.findOne({ email: 'Ss@nd.io' })
    ])

    
    const PRODUCTS = [
        // 🔹 Usuario: ed
        { 
            name: 'MacBook Air M1', 
            price: 18000, 
            owner: ed._id,
            tags: ['tech', 'laptop', 'work']
        },
        { 
            name: 'Teclado Mecánico Keychron', 
            price: 2500, 
            owner: ed._id,
            tags: ['tech', 'accessories', 'work']
        },
        { 
            name: 'Mouse Logitech MX Master', 
            price: 1800, 
            owner: ed._id,
            tags: ['tech', 'accessories', 'productivity']
        },
        { 
            name: 'Monitor LG UltraWide', 
            price: 9000,
            owner: ed._id,
            tags: ['tech', 'work', 'gaming']
        },
        { 
            name: 'Silla Ergonómica', 
            price: 4000,
            owner: ed._id,
            tags: ['office', 'comfort', 'work']
        },

        // 🔹 Usuario: sS
        { 
            name: 'iPhone 13', 
            price: 12000, 
            owner: sS._id,
            tags: ['tech', 'mobile', 'lifestyle']
        },
        { 
            name: 'PlayStation 5', 
            price: 11000,
            owner: sS._id,
            tags: ['gaming', 'console', 'entertainment']
        },
        { 
            name: 'Audífonos Sony WH-1000XM4', 
            price: 6000,
            owner: sS._id,
            tags: ['audio', 'lifestyle', 'tech']
        },
        { 
            name: 'Smartwatch Samsung', 
            price: 3500,
            owner: sS._id,
            tags: ['tech', 'wearable', 'health']
        },
        { 
            name: 'Tablet iPad Air', 
            price: 10000,
            owner: sS._id,
            tags: ['tech', 'mobile', 'productivity']
        },
    ];
    


    const deleteResult = await Product.deleteMany({});
    console.log(`Eliminados [${deleteResult.deletedCount}] product`)

    const insertedProducts = await Product.insertMany(PRODUCTS);
    
    console.log(`Insertados [${insertedProducts.length}]`)
}