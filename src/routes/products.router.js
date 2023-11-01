//LIBRERIAS:
import { Router } from "express";
import { obtener_DB_archivo } from '../functions/functions.js';

//CONSTANTES:
const router = Router()
const products = obtener_DB_archivo('./files/DB.json')

//MIDDLEWARE:
router.get('/', (req, res) => {
    res.render('home', { products });
})
export default router