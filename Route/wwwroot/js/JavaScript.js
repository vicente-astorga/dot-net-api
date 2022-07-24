for (const product of cart) {

    //console.log(product.amount, product.item.precio, product.item.id, idCarrito)
    await fetch("http://localhost:5003/api/Items", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            CantidadItem: product.amount,
            PrecioItem: product.item.precio,
            PrecioTotalItem: (product.amount * product.item.precio),
            IdProducto: product.item.id,
            IdCarrito: idCarrito,
        }),
    })
        .then((response) => response.json())
        //.then((data) => {
        //  console.log(data)
        //idCarrito = data.id
        //})
        .catch((err) => console.log(err));
};