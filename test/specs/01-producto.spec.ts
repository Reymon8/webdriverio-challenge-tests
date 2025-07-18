import MenusPage from '../pageobjects/menus.page';
import ProductoPage from '../pageobjects/producto.page';
import HomePage from '../pageobjects/home.page';
import allure from '@wdio/allure-reporter';

describe('Producto', () => {
    it('CP001 - Ver detalle de un producto', async () => {
        // (Opcional) Ocultar navigator.webdriver antes de abrir la home
        await browser.url('about:blank');
        await browser.execute(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
        });

        // Paso 1: Visualizar el home
        await allure.startStep('Visualizar HOME');
        await HomePage.open();
        allure.addAttachment('Screenshot Home', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        await allure.endStep();

        // Paso 2: Navegar a Mac desde Desktops
        await allure.startStep('Navegar a Mac desde Desktops');
        await MenusPage.irAMacDesdeDesktops();
        allure.addAttachment('Screenshot Mac', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        await allure.endStep();

        // Paso 3: Hacer clic en el primer producto para ir a la página de detalles
        await allure.startStep('Hacer clic en el primer producto');
        await MenusPage.irAPrimerProducto();
        allure.addAttachment('Screenshot Producto Detalle', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        await allure.endStep();

        // Paso 4: Validar que se muestra el nombre del producto
        await allure.startStep('Validar que se muestra el nombre del producto');
        await expect(ProductoPage.nombreProducto).toBeDisplayed();
        await allure.endStep();

        // Paso 5: Validar que se muestra la marca
        await allure.startStep('Validar que se muestra la marca');
        await expect(ProductoPage.marca).toBeDisplayed();
        await allure.endStep();

        // Paso 6: Validar que se muestra el código
        await allure.startStep('Validar que se muestra el código');
        await expect(ProductoPage.codigo).toBeDisplayed();
        await allure.endStep();

        // Paso 7: Validar que se muestra la disponibilidad
        await allure.startStep('Validar que se muestra la disponibilidad');
        await expect(ProductoPage.disponibilidad).toBeDisplayed();
        await allure.endStep();

        // Paso 8: Validar que se muestra el campo cantidad
        await allure.startStep('Validar que se muestra el campo cantidad');
        await expect(ProductoPage.cantidadInput).toBeDisplayed();
        await allure.endStep();

        // Paso 9: Validar que se muestra el botón agregar al carrito
        await allure.startStep('Validar que se muestra el botón agregar al carrito');
        await expect(ProductoPage.btnAgregarCarrito).toBeDisplayed();
        await allure.endStep();

        // Paso 10: Validar que se muestra la descripción
        await allure.startStep('Validar que se muestra la descripción');
        await expect(ProductoPage.descripcion).toBeDisplayed();
        await allure.endStep();
    });
});
