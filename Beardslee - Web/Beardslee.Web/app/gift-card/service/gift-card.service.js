"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var giftCardCart_dto_1 = require("../models/giftCardCart.dto");
var GiftCardService = (function () {
    function GiftCardService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.giftCardUrl = "api/1.0/GiftCard";
        this.giftCardCart = new giftCardCart_dto_1.GiftCardCart();
    }
    /*
    getPeople(): Promise<GiftCardCart[]> {
        console.log("getGiftCardCart called");
        return this.http.get(this.giftCardUrl)
            .toPromise()
            .then(response => response.json() as GiftCardCart[])
            .catch(this.handleError);
    }

    getGiftCardCart(giftCartCart: GiftCardCart): Promise<GiftCardCart> {
        return this.http.get(this.giftCardUrl + "/" + this.giftCardCart.UniqueIdentifier)
            .toPromise()
            .then(response => response.json() as GiftCardCart[])
            .catch(this.handleError);
    }
    */
    GiftCardService.prototype.getGiftCart = function (uniqueIdentifier) {
        var url = this.giftCardUrl + "/" + uniqueIdentifier;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    GiftCardService.prototype.addGiftCardCart = function (giftCardCart) {
        return this.http.post(this.giftCardUrl + "/create/1", JSON.stringify(giftCardCart), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    GiftCardService.prototype.updateGiftCardCartCheckout = function (giftCardCart) {
        return this.http.put(this.giftCardUrl + "/checkout", JSON.stringify(giftCardCart), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            console.log("response: " + response.status);
            return (response.status == 200);
        })
            .catch(this.handleError);
    };
    GiftCardService.prototype.updateGiftCardCartPreview = function (giftCardCart) {
        return this.http.put(this.giftCardUrl + "/preview", JSON.stringify(giftCardCart), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            console.log("response: " + response.status);
            return (response.status == 200);
        })
            .catch(this.handleError);
    };
    GiftCardService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    GiftCardService = __decorate([
        core_1.Injectable()
    ], GiftCardService);
    return GiftCardService;
}());
exports.GiftCardService = GiftCardService;
