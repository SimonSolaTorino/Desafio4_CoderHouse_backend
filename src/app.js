import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import routerProducts from './routes/products.router.js';
import routerView from './routes/views.router.js';
import { obtener_DB_archivo } from './functions/functions.js';

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/', routerProducts)
app.use('/realtimeproducts', routerView)

const httpServer = app.listen(8080, () => console.log('corriendo...'))
const socketServer = new Server(httpServer)

let products = obtener_DB_archivo(__dirname + '/files/DB.json')

socketServer.on('connection', socket =>{
    console.log('conexion con exito.')
    console.log(products)

    socket.emit('productos', products) //muestro la base de datos actual.

    socket.on('producto_agregado', (nuevoProducto) => {
        products.push(nuevoProducto)
        socketServer.emit('productos', products)

    })

    socket.on('producto_eliminado', (id_prod, buleano) => {
        if(buleano){
            const nuevo_array = products.filter(prod => prod.id !== id_prod )
            products = nuevo_array

        }else{
            console.log(`no se encontro ningun producto con el id ${id_prod}`)
        }
        
        socketServer.emit('productos', products);
    })
})

export { socketServer }