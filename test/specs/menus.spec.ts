import HomePage from '../pageobjects/home.page';
import MenusPage from '../pageobjects/menus.page';

describe('Navegación de menús', () => {
    it('Debe navegar a Desktops desde el menú Computers', async () => {
        await HomePage.open();
        await MenusPage.irASubMenu('computers', 'desktops');
        const h1Text = await $('h1').getText();
        expect(h1Text).toContain('Desktops');
    });
}); 