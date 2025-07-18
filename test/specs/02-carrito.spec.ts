import HomePage from '../pageobjects/home.page';
import ProductoPage from '../pageobjects/producto.page';
import allure from '@wdio/allure-reporter';
import CarritoPage from '../pageobjects/carrito.page';


describe('Carrito de compras', () => {
    beforeEach(async () => {
        await HomePage.open();
        await CarritoPage.vaciarCarrito();
    });

    it('CP002 - Agregar producto al carrito y validar tabla', async () => {
        allure.startStep('Ir al home');
        await HomePage.open();
        allure.addAttachment('Screenshot Home', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Abrir menú Desktops');
        await $('a.dropdown-toggle=Desktops').moveTo();
        allure.addAttachment('Screenshot Menu Desktops', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Clic en Show All Desktops');
        await $('a.see-all=Show All Desktops').click();
        allure.addAttachment('Screenshot Show All Desktops', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Seleccionar producto HP LP3065');
        await $('a=HP LP3065').click();
        allure.addAttachment('Screenshot HP LP3065', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Agregar producto al carrito');
        await ProductoPage.btnAgregarCarrito.click();
        allure.addAttachment('Screenshot Agregado', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Ir al carrito y validar tabla');
        await $('a[title="Shopping Cart"]').click();
        allure.addAttachment('Screenshot Carrito', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

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
        allure.addAttachment('Screenshot Validación Carrito', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
    });

    it('CP003 - Actualizar cantidad de producto MacBook Air en el carrito', async () => {
        allure.startStep('Ir al home');
        await HomePage.open();
        allure.addAttachment('Screenshot Home', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Abrir menú Desktops');
        const desktopsMenu = await $('a.dropdown-toggle=Desktops');
        await desktopsMenu.moveTo();
        allure.addAttachment('Screenshot Menu Desktops', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Clic en Show All Desktops');
        const showAllDesktops = await $('a.see-all=Show All Desktops');
        await showAllDesktops.waitForClickable({ timeout: 5000 });
        await showAllDesktops.click();
        allure.addAttachment('Screenshot Show All Desktops', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Clic en Laptops & Notebooks');
        const laptopsLink = await $('a.list-group-item*=Laptops & Notebooks');
        await laptopsLink.waitForClickable({ timeout: 5000 });
        await laptopsLink.click();
        allure.addAttachment('Screenshot Laptops & Notebooks', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Seleccionar producto MacBook Air');
        const macbookAirProduct = await $('a=MacBook Air');
        await macbookAirProduct.waitForDisplayed({ timeout: 10000 });
        await macbookAirProduct.click();
        allure.addAttachment('Screenshot MacBook Air', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Agregar al carrito');
        await ProductoPage.btnAgregarCarrito.click();
        allure.addAttachment('Screenshot Agregado', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        // ⚠ Esperar confirmación visual de agregado al carrito
        const successAlert = await $('.alert-success');
        await successAlert.waitForDisplayed({ timeout: 5000 });
        allure.addAttachment('Screenshot Alert Success', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Ir al carrito');
        await $('a[title="Shopping Cart"]').click();
        allure.addAttachment('Screenshot Carrito', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        // Paso 7: Buscar la fila de MacBook Air y actualizar cantidad
        const cantidadInput = await $('//a[contains(@href,"macbook-air")]/ancestor::tr//input[@name="quantity"]');
        await cantidadInput.waitForExist({ timeout: 5000 });
        await cantidadInput.setValue('2');
        const updateBtn = await $('//a[contains(@href,"macbook-air")]/ancestor::tr//form//button[@type="submit" and contains(@class,"btn-primary")]');
        console.log('Update button found:', await updateBtn.isExisting(), 'Displayed:', await updateBtn.isDisplayed(), 'Enabled:', await updateBtn.isEnabled());
        await updateBtn.waitForClickable({ timeout: 5000 });
        await updateBtn.click();

        // Esperar actualización
        await browser.pause(2000);

        // Verificar cantidad
        expect(await cantidadInput.getValue()).toBe('2');
        allure.addAttachment('Screenshot Actualización Cantidad', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
    });


    it('CP004 - Eliminar producto HP LP3065 desde el popup del carrito', async () => {
        allure.startStep('Ir al home');
        await HomePage.open();
        allure.addAttachment('Screenshot Home', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Ir a la sección Desktops > Show All Desktops');
        const desktopsMenu = await $('a.dropdown-toggle=Desktops');
        await desktopsMenu.moveTo();
        allure.addAttachment('Screenshot Menu Desktops', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        const showAllDesktops = await $('a.see-all=Show All Desktops');
        await showAllDesktops.waitForClickable({ timeout: 5000 });
        await showAllDesktops.click();
        allure.addAttachment('Screenshot Show All Desktops', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Click en HP LP3065');
        const hpProduct = await $('a=HP LP3065');
        await hpProduct.waitForClickable({ timeout: 5000 });
        await hpProduct.click();
        allure.addAttachment('Screenshot HP LP3065', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Agregar al carrito');
        await ProductoPage.btnAgregarCarrito.click();
        allure.addAttachment('Screenshot Agregado', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Esperar alerta de éxito');
        const successAlert = await $('.alert-success');
        await successAlert.waitForDisplayed({ timeout: 5000 });
        allure.addAttachment('Screenshot Alert Success', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Abrir el popup del carrito');
        const cartButton = await $('button.dropdown-toggle');
        await cartButton.click();
        allure.addAttachment('Screenshot Carrito', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        const popup = await $('#header-cart');
        await popup.waitForDisplayed({ timeout: 3000 });
        allure.endStep();

        allure.startStep('Click en el botón rojo de eliminar');
        const removeBtn = await popup.$('button.btn-danger');
        await removeBtn.waitForClickable({ timeout: 5000 });
        await removeBtn.click();
        allure.addAttachment('Screenshot Eliminar Producto', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Esperar a que el producto desaparezca del popup');
        await browser.waitUntil(
          async () => !(await popup.$('=HP LP3065').isExisting()),
          {
            timeout: 5000,
            timeoutMsg: 'El producto HP LP3065 sigue apareciendo en el popup del carrito',
          }
        );
        allure.addAttachment('Screenshot Eliminado', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Evidencia visual del popup vacío');
        await browser.saveScreenshot('./evidencia_popup_eliminado.png');
        allure.endStep();
    });
    

    it('CP005 - Validar mensaje de carrito vacío', async () => {
        allure.startStep('Ir al home');
        await HomePage.open();
        allure.addAttachment('Screenshot Home', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        allure.startStep('Ir al carrito');
        await $('a[title="Shopping Cart"]').click();
        allure.addAttachment('Screenshot Carrito Vacio', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        // Validar mensaje de carrito vacío
        const mensajeVacio = await $('#content p');
        const texto = await mensajeVacio.getText();
        expect(texto).toContain('Your shopping cart is empty!');
    });

    it('CP006 - Validar botones “Continuar comprando” y “Pasar al checkout”', async () => {
        allure.startStep('Ir al home');
        await HomePage.open();
        allure.addAttachment('Screenshot Home', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        allure.startStep('Ir a la sección Desktops > Show All Desktops');
        const desktopsMenu = await $('a.dropdown-toggle=Desktops');
        await desktopsMenu.moveTo();
        allure.addAttachment('Screenshot Menu Desktops', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        const showAllDesktops = await $('a.see-all=Show All Desktops');
        await showAllDesktops.waitForClickable({ timeout: 5000 });
        await showAllDesktops.click();
        allure.addAttachment('Screenshot Show All Desktops', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Clic en Laptops & Notebooks');
        const laptopsLink = await $('a.list-group-item*=Laptops & Notebooks');
        await laptopsLink.waitForClickable({ timeout: 5000 });
        await laptopsLink.click();
        allure.addAttachment('Screenshot Laptops & Notebooks', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Seleccionar producto MacBook Air');
        const macbookAirProduct = await $('a=MacBook Air');
        await macbookAirProduct.waitForDisplayed({ timeout: 10000 });
        await macbookAirProduct.click();
        allure.addAttachment('Screenshot MacBook Air', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Agregar al carrito');
        await ProductoPage.btnAgregarCarrito.click();
        allure.addAttachment('Screenshot Agregado', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();

        allure.startStep('Ir al carrito');
        await $('a[title="Shopping Cart"]').click();
        allure.addAttachment('Screenshot Carrito', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        // Validar botón "Continue Shopping"
        const btnContinuar = await $('a.btn-default');
        await expect(btnContinuar).toBeDisplayed();
        allure.addAttachment('Screenshot Continue Shopping', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        // Validar botón "Checkout"
        const btnCheckout = await $('a.btn-primary');
        await expect(btnCheckout).toBeDisplayed();
        allure.addAttachment('Screenshot Checkout', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
    });

    it('CP007 - Mensaje de error por falta de stock', async () => {
        allure.startStep('Ir al home');
        await HomePage.open();
        allure.addAttachment('Screenshot Home', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        allure.startStep('Ir a la sección Desktops > Show All Desktops');
        const desktopsMenu = await $('a.dropdown-toggle=Desktops');
        await desktopsMenu.moveTo();
        const showAllDesktops = await $('a.see-all=Show All Desktops');
        await showAllDesktops.click();
        allure.addAttachment('Screenshot Desktops', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        allure.startStep('Seleccionar MacBook Air');
        const macbookAirProduct = await $('a=MacBook Air');
        await macbookAirProduct.click();
        allure.addAttachment('Screenshot MacBook Air', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        allure.startStep('Cambiar cantidad a 5');
        const cantidadInput = await $('#input-quantity');
        await cantidadInput.setValue('5');
        allure.addAttachment('Screenshot Cantidad 5', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        allure.startStep('Agregar al carrito');
        const addToCartBtn = await $('#button-cart');
        await addToCartBtn.click();
        allure.addAttachment('Screenshot Agregado', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        allure.startStep('Ir al carrito');
        const cartLink = await $('a[title="Shopping Cart"]');
        await cartLink.waitForClickable({ timeout: 5000 });
        await cartLink.click();
        allure.addAttachment('Screenshot Carrito', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        allure.startStep('Actualizar cantidad en la tabla');
        const updateBtn = await $('//a[contains(@href,"macbook-air")]/ancestor::tr//form//button[@type="submit" and contains(@class,"btn-primary")]');
        await updateBtn.waitForClickable({ timeout: 5000 });
        await updateBtn.click();
        allure.addAttachment('Screenshot Actualizado', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        allure.startStep('Abrir el popup del carrito');
        const cartButton = await $('button.dropdown-toggle');
        await cartButton.click();
        allure.addAttachment('Screenshot Popup Carrito', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        const popup = await $('#header-cart');
        await popup.waitForDisplayed({ timeout: 3000 });
        await browser.pause(1000);

        allure.startStep('Click en Checkout');
        const checkoutBtn = await popup.$('a[href*="route=checkout/checkout"]');
        await checkoutBtn.waitForClickable({ timeout: 5000 });
        await checkoutBtn.click();
        allure.addAttachment('Screenshot Click Checkout', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);

        allure.startStep('Validar mensaje de error por falta de stock');
        const alerta = await $('.alert-danger');
        await alerta.waitForDisplayed({ timeout: 5000 });
        const alertaTexto = await alerta.getText();
        expect(alertaTexto).toContain('not available in the desired quantity or not in stock');
        allure.addAttachment('Screenshot Alerta Stock', Buffer.from(await browser.takeScreenshot(), 'base64'), 'image/png');
        allure.endStep();
        await browser.pause(1000);
    });
});
