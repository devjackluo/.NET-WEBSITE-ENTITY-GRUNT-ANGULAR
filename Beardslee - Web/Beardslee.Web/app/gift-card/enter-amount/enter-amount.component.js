"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var giftCardCart_dto_1 = require("../models/giftCardCart.dto");
var GiftCardEnterAmountComponent = (function () {
    function GiftCardEnterAmountComponent(router, giftCardService) {
        this.router = router;
        this.giftCardService = giftCardService;
        this.errorMessage = "";
    }
    GiftCardEnterAmountComponent.prototype.continue = function () {
        var _this = this;
        this.errorMessage = "";
        if (this.Amount == null) {
            this.errorMessage = "A amount is required.";
            return;
        }
        else {
            var regex = /^\d{1,3}(\.\d{1,2})?$/;
            if (regex.test(this.Amount.toString()) == false) {
                this.errorMessage = "Amount is invalid.";
                return;
            }
        }
        if (this.Amount < 25 || this.Amount > 500) {
            this.errorMessage = "You must enter an amount between $25 and $500.";
            return;
        }
        var giftCardCard = new giftCardCart_dto_1.GiftCardCart();
        giftCardCard.Amount = this.Amount;
        this.giftCardService.addGiftCardCart(giftCardCard)
            .then(function (giftCardCard) {
            console.log("Added GiftcardCart: " + JSON.stringify(giftCardCard));
            _this.giftCardService.giftCardCart = giftCardCard;
            _this.router.navigate(["/GiftCards/checkout"]);
        });
    };
    GiftCardEnterAmountComponent = __decorate([
        core_1.Component({
            selector: "gift-card-enter-amount",
            templateUrl: "./app/gift-card/enter-amount/enter-amount.html",
            styleUrls: ["./app/css/gift-cards.component.css"]
        })
    ], GiftCardEnterAmountComponent);
    return GiftCardEnterAmountComponent;
}());
exports.GiftCardEnterAmountComponent = GiftCardEnterAmountComponent;
