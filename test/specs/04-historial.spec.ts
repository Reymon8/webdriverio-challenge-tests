import allure from '@wdio/allure-reporter';
import CheckoutPage from '../pageobjects/checkout.page';
import HistorialPage from '../pageobjects/historial.page';
import HomePage from '../pageobjects/home.page';
import CarritoPage from '../pageobjects/carrito.page';

beforeEach(async () => {
    await HomePage.open();
    await CarritoPage.vaciarCarrito();
});

describe('Historial de pedidos', () => {
    it('CP010 - Visualizar detalle y estado del pedido en historial', async () => {
        // Login
        allure.startStep('Iniciar sesión');
        await browser.url('https://demo.opencart.com/');
        const myAccount = await $('//a[contains(@class,"dropdown-toggle") and contains(.,"My Account")]');
        await myAccount.click();
        const loginOption = await $('a=Login');
        await loginOption.waitForClickable({ timeout: 5000 });
        await loginOption.click();
        await CheckoutPage.inputEmail.setValue('ramongo@gmail.com');
        await CheckoutPage.inputPassword.setValue('Pruebas123');
        const loginBtn = await $('button=Login');
        await loginBtn.click();
        allure.addAttachment('Screenshot Login', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        // Ir a historial de pedidos
        allure.startStep('Ir a historial de pedidos');
        await myAccount.click();
        await HistorialPage.linkOrderHistory.waitForClickable({ timeout: 5000 });
        await HistorialPage.linkOrderHistory.click();
        allure.addAttachment('Screenshot Historial', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        // Validar que hay al menos un pedido
        allure.startStep('Validar que hay pedidos en la tabla');
        await expect(HistorialPage.tableOrders).toBeDisplayed();
        const rows = await HistorialPage.tableOrders.$$('tbody tr');
        expect(rows.length).toBeGreaterThan(0);
        allure.addAttachment('Screenshot Tabla Pedidos', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        // Validar status en la tabla principal
        allure.startStep('Validar status del primer pedido en la tabla');
        const statusCell = await $('.table-responsive tbody tr:first-child td:nth-child(4)');
        const statusText = await statusCell.getText();
        expect(['Pending', 'Complete', 'Shipped', 'Processing']).toContain(statusText);
        allure.addAttachment('Screenshot Status Tabla', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.addStep(`Status del primer pedido: ${statusText}`);
        allure.endStep();
    });
}); 