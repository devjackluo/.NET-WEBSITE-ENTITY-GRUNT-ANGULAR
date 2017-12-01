"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var GiftCardReceiptComponent = (function () {
    function GiftCardReceiptComponent(giftCardService) {
        this.giftCardService = giftCardService;
        this.ShippingTypeString = "";
    }
    GiftCardReceiptComponent.prototype.ngOnInit = function () {
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
            _this.CardType = giftCart.CreditCardType;
            _this.ConfirmationCode = (Math.floor(Math.random() * 99999) + 1) + "-" + (Math.floor(Math.random() * 99999) + 1);
            if (_this.ShippingType == 1) {
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
    GiftCardReceiptComponent = __decorate([
        core_1.Component({
            selector: "gift-card-receipt",
            templateUrl: "./app/gift-card/receipt/receipt.html",
            styleUrls: ["./app/css/gift-cards.component.css"]
        })
    ], GiftCardReceiptComponent);
    return GiftCardReceiptComponent;
}());
exports.GiftCardReceiptComponent = GiftCardReceiptComponent;
