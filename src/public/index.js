const socket = io()

socket.on('productos', data => {
    const lista_productos = document.querySelector('#contenedor_productos')
    lista_productos.innerHTML = ''

    data.productos.forEach(producto => {
        const prod_element = document.createElement('li')

        prod_element.innerHTML = `
            <h2>${producto.title}</h2>
            <p>${producto.description}</p>
            <p>Stock: ${producto.stock}</p>`;

        lista_productos.appendChild(prod_element)
    })
})
