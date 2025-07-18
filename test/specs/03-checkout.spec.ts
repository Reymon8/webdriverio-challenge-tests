import CheckoutPage from '../pageobjects/checkout.page';
import HomePage from '../pageobjects/home.page';
import ProductoPage from '../pageobjects/producto.page';

describe('Checkout', () => {
    it('CP008 - Confirmar pedido como usuario autenticado', async () => {
        // Loguearse
        // Agregar producto al carrito
        // Iniciar checkout
        // Completar datos y confirmar pedido
        // Validar confirmación
    });

    it('CP009 - Validar errores en checkout por falta de datos', async () => {
        // Intentar avanzar sin dirección, método de envío o pago
        // Validar errores
        // Validar campo comentario opcional
        // Validar que el botón "Confirmar pedido" solo se habilita si todo está completo
    });
});
