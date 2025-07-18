class ProductoPage {
    public get nombreProducto() { return $('h1'); }
    public get marca() { return $('//li[contains(text(), "Brand")]/a'); }
    public get codigo() { return $('//li[contains(text(), "Product Code")]'); }
    public get disponibilidad() { return $('//li[contains(text(), "Availability")]'); }
    public get cantidadInput() { return $('#input-quantity'); }
    public get btnAgregarCarrito() { return $('#button-cart'); }
    public get descripcion() { return $('#tab-description'); }

    /**
     * Navega a Desktops > Show All Desktops y selecciona el producto por nombre
     */
    public async seleccionarProductoDesdeDesktops(nombreProducto: string) {
        const desktopsMenu = await $('a.dropdown-toggle=Desktops');
        await desktopsMenu.moveTo();
        await browser.pause(500);
        const showAllDesktops = await $('a.see-all=Show All Desktops');
        await showAllDesktops.waitForClickable({ timeout: 5000 });
        await showAllDesktops.click();
        await browser.pause(500);
        const productoLink = await $(`a=${nombreProducto}`);
        await productoLink.waitForClickable({ timeout: 5000 });
        await productoLink.click();
    }
}

export default new ProductoPage();