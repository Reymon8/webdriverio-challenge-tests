class HistorialPage {
    public get linkOrderHistory() { return $('a=Order History'); }
    public get tableOrders() { return $('.table-responsive'); }
    public get firstViewBtn() { return $('a[data-original-title="View"]'); }
    public get orderStatus() { return $('td=Pending, td=Complete, td=Shipped, td=Processing'); }
    public get orderInfoStatus() { return $('//h4[contains(text(),"Order History")]/following-sibling::div//table//tbody/tr[1]/td[2]'); }
    // Puedes agregar más getters según el estado que quieras validar
}
export default new HistorialPage();
