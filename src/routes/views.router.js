//LIBRERIAS:
import { Router } from "express";
import { obtener_DB_archivo, escribir_DB_archivo } from '../functions/functions.js';
import { socketServer } from '../app.js';

//CONSTANTES:
let products = obtener_DB_archivo('./files/DB.json')
const router = Router()

//MIDDLEWARE:
router.get('/', (req, resp)=>{
    resp.render('realtimeproducts', {products})
})

router.post('/agregarproducto', (req, resp)=>{
    const nuevoProducto = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        stock: parseInt(req.body.stock),
        price: parseFloat(req.body.price),
        code: req.body.code,
        thumbnail: req.body.thumbnail,
        status: req.body.status === 'on', // Convierte el valor del checkbox a un booleano
        id: products.length + 1
    }

    products.push(nuevoProducto)
    escribir_DB_archivo('./files/DB.json', products)
    resp.redirect('/realtimeproducts')
    socketServer.emit('producto_agregado', nuevoProducto)
    socketServer.emit('productos', products)
})

router.post('/eliminarproducto', (req, resp)=>{
    const id_prod = parseInt(req.body.id)
    const existe_prod = products.find(prod => prod.id === id_prod)

    if(existe_prod){
        const nuevo_array = products.filter(prod => prod.id !== id_prod )
        products = nuevo_array
        escribir_DB_archivo('./files/DB.json', products)
        resp.redirect('/realtimeproducts')
        socketServer.emit('producto_eliminado', id_prod, true)
        socketServer.emit('productos', products)

    }else{
        resp.status(404).send('Producto no encontrado')
        socketServer('producto_eliminado', id_prod, false)
    }
})
export default router