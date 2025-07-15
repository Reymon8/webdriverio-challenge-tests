class ProductoPage {
    public get nombreProducto() { return $('div.product-name h1'); }
    public get marca() { return $('div.manufacturer'); }
    public get codigo() { return $('div.sku span.value'); }
    public get disponibilidad() { return $('div.stock span.value'); }
    public get cantidadInput() { return $('input.qty-input'); }
    public get btnAgregarCarrito() { return $('button.add-to-cart-button'); }
    public get descripcion() { return $('#product-details-form .overview'); }
}

export default new ProductoPage();