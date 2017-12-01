import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { RouterModule, Routes} from '@angular/router';
import {HttpModule} from '@angular/http';


import {GiftCardAppComponent} from "./gift-card/gift-card-app.component";
import {GiftCardEnterAmountComponent} from "./gift-card/enter-amount/enter-amount.component";
import {GiftCardCheckoutComponent} from "./gift-card/checkout/checkout.component";
import {GiftCardPreviewComponent} from "./gift-card/preview/preview.component";
import {GiftCardReceiptComponent} from "./gift-card/receipt/receipt.component";

import {GiftCardService} from "./gift-card/service/gift-card.service";

const giftCardRoutes: Routes = [
    {
        path: 'GiftCards/enter-amount',
        component: GiftCardEnterAmountComponent
    },
    {
        path: 'GiftCards/checkout',
        component: GiftCardCheckoutComponent
    },
    {
        path: 'GiftCards/preview',
        component: GiftCardPreviewComponent
    },
    {
        path: 'GiftCards/receipt',
        component: GiftCardReceiptComponent
    },
    {
        path: '**',
        component: GiftCardEnterAmountComponent
    }
];


@NgModule({
    imports: [
        RouterModule.forRoot(giftCardRoutes),
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        GiftCardAppComponent,
        GiftCardEnterAmountComponent,
        GiftCardCheckoutComponent,
        GiftCardPreviewComponent,
        GiftCardReceiptComponent

    ],
    bootstrap: [GiftCardAppComponent],
    providers: [GiftCardService]
})
export class AppModule { }
