"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require("@angular/forms");
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var gift_card_app_component_1 = require("./gift-card/gift-card-app.component");
var enter_amount_component_1 = require("./gift-card/enter-amount/enter-amount.component");
var checkout_component_1 = require("./gift-card/checkout/checkout.component");
var preview_component_1 = require("./gift-card/preview/preview.component");
var receipt_component_1 = require("./gift-card/receipt/receipt.component");
var gift_card_service_1 = require("./gift-card/service/gift-card.service");
var giftCardRoutes = [
    {
        path: 'GiftCards/enter-amount',
        component: enter_amount_component_1.GiftCardEnterAmountComponent
    },
    {
        path: 'GiftCards/checkout',
        component: checkout_component_1.GiftCardCheckoutComponent
    },
    {
        path: 'GiftCards/preview',
        component: preview_component_1.GiftCardPreviewComponent
    },
    {
        path: 'GiftCards/receipt',
        component: receipt_component_1.GiftCardReceiptComponent
    },
    {
        path: '**',
        component: enter_amount_component_1.GiftCardEnterAmountComponent
    }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(giftCardRoutes),
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule
            ],
            declarations: [
                gift_card_app_component_1.GiftCardAppComponent,
                enter_amount_component_1.GiftCardEnterAmountComponent,
                checkout_component_1.GiftCardCheckoutComponent,
                preview_component_1.GiftCardPreviewComponent,
                receipt_component_1.GiftCardReceiptComponent
            ],
            bootstrap: [gift_card_app_component_1.GiftCardAppComponent],
            providers: [gift_card_service_1.GiftCardService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
