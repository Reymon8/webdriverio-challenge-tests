class ProductoPage {
    public get nombreProducto() { return $('h1'); }
    public get marca() { return $('//li[contains(text(), "Brand")]/a'); }
    public get codigo() { return $('//li[contains(text(), "Product Code")]'); }
    public get disponibilidad() { return $('//li[contains(text(), "Availability")]'); }
    public get cantidadInput() { return $('#input-quantity'); }
    public get btnAgregarCarrito() { return $('#button-cart'); }
    public get descripcion() { return $('#tab-description'); }
}

export default new ProductoPage();