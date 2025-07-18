import CheckoutPage from '../pageobjects/checkout.page';
import allure from '@wdio/allure-reporter';
import HomePage from '../pageobjects/home.page';
import CarritoPage from '../pageobjects/carrito.page';

describe('Checkout', () => {
    beforeEach(async () => {
        await HomePage.open();
        await CarritoPage.vaciarCarrito();
    });

    it('CP008 - Confirmar pedido como usuario autenticado', async () => {
        // Paso 1: Login
        allure.startStep('Ir al home');
        await browser.url('https://demo.opencart.com/');
        allure.addAttachment('Screenshot Home', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        allure.startStep('Abrir menú My Account y seleccionar Login');
        const myAccount = await $('//a[contains(@class,"dropdown-toggle") and contains(.,"My Account")]');
        await myAccount.click();
        const loginOption = await $('a=Login');
        await loginOption.waitForClickable({ timeout: 5000 });
        await loginOption.click();
        allure.addAttachment('Screenshot Login Form', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        allure.startStep('Ingresar usuario y contraseña y confirmar login');
        await CheckoutPage.inputEmail.setValue('ramongo@gmail.com');
        await CheckoutPage.inputPassword.setValue('Pruebas123');
        const loginBtn = await $('button=Login');
        await loginBtn.click();
        allure.addAttachment('Screenshot Post Login', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        // Paso 2: Agregar producto al carrito (flujo CP003)
        // Hover en Desktops
        allure.startStep('Abrir menú Desktops');
        await $('a.dropdown-toggle=Desktops').moveTo();
        allure.addAttachment('Screenshot Menu Desktops', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        // Click en Show All Desktops
        allure.startStep('Clic en Show All Desktops');
        await $('a.see-all=Show All Desktops').click();
        allure.addAttachment('Screenshot Show All Desktops', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        // Esperar y click en HP LP3065
        allure.startStep('Seleccionar producto HP LP3065');
        const hpProduct = await $('a[href*="desktops/hp-lp3065"]');
        await hpProduct.waitForClickable({ timeout: 5000 });
        await hpProduct.click();
        allure.addAttachment('Screenshot HP LP3065', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Seleccionar fecha (si aplica)');
        if (await CheckoutPage.dateInput.isExisting()) {
            await CheckoutPage.dateInput.setValue('2024-06-30');
            allure.addAttachment('Screenshot Fecha Seleccionada', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        }
        allure.endStep();
        await browser.pause(1000);

        allure.startStep('Agregar al carrito');
        await CheckoutPage.addToCartBtn.click();
        allure.addAttachment('Screenshot Agregado', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        allure.startStep('Ir al carrito');
        await CheckoutPage.cartLink.waitForClickable({ timeout: 5000 });
        await CheckoutPage.cartLink.click();
        allure.addAttachment('Screenshot Carrito', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        // Paso 3: Proceder a checkout
        allure.startStep('Proceder a Checkout desde el carrito');
        await CheckoutPage.checkoutBtn.waitForClickable({ timeout: 5000 });
        await CheckoutPage.checkoutBtn.click();
        allure.addAttachment('Screenshot Checkout', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        // Paso 4: Completar datos de checkout y confirmar pedido
        allure.startStep('Completar datos de checkout');
        if (await CheckoutPage.inputFirstName.isExisting()) {
            await CheckoutPage.inputFirstName.setValue('Test');
            await CheckoutPage.inputLastName.setValue('User');
            await CheckoutPage.inputAddress1.setValue('Test Address 1');
            await CheckoutPage.inputCity.setValue('London');
            await CheckoutPage.inputPostcode.setValue('5234532');
            await CheckoutPage.selectCountry.selectByVisibleText('United Kingdom');
            await browser.pause(500);
            await CheckoutPage.selectRegion.selectByVisibleText('Perth and Kinross');
            allure.addAttachment('Screenshot Dirección Rellena', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        }
        const continueBtns = await CheckoutPage.continueBtns;
        for (const btn of continueBtns) {
            if (await btn.isDisplayed() && await btn.isClickable()) {
                await btn.click();
                await browser.pause(1000);
            }
        }
        allure.addAttachment('Screenshot Confirmación', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        // Seleccionar dirección de envío si hay select
        allure.startStep('Seleccionar dirección de envío');
        if (await CheckoutPage.selectShippingAddress.isExisting()) {
            await CheckoutPage.selectShippingAddress.selectByIndex(1);
            allure.addAttachment('Screenshot Dirección Seleccionada', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        }
        allure.endStep();
        await browser.pause(500);

        // Utilidad interna para seleccionar opción en modal y continuar
        async function seleccionarOpcionModal(modalId: string, radioId: string) {
            const modal = await $(`#${modalId}`);
            await modal.waitForDisplayed({ timeout: 5000 });
            const radio = await $(radioId);
            if (await radio.isExisting()) {
                await radio.click();
            }
            // Usar XPath puro para el botón Continue dentro del modal
            const continueBtn = await $(`//div[@id='${modalId}']//button[normalize-space()='Continue']`);
            await continueBtn.click();
            await modal.waitForDisplayed({ reverse: true, timeout: 10000 });
        }

        // Elegir método de envío
        allure.startStep('Elegir método de envío');
        await CheckoutPage.buttonShippingMethods.click();
        await seleccionarOpcionModal('modal-shipping', '#input-shipping-method-flat-flat');
        allure.addAttachment('Screenshot Shipping Method', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(500);

        // Elegir método de pago
        allure.startStep('Elegir método de pago');
        await CheckoutPage.buttonPaymentMethods.click();
        await seleccionarOpcionModal('modal-payment', '#input-payment-method-cod-cod');
        allure.addAttachment('Screenshot Payment Method', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(500);

        // Confirmar pedido
        allure.startStep('Confirmar pedido');
        await CheckoutPage.buttonConfirm.click();
        allure.addAttachment('Screenshot Confirm Order', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        // Paso 5: Validar confirmación
        allure.startStep('Validar confirmación de pedido');
        await CheckoutPage.confirmMsg.waitForDisplayed({ timeout: 10000 });
        allure.addAttachment('Screenshot Pedido Exitoso', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);
    });

    it('CP009 - Validar errores en checkout por falta de datos', async () => {
        // Si ya está logueado, cerrar sesión
        const myAccount = await $('//a[contains(@class,"dropdown-toggle") and contains(.,"My Account")]');
        await myAccount.click();
        const logoutOption = await $('a=Logout');
        if (await logoutOption.isExisting()) {
            await logoutOption.click();
            await browser.pause(1000);
            // Volver a abrir el menú para que aparezca Login
            await myAccount.click();
        }

        allure.startStep('Ir al home');
        await browser.url('https://demo.opencart.com/');
        allure.addAttachment('Screenshot Home', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        allure.startStep('Abrir menú My Account y seleccionar Login');
        const loginOption = await $('a=Login');
        await loginOption.waitForClickable({ timeout: 5000 });
        await loginOption.click();
        allure.addAttachment('Screenshot Login', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        allure.startStep('Ingresar usuario y contraseña y confirmar login');
        await CheckoutPage.inputEmail.setValue('ramongo@gmail.com');
        await CheckoutPage.inputPassword.setValue('Pruebas123');
        const loginBtn = await $('button=Login');
        await loginBtn.click();
        allure.addAttachment('Screenshot Post Login', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        // Seleccionar producto y agregar al carrito (igual que en CP008)
        allure.startStep('Abrir menú Desktops');
        await $('a.dropdown-toggle=Desktops').moveTo();
        allure.addAttachment('Screenshot Menu Desktops', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(500);

        allure.startStep('Clic en Show All Desktops');
        await $('a.see-all=Show All Desktops').click();
        allure.addAttachment('Screenshot Show All Desktops', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(500);

        allure.startStep('Seleccionar producto HP LP3065');
        const hpProduct = await $('a[href*="desktops/hp-lp3065"]');
        await hpProduct.waitForClickable({ timeout: 5000 });
        await hpProduct.click();
        allure.addAttachment('Screenshot HP LP3065', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(500);

        allure.startStep('Agregar al carrito');
        await CheckoutPage.addToCartBtn.click();
        allure.addAttachment('Screenshot Producto Agregado', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        // Ir al carrito
        allure.startStep('Ir al carrito');
        await CheckoutPage.cartLink.click();
        allure.addAttachment('Screenshot Carrito', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        // Ir a checkout
        allure.startStep('Ir a checkout');
        await CheckoutPage.checkoutBtn.click();
        allure.addAttachment('Screenshot Checkout', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        // Hacer click en los botones Choose y validar errores
        allure.startStep('Click en Choose de Shipping Method');
        await CheckoutPage.buttonShippingMethods.click();
        await browser.pause(500);
        expect(await CheckoutPage.errorShippingMethod.isDisplayed()).toBe(true);
        expect(await CheckoutPage.errorShippingMethod.getText()).toContain('Shipping address required!');
        allure.addStep('Error visualizado: Shipping address required!');
        allure.endStep();

        allure.startStep('Click en Choose de Payment Method');
        await CheckoutPage.buttonPaymentMethods.click();
        await browser.pause(500);
        expect(await CheckoutPage.errorPaymentMethod.isDisplayed()).toBe(true);
        expect(await CheckoutPage.errorPaymentMethod.getText()).toContain('Shipping method required!');
        allure.addStep('Error visualizado: Shipping method required!');
        allure.addAttachment('Screenshot Errores Checkout', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);
    });

});
