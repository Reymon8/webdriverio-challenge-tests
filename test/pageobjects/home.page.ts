class HomePage {
    /**
     * Devuelve solo los productos destacados (no categorías) de la home
     */
    public async productosDestacados() {
        const items = await $$('.item-box');
        const productos = [];
        for (const item of items) {
            // Solo agrega el item si contiene un .product-item (es un producto, no una categoría)
            if (await item.$('.product-item').isExisting()) {
                productos.push(item);
            }
        }
        return productos;
    }

    /**
     * Abre la página principal de nopCommerce
     */
    public async open() {
        await browser.url('https://demo.nopcommerce.com/');
    }

    /**
     * Hace scroll hasta el primer producto destacado para asegurar que esté visible
     */
    public async scrollToProductosDestacados() {
        const productos = await this.productosDestacados();
        if (productos.length > 0) {
            await productos[0].scrollIntoView();
        }
    }

    /**
     * Hace clic en el primer producto destacado visible en la home
     */
    public async clickPrimerProducto() {
        await this.scrollToProductosDestacados();
        await browser.waitUntil(
            async () => {
                const productos = await this.productosDestacados();
                return productos.length > 0;
            },
            { timeout: 5000, timeoutMsg: 'No se encontraron productos destacados' }
        );
        const productos = await this.productosDestacados();
        const html = await productos[0].getHTML();
        console.log('HTML primer producto:', html); // Para depuración
        // Selector corregido:
        const primerProducto = await productos[0].$('.details .product-title a');
        await primerProducto.waitForExist({ timeout: 5000 });
        await primerProducto.click();
    }

    /**
     * Hace clic en un producto destacado por su nombre
     * @param nombre Nombre exacto del producto a buscar
     */
    public async clickProductoPorNombre(nombre: string) {
        await this.scrollToProductosDestacados();
        const productos = await this.productosDestacados();
        for (const producto of productos) {
            const link = await producto.$('.details .product-title a');
            await link.waitForExist({ timeout: 5000 });
            const titulo = await link.getText();
            if (titulo.trim() === nombre.trim()) {
                await link.click();
                return;
            }
        }
        throw new Error(`Producto con nombre "${nombre}" no encontrado`);
    }
}

export default new HomePage();
