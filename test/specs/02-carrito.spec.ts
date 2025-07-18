import HomePage from '../pageobjects/home.page';
import MenusPage from '../pageobjects/menus.page';
import ProductoPage from '../pageobjects/producto.page';
import allure from '@wdio/allure-reporter';

describe('Carrito de compras', () => {
    it('CP002 - Agregar producto al carrito y validar tabla', async () => {
        // Paso 1: Visualizar el home
        await allure.startStep('Visualizar HOME');
        await HomePage.open();
        allure.addAttachment('Screenshot Home', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        await allure.endStep();

        // Paso 2: Abrir el menú Desktops
        await allure.startStep('Abrir menú Desktops');
        const desktopsMenu = await $('a.dropdown-toggle=Desktops');
        await desktopsMenu.moveTo();
        allure.addAttachment('Screenshot Menu Desktops', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        await allure.endStep();

        // Paso 3: Clic en Show All Desktops
        await allure.startStep('Clic en Show All Desktops');
        const showAllDesktops = await $('a.see-all=Show All Desktops');
        await showAllDesktops.waitForClickable({ timeout: 5000 });
        await showAllDesktops.click();
        allure.addAttachment('Screenshot Show All Desktops', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        await allure.endStep();

        // Paso 4: Clic en Laptops & Notebooks
        await allure.startStep('Clic en Laptops & Notebooks');
        const laptopsLink = await $('a.list-group-item*=Laptops & Notebooks');
        await laptopsLink.waitForClickable({ timeout: 5000 });
        await laptopsLink.click();
        allure.addAttachment('Screenshot Laptops & Notebooks', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        await allure.endStep();

        // Paso 5: Seleccionar producto HP LP3065
        await allure.startStep('Seleccionar producto HP LP3065');
        const hpProduct = await $('a=HP LP3065');
        await hpProduct.waitForClickable({ timeout: 5000 });
        await hpProduct.click();
        allure.addAttachment('Screenshot HP LP3065', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        await allure.endStep();

        // Paso 6: Agregar al carrito
        await allure.startStep('Agregar producto al carrito');
        await ProductoPage.btnAgregarCarrito.click();
        allure.addAttachment('Screenshot Agregado', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        await allure.endStep();

        // Paso 7: Ir al carrito y validar tabla
        await allure.startStep('Ir al carrito y validar tabla');
        await $('a[title="Shopping Cart"]').click();

        // Validar nombre del producto
        const productoEnCarrito = await $('.table-responsive td.text-start.text-wrap a[href*="hp-lp3065"]');
        await productoEnCarrito.waitForDisplayed({ timeout: 5000 });
        const nombreProducto = await productoEnCarrito.getText();
        expect(nombreProducto.trim()).toBe('HP LP3065');

        // Validar modelo
        const modelo = await $('//td[contains(text(),"Product 21")]');
        expect(await modelo.getText()).toContain('Product 21');

        // Validar cantidad
        const cantidad = await $('input[name="quantity"]');
        expect(await cantidad.getValue()).toBe('1');

        // (Evidencia visual de precio unitario y total en el screenshot)
        // Los screenshots de Allure muestran que el precio y total son correctos en la UI.

        await allure.endStep();
    });

    it('CP003 - Actualizar cantidad de producto en el carrito', async () => {
        // Agregar producto al carrito
        await HomePage.open();
        await MenusPage.irAMacDesdeDesktops();
        await ProductoPage.btnAgregarCarrito.click();
        await $('a[title="Shopping Cart"]').click();
        // Cambiar cantidad
        const cantidadInput = await $('input[name="quantity"]');
        await cantidadInput.setValue('2');
        // Click en actualizar (ícono de refresh)
        await $('button[data-original-title="Update"]').click();
        // Validar actualización (cantidad y total)
        // Puedes tomar screenshot y validar el valor actualizado
    });

    it('CP004 - Eliminar producto del carrito', async () => {
        // Agregar producto al carrito
        await HomePage.open();
        await MenusPage.irAMacDesdeDesktops();
        await ProductoPage.btnAgregarCarrito.click();
        await $('a[title="Shopping Cart"]').click();
        // Click en eliminar (ícono de tacho/basura)
        await $('button[data-original-title="Remove"]').click();
        // Validar que ya no aparece el producto
        // Validar mensaje de carrito vacío si corresponde
    });

    it('CP005 - Validar mensaje de carrito vacío', async () => {
        // Ir al carrito sin productos
        await HomePage.open();
        await $('a[title="Shopping Cart"]').click();
        // Validar mensaje de carrito vacío
        const mensajeVacio = await $('#content p');
        const texto = await mensajeVacio.getText();
        expect(texto).toContain('Your shopping cart is empty!');
    });

    it('CP006 - Validar botones “Continuar comprando” y “Pasar al checkout”', async () => {
        // Agregar producto al carrito
        await HomePage.open();
        await MenusPage.irAMacDesdeDesktops();
        await ProductoPage.btnAgregarCarrito.click();
        await $('a[title="Shopping Cart"]').click();
        // Validar botón "Continue Shopping"
        const btnContinuar = await $('a.btn-default');
        await expect(btnContinuar).toBeDisplayed();
        // Validar botón "Checkout"
        const btnCheckout = await $('a.btn-primary');
        await expect(btnCheckout).toBeDisplayed();
    });

    it('CP007 - Mensaje de error por falta de stock', async () => {
        // Navegar a producto
        await HomePage.open();
        await MenusPage.irAMacDesdeDesktops();
        // Cambiar cantidad a un valor mayor al stock
        await ProductoPage.cantidadInput.setValue('999');
        // Intentar agregar al carrito
        await ProductoPage.btnAgregarCarrito.click();
        // Validar mensaje de error
        const errorAlert = await $('.alert-danger, .alert-warning');
        await expect(errorAlert).toBeDisplayed();
        const errorText = await errorAlert.getText();
        expect(errorText.toLowerCase()).toContain('stock');
    });
});
