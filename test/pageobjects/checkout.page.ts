class CheckoutPage {
    public get inputEmail() { return $('#input-email'); }
    public get inputPassword() { return $('#input-password'); }
    public get inputFirstName() { return $('#input-payment-firstname'); }
    public get inputLastName() { return $('#input-payment-lastname'); }
    public get inputAddress1() { return $('#input-payment-address-1'); }
    public get inputCity() { return $('#input-payment-city'); }
    public get inputPostcode() { return $('#input-payment-postcode'); }
    public get selectCountry() { return $('#input-payment-country'); }
    public get selectRegion() { return $('#input-payment-zone'); }
    public get selectShippingAddress() { return $('#input-shipping-address'); }
    public get buttonShippingMethods() { return $('#button-shipping-methods'); }
    public get buttonPaymentMethods() { return $('#button-payment-methods'); }
    public get buttonConfirm() { return $('#button-confirm'); }
    public get addToCartBtn() { return $('#button-cart'); }
    public get dateInput() { return $('#input-option225'); }
    public get cartLink() { return $('a[title="Shopping Cart"]'); }
    public get checkoutBtn() { return $('a[href*="route=checkout/checkout"]'); }
    public get continueBtns() { return $$('input[type="button"], input[type="submit"], button[type="submit"]'); }
    public get confirmMsg() { return $('h1=Your order has been placed!'); }
    public get errorShippingMethod() { return $('#error-shipping-method'); }
    public get errorPaymentMethod() { return $('#error-payment-method'); }
}
export default new CheckoutPage();
