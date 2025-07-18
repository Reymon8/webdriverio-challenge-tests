import ProductoPage from '../pageobjects/producto.page';
import HomePage from '../pageobjects/home.page';
import allure from '@wdio/allure-reporter';
import MenusPage from '../pageobjects/menus.page';
import CarritoPage from '../pageobjects/carrito.page';

describe('Producto', () => {
    beforeEach(async () => {
        await HomePage.open();
        await CarritoPage.vaciarCarrito();
    });

    it('CP001 - Ver detalle de un producto', async () => {
        allure.startStep('Ir al home');
        await HomePage.open();
        allure.addAttachment('Screenshot Home', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Navegar a Mac desde Desktops');
        await MenusPage.irAMacDesdeDesktops();
        allure.addAttachment('Screenshot Mac', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Hacer clic en el primer producto');
        await MenusPage.irAPrimerProducto();
        allure.addAttachment('Screenshot Producto Detalle', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Validar información del producto');
        await expect(ProductoPage.nombreProducto).toBeDisplayed();
        await expect(ProductoPage.marca).toBeDisplayed();
        await expect(ProductoPage.codigo).toBeDisplayed();
        await expect(ProductoPage.disponibilidad).toBeDisplayed();
        await expect(ProductoPage.cantidadInput).toBeDisplayed();
        await expect(ProductoPage.btnAgregarCarrito).toBeDisplayed();
        await expect(ProductoPage.descripcion).toBeDisplayed();
        allure.addAttachment('Screenshot Validación Producto', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
    });
});
