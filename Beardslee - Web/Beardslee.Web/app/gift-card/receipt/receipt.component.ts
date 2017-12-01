import {Component} from "@angular/core";

import { GiftCardService} from "../service/gift-card.service";
import {GiftCardCart} from "../models/giftCardCart.dto";

@Component({
    selector: "gift-card-receipt",
    templateUrl: "./app/gift-card/receipt/receipt.html",
    styleUrls: ["./app/css/gift-cards.component.css"]
})

export class GiftCardReceiptComponent {

    UniqueIdentifier: string;
    Amount: string;
    ShippingFirstName: string;
    ShippingLastName: string;
    ShippingAddress1: string;
    ShippingAddress2: string;
    ShippingCity: string;
    ShippingState: string;
    ShippingPostalCode: string;
    ShippingPhone: string;
    ShippingEmail: string;
    BillingFirstName: string;
    BillingLastName: string;
    BillingAddress1: string;
    BillingCity: string;
    BillingState: string;
    BillingPostalCode: string;
    BillingPhone: string;
    BillingEmail: string;
    ShippingType: number;
    ShippingTypeString: string = "";
    ShippingCost: string;
    Message: string;
    SpecialInstructions: string;
    OrderTotal: string;

    CardType: string;
    //CardNumber: number;

    ConfirmationCode: string;

    giftCart: GiftCardCart;

    constructor(private giftCardService: GiftCardService) { }

    ngOnInit() {

        this.UniqueIdentifier = this.giftCardService.giftCardCart.UniqueIdentifier;

        this.giftCardService.getGiftCart(this.UniqueIdentifier).then(giftCart => {
            console.log("people: " + JSON.stringify(giftCart));
            this.giftCart = giftCart

            this.Amount = giftCart.Amount.toFixed(2);
            this.ShippingFirstName = giftCart.ShippingFirstName;
            this.ShippingLastName = giftCart.ShippingLastName;
            this.ShippingAddress1 = giftCart.ShippingAddress1;
            this.ShippingCity = giftCart.ShippingCity;
            this.ShippingState = giftCart.ShippingState;
            this.ShippingPostalCode = giftCart.ShippingPostalCode;
            this.ShippingPhone = giftCart.ShippingPhone;
            this.ShippingEmail = giftCart.ShippingEmail;
            this.BillingFirstName = giftCart.BillingFirstName;
            this.BillingLastName = giftCart.BillingLastName;
            this.BillingAddress1 = giftCart.BillingAddress1;
            this.BillingCity = giftCart.BillingCity;
            this.BillingState = giftCart.BillingState;
            this.BillingPostalCode = giftCart.BillingPostalCode;
            this.BillingPhone = giftCart.BillingPhone;
            this.BillingEmail = giftCart.BillingEmail;
            this.ShippingType = giftCart.ShippingType;
            this.ShippingCost = giftCart.ShippingCost.toFixed(2);
            this.Message = giftCart.Message;
            this.SpecialInstructions = giftCart.SpecialInstructions;
            this.OrderTotal = giftCart.OrderTotal.toFixed(2);
            this.CardType = giftCart.CreditCardType;

             this.ConfirmationCode = (Math.floor(Math.random() * 99999) + 1) + "-" + (Math.floor(Math.random() * 99999) + 1);  

             if (this.ShippingType == 1) {
                 this.ShippingTypeString = "Pick up at Beardslee";
             } else if (this.ShippingType == 2) {
                 this.ShippingTypeString = "USPS Parcel Post";
             } else if (this.ShippingType == 3) {
                 this.ShippingTypeString = "USPS 2-3 Day Priority Mail";
             }
                        
        });



    }


}