"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var giftCardCart_dto_1 = require("../models/giftCardCart.dto");
var GiftCardPreviewComponent = (function () {
    function GiftCardPreviewComponent(router, giftCardService) {
        this.router = router;
        this.giftCardService = giftCardService;
        this.ShippingTypeString = "";
        this.expirationMonthErrorMessage = "";
        this.expirationYearErrorMessage = "";
        this.cardTypeErrorMessage = "";
        this.cardNumberErrorMessage = "";
        this.HasErrors = false;
    }
    GiftCardPreviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.UniqueIdentifier = this.giftCardService.giftCardCart.UniqueIdentifier;
        this.giftCardService.getGiftCart(this.UniqueIdentifier).then(function (giftCart) {
            console.log("people: " + JSON.stringify(giftCart));
            _this.giftCart = giftCart;
            _this.Amount = giftCart.Amount.toFixed(2);
            _this.ShippingFirstName = giftCart.ShippingFirstName;
            _this.ShippingLastName = giftCart.ShippingLastName;
            _this.ShippingAddress1 = giftCart.ShippingAddress1;
            _this.ShippingCity = giftCart.ShippingCity;
            _this.ShippingState = giftCart.ShippingState;
            _this.ShippingPostalCode = giftCart.ShippingPostalCode;
            _this.ShippingPhone = giftCart.ShippingPhone;
            _this.ShippingEmail = giftCart.ShippingEmail;
            _this.BillingFirstName = giftCart.BillingFirstName;
            _this.BillingLastName = giftCart.BillingLastName;
            _this.BillingAddress1 = giftCart.BillingAddress1;
            _this.BillingCity = giftCart.BillingCity;
            _this.BillingState = giftCart.BillingState;
            _this.BillingPostalCode = giftCart.BillingPostalCode;
            _this.BillingPhone = giftCart.BillingPhone;
            _this.BillingEmail = giftCart.BillingEmail;
            _this.ShippingType = giftCart.ShippingType;
            _this.ShippingCost = giftCart.ShippingCost.toFixed(2);
            _this.Message = giftCart.Message;
            _this.SpecialInstructions = giftCart.SpecialInstructions;
            _this.OrderTotal = giftCart.OrderTotal.toFixed(2);
            if (_this.ShippingType == 1) {
                console.log("test");
                _this.ShippingTypeString = "Pick up at Beardslee";
            }
            else if (_this.ShippingType == 2) {
                _this.ShippingTypeString = "USPS Parcel Post";
            }
            else if (_this.ShippingType == 3) {
                _this.ShippingTypeString = "USPS 2-3 Day Priority Mail";
            }
        });
    };
    GiftCardPreviewComponent.prototype.back = function () {
        this.router.navigate(["/GiftCards/checkout"]);
    };
    GiftCardPreviewComponent.prototype.continue = function () {
        var _this = this;
        this.clearErrors();
        if (this.CardType == "0" || this.CardType == null) {
            this.cardTypeErrorMessage = "Must select an card type.";
            this.HasErrors = true;
        }
        if (this.CardNumber == null || this.CardNumber <= 0) {
            this.cardNumberErrorMessage = "Must enter an card number.";
            this.HasErrors = true;
        }
        else {
            var regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
            if (regex.test(this.CardNumber.toString()) == false) {
                this.cardNumberErrorMessage = "Must enter an valid card number.";
                this.HasErrors = true;
            }
        }
        var today = new Date();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (this.ExpirationMonth == 0 || this.ExpirationMonth == null) {
            this.expirationMonthErrorMessage = "Must enter an expiration month.";
            this.HasErrors = true;
        }
        if (this.ExpirationYear == 0 || this.ExpirationYear == null) {
            this.expirationYearErrorMessage = "Must enter an expiration year.";
            this.HasErrors = true;
        }
        if (this.ExpirationMonth < mm && this.ExpirationYear == yyyy) {
            this.expirationMonthErrorMessage = "Your card has expired.";
            this.HasErrors = true;
        }
        if (this.HasErrors == true) {
            return;
        }
        var giftCardCartToUpdate = new giftCardCart_dto_1.GiftCardCart();
        giftCardCartToUpdate.UniqueIdentifier = this.UniqueIdentifier;
        giftCardCartToUpdate.CreditCardType = this.CardType;
        this.giftCardService.updateGiftCardCartPreview(giftCardCartToUpdate)
            .then(function (isSuccessful) {
            //console.log("updated Successful: " + JSON.stringify(isSuccessful));
            if (isSuccessful) {
                _this.router.navigate(["/GiftCards/receipt"]);
            }
            else {
            }
        });
    };
    GiftCardPreviewComponent.prototype.clearErrors = function () {
        this.HasErrors = false;
        this.cardNumberErrorMessage = "";
        this.cardTypeErrorMessage = "";
        this.expirationMonthErrorMessage = "";
        this.expirationYearErrorMessage = "";
    };
    GiftCardPreviewComponent = __decorate([
        core_1.Component({
            selector: "gift-card-preview",
            templateUrl: "./app/gift-card/preview/preview.html",
            styleUrls: ["./app/css/gift-cards.component.css"]
        })
    ], GiftCardPreviewComponent);
    return GiftCardPreviewComponent;
}());
exports.GiftCardPreviewComponent = GiftCardPreviewComponent;
