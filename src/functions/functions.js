import fs from 'fs';

function obtener_DB_archivo(ruta){
    if(!fs.existsSync(ruta)){
        fs.writeFileSync(ruta, '[]')

    }else{
        const cadena_json = fs.readFileSync(ruta, 'utf-8')
        const array_productos = JSON.parse(cadena_json)
        return array_productos}
}

function escribir_DB_archivo(ruta, array_productos){
    const array_json = JSON.stringify(array_productos, null, 2) //los 2 parametros que le paso aparte del jsron hecho cadena son para que quede mas legible el json
    fs.writeFileSync(ruta, array_json)
}
export { obtener_DB_archivo, escribir_DB_archivo }