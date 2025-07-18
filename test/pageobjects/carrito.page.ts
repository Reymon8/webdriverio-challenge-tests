class CarritoPage {
    /**
     * Elimina todos los productos del carrito si existen
     */
    public async vaciarCarrito() {
        // Ir al carrito
        await browser.url('https://demo.opencart.com/index.php?route=checkout/cart');
        await browser.pause(1000);
        // Buscar todos los botones de eliminar (icono rojo)
        const eliminarBtns = await $$('button.btn-danger');
        for (const btn of eliminarBtns) {
            if (await btn.isDisplayed() && await btn.isClickable()) {
                await btn.click();
                await browser.pause(500); // Espera a que desaparezca el producto
            }
        }
    }
}
export default new CarritoPage();
