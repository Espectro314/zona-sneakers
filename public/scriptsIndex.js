function openDetalles(productName, precio, DetallesLink, imageLinks ) {
     
    window.location.href = '/api/products/detalles/?DetallesLink=' + DetallesLink + "&imageLinks=" +  imageLinks  +  "&precio=" + precio + "&name=" + productName;

  }

