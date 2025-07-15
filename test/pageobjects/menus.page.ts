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
     * Navega a un submenú dado el menú principal y el submenú
     */
    public async irASubMenu(menu: string, subMenu: string) {
        const menuElem = await this.menuPrincipal(menu);
        await menuElem.waitForExist({ timeout: 5000 });
        await menuElem.moveTo();
        const subMenuElem = await this.subMenu(subMenu);
        await subMenuElem.waitForExist({ timeout: 5000 });
        await subMenuElem.click();
    }
}

export default new MenusPage(); 