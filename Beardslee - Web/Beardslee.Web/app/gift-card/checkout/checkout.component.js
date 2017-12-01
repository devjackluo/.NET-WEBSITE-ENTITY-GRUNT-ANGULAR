"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var giftCardCart_dto_1 = require("../models/giftCardCart.dto");
var GiftCardCheckoutComponent = (function () {
    function GiftCardCheckoutComponent(router, giftCardService) {
        this.router = router;
        this.giftCardService = giftCardService;
        this.HasErrors = false;
        this.shippingTypeErrorMessage = "";
        this.shippingFirstNameErrorMessage = "";
        this.shippingLastNameErrorMessage = "";
        this.shippingAddress1ErrorMessage = "";
        this.shippingCityErrorMessage = "";
        this.shippingStateErrorMessage = "";
        this.shippingPostalCodeErrorMessage = "";
        this.billingFirstNameErrorMessage = "";
        this.billingLastNameErrorMessage = "";
        this.billingAddress1ErrorMessage = "";
        this.billingCityErrorMessage = "";
        this.billingStateErrorMessage = "";
        this.billingPostalCodeErrorMessage = "";
        this.billingPhoneErrorMessage = "";
        this.billingEmailErrorMessage = "";
    }
    GiftCardCheckoutComponent.prototype.ngOnInit = function () {
        this.UniqueIdentifier = this.giftCardService.giftCardCart.UniqueIdentifier;
        this.Amount = this.giftCardService.giftCardCart.Amount;
    };
    GiftCardCheckoutComponent.prototype.back = function () {
        this.router.navigate(["/GiftCards/enter-amount"]);
    };
    GiftCardCheckoutComponent.prototype.continue = function () {
        var _this = this;
        this.clearErrors();
        //Error Check
        if (this.ShippingType == 0 || this.ShippingType == null) {
            this.shippingTypeErrorMessage = "A shipping type is required.";
            this.HasErrors = true;
        }
        else if (this.ShippingType == 3) {
            this.ShippingCost = 8;
            this.OrderTotal = this.ShippingCost + this.Amount;
        }
        else if (this.ShippingType == 2) {
            this.ShippingCost = 0;
            this.OrderTotal = this.ShippingCost + this.Amount;
        }
        else if (this.ShippingType == 1) {
            this.ShippingCost = 0;
            this.OrderTotal = this.ShippingCost + this.Amount;
        }
        if (this.ShippingFirstName == null) {
            this.shippingFirstNameErrorMessage = "A shipping first name is required.";
            this.HasErrors = true;
        }
        if (this.ShippingLastName == null) {
            this.shippingLastNameErrorMessage = "A shipping last name is required.";
            this.HasErrors = true;
        }
        if (this.ShippingAddress1 == null) {
            this.shippingAddress1ErrorMessage = "A shipping address is required.";
            this.HasErrors = true;
        }
        if (this.ShippingCity == null) {
            this.shippingCityErrorMessage = "A shipping city is required.";
            this.HasErrors = true;
        }
        if (this.ShippingState == null || this.ShippingState == "0") {
            this.shippingStateErrorMessage = "A shipping state is required.";
            this.HasErrors = true;
        }
        if (this.ShippingPostalCode == null) {
            this.shippingPostalCodeErrorMessage = "A shipping postal code is required.";
            this.HasErrors = true;
        }
        if (this.BillingFirstName == null) {
            this.billingFirstNameErrorMessage = "A billing first name is required.";
            this.HasErrors = true;
        }
        if (this.BillingLastName == null) {
            this.billingLastNameErrorMessage = "A billing last name is required.";
            this.HasErrors = true;
        }
        if (this.BillingAddress1 == null) {
            this.billingAddress1ErrorMessage = "A billing address is required.";
            this.HasErrors = true;
        }
        if (this.BillingCity == null) {
            this.billingCityErrorMessage = "A billing city is required.";
            this.HasErrors = true;
        }
        if (this.BillingState == null || this.BillingState == "0") {
            this.billingStateErrorMessage = "A billing state is required.";
            this.HasErrors = true;
        }
        if (this.BillingPostalCode == null) {
            this.billingPostalCodeErrorMessage = "A billing postal code is required.";
            this.HasErrors = true;
        }
        if (this.BillingPhone == null) {
            this.billingPhoneErrorMessage = "A billing phone is required.";
            this.HasErrors = true;
        }
        if (this.BillingEmail == null) {
            this.billingEmailErrorMessage = "A billing email is required.";
            this.HasErrors = true;
        }
        else {
            var regex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;
            if (regex.test(this.BillingEmail) == false) {
                this.billingEmailErrorMessage = "Enter a valid email address.";
                this.HasErrors = true;
            }
        }
        if (this.HasErrors == true) {
            return;
        }
        var giftCardCartToUpdate = new giftCardCart_dto_1.GiftCardCart();
        giftCardCartToUpdate.UniqueIdentifier = this.giftCardService.giftCardCart.UniqueIdentifier;
        giftCardCartToUpdate.ShippingFirstName = this.ShippingFirstName;
        giftCardCartToUpdate.ShippingLastName = this.ShippingLastName;
        //giftCardCartToUpdate.ShippingAddress1 = this.ShippingAddress1;
        if (this.ShippingApt != null) {
            giftCardCartToUpdate.ShippingAddress1 = this.ShippingAddress1 + " " + this.ShippingApt;
        }
        else {
            giftCardCartToUpdate.ShippingAddress1 = this.ShippingAddress1;
        }
        giftCardCartToUpdate.ShippingAddress2 = this.ShippingAddress2;
        giftCardCartToUpdate.ShippingCity = this.ShippingCity;
        giftCardCartToUpdate.ShippingState = this.ShippingState;
        giftCardCartToUpdate.ShippingPostalCode = this.ShippingPostalCode;
        giftCardCartToUpdate.ShippingPhone = this.ShippingPhone;
        giftCardCartToUpdate.ShippingEmail = this.ShippingEmail;
        giftCardCartToUpdate.BillingFirstName = this.BillingFirstName;
        giftCardCartToUpdate.BillingLastName = this.BillingLastName;
        //giftCardCartToUpdate.BillingAddress1 = this.BillingAddress1;
        if (this.BillingApt != null) {
            giftCardCartToUpdate.BillingAddress1 = this.BillingAddress1 + " " + this.BillingApt;
        }
        else {
            giftCardCartToUpdate.BillingAddress1 = this.BillingAddress1;
        }
        giftCardCartToUpdate.BillingAddress2 = this.BillingAddress2;
        giftCardCartToUpdate.BillingCity = this.BillingCity;
        giftCardCartToUpdate.BillingState = this.BillingState;
        giftCardCartToUpdate.BillingPostalCode = this.BillingPostalCode;
        giftCardCartToUpdate.BillingPhone = this.BillingPhone;
        giftCardCartToUpdate.BillingEmail = this.BillingEmail;
        giftCardCartToUpdate.ShippingType = this.ShippingType;
        giftCardCartToUpdate.ShippingCost = this.ShippingCost;
        giftCardCartToUpdate.Message = this.Message;
        giftCardCartToUpdate.SpecialInstructions = this.SpecialInstructions;
        giftCardCartToUpdate.OrderTotal = this.OrderTotal;
        //Call Web Api
        this.giftCardService.updateGiftCardCartCheckout(giftCardCartToUpdate)
            .then(function (isSuccessful) {
            console.log("updated Successful: " + JSON.stringify(isSuccessful));
            if (isSuccessful) {
                _this.router.navigate(["/GiftCards/preview"]);
            }
            else {
            }
        });
    };
    GiftCardCheckoutComponent.prototype.sameInfo = function () {
        this.BillingFirstName = this.ShippingFirstName;
        this.BillingLastName = this.ShippingLastName;
        this.BillingAddress1 = this.ShippingAddress1;
        this.BillingCity = this.ShippingCity;
        this.BillingState = this.ShippingState;
        this.BillingPostalCode = this.ShippingPostalCode;
        this.BillingPhone = this.ShippingPhone;
        this.BillingEmail = this.ShippingEmail;
        this.BillingApt = this.ShippingApt;
    };
    GiftCardCheckoutComponent.prototype.clearErrors = function () {
        this.HasErrors = false;
        this.shippingTypeErrorMessage = "";
        this.shippingFirstNameErrorMessage = "";
        this.shippingLastNameErrorMessage = "";
        this.shippingAddress1ErrorMessage = "";
        this.shippingCityErrorMessage = "";
        this.shippingStateErrorMessage = "";
        this.shippingPostalCodeErrorMessage = "";
        this.billingFirstNameErrorMessage = "";
        this.billingLastNameErrorMessage = "";
        this.billingAddress1ErrorMessage = "";
        this.billingCityErrorMessage = "";
        this.billingStateErrorMessage = "";
        this.billingPostalCodeErrorMessage = "";
        this.billingPhoneErrorMessage = "";
        this.billingEmailErrorMessage = "";
    };
    GiftCardCheckoutComponent = __decorate([
        core_1.Component({
            selector: "gift-card-checkout",
            templateUrl: "./app/gift-card/checkout/checkout.html",
            styleUrls: ["./app/css/gift-cards.component.css"]
        })
    ], GiftCardCheckoutComponent);
    return GiftCardCheckoutComponent;
}());
exports.GiftCardCheckoutComponent = GiftCardCheckoutComponent;
