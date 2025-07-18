/**
 * Page Object para la navegación de menús principales y submenús
 */
class MenusPage {
    /**
     * Selector para el menú principal por texto
     */
    public menuPrincipal(nombre: string) {
        return $(`a[href="/${nombre.toLowerCase()}"]`);
    }

    /**
     * Selector para submenú por texto
     */
    public subMenu(nombre: string) {
        return $(`a[href="/${nombre.toLowerCase()}"]`);
    }

    /**
     * Hace clic en el menú principal y luego en el submenú
     */
    public async irASubMenu(menu: string, subMenu: string) {
        const menuElem = await $(`a[href="/${menu.toLowerCase()}"]`);
        await menuElem.waitForExist({ timeout: 5000 });
        await menuElem.moveTo(); // Hover para mostrar el submenú
        const subMenuElem = await $(`a[href="/${subMenu.toLowerCase()}"]`);
        await subMenuElem.waitForExist({ timeout: 5000 });
        await subMenuElem.click();
    }

    /**
     * Hace clic en el menú "Desktops" y luego en el submenú "Mac"
     */
    public async irAMacDesdeDesktops() {
        const desktopsMenu = await $('a.dropdown-toggle=Desktops');
        await desktopsMenu.waitForExist({ timeout: 5000 });
        await desktopsMenu.moveTo(); // Hover para mostrar el submenú
        await browser.pause(1000); // Espera 1 segundo para que el submenú sea interactuable

        const macSubmenu = await $('a=Mac (1)');
        await macSubmenu.waitForExist({ timeout: 5000 });
        await macSubmenu.click();
    }

    /**
     * Hace clic en el primer producto de la lista para ir a la página de detalles
     */
    public async irAPrimerProducto() {
        // Buscar el primer producto por su nombre (enlace)
        const primerProducto = await $('h4 a');
        await primerProducto.waitForExist({ timeout: 5000 });
        await primerProducto.click();
        
        // Esperar a que la página de detalles cargue
        await browser.pause(2000);
    }
}

export default new MenusPage(); 