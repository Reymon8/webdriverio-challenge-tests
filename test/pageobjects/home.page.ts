class HomePage {
    /**
     * Abre la página principal de OpenCart y espera a que el menú 'Desktops' esté visible
     */
    public async open() {
        await browser.url('https://demo.opencart.com/');

        // Validar si aparece el captcha de Cloudflare
        await browser.pause(1000);
        const captcha = await $('//p[contains(@class, "spacer-bottom") and contains(text(), "Verifique que usted es un ser humano")]');
        const isCaptchaPresent = await captcha.isExisting();
        console.log('¿Captcha presente?:', isCaptchaPresent);

        if (isCaptchaPresent) {
            try {
                console.log('Captcha detectado, ejecutando robotjs...');
                const { execSync } = require('child_process');
                execSync('node robot-auto-click.cjs');
                console.log('robotjs ejecutado');
                await browser.pause(2000);
            } catch (e) {
                console.error('Error ejecutando robotjs:', e);
            }
        } else {
            console.log('No hay captcha, continuando el test normalmente.');
        }

        // Ahora sí, espera el menú "Desktops" para validar que la home cargó
        await browser.waitUntil(
            async () => (await $('a.dropdown-toggle=Desktops')).isDisplayed(),
            {
                timeout: 15000,
                timeoutMsg: 'La home no se cargó correctamente',
            }
        );
    }
}
export default new HomePage();
