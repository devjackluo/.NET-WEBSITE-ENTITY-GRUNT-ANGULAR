import {Component} from "@angular/core";
import { Router } from "@angular/router";

import { GiftCardService} from "../service/gift-card.service";
import {GiftCardCart} from "../models/giftCardCart.dto";

@Component({
    selector: "gift-card-preview",
    templateUrl: "./app/gift-card/preview/preview.html",
    styleUrls: ["./app/css/gift-cards.component.css"]
})

export class GiftCardPreviewComponent {

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
    CardNumber: number;
    ExpirationMonth: number;
    ExpirationYear: number;


    expirationMonthErrorMessage: string = "";
    expirationYearErrorMessage: string = "";
    cardTypeErrorMessage: string = "";
    cardNumberErrorMessage: string = "";


    HasErrors: boolean = false;


    giftCart: GiftCardCart;

    constructor(private router: Router, private giftCardService: GiftCardService) { }

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

            if (this.ShippingType == 1) {
                console.log("test")
                this.ShippingTypeString = "Pick up at Beardslee";
            } else if (this.ShippingType == 2) {
                this.ShippingTypeString = "USPS Parcel Post";
            } else if (this.ShippingType == 3) {
                this.ShippingTypeString = "USPS 2-3 Day Priority Mail";    
            }

        });



    }


    back() {
        this.router.navigate(["/GiftCards/checkout"]);
    }

    continue() {

        this.clearErrors();

        if (this.CardType == "0" || this.CardType == null) {
            this.cardTypeErrorMessage = "Must select an card type."
            this.HasErrors = true;
        }

        if (this.CardNumber == null || this.CardNumber <= 0) {
            this.cardNumberErrorMessage = "Must enter an card number."
            this.HasErrors = true;
        } else {

            var regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

            if (regex.test(this.CardNumber.toString()) == false) {
                this.cardNumberErrorMessage = "Must enter an valid card number."
                this.HasErrors = true;
            }

        }






        var today = new Date();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        if (this.ExpirationMonth == 0 || this.ExpirationMonth == null) {
            this.expirationMonthErrorMessage = "Must enter an expiration month."
            this.HasErrors = true;
        }

        if (this.ExpirationYear == 0 || this.ExpirationYear == null) {
            this.expirationYearErrorMessage = "Must enter an expiration year."
            this.HasErrors = true;
        }

        if (this.ExpirationMonth < mm && this.ExpirationYear == yyyy ) {
            this.expirationMonthErrorMessage = "Your card has expired."
            this.HasErrors = true;
        }


        if (this.HasErrors == true) {
            return;
        }

        var giftCardCartToUpdate = new GiftCardCart();
        giftCardCartToUpdate.UniqueIdentifier = this.UniqueIdentifier;
        giftCardCartToUpdate.CreditCardType = this.CardType;


        this.giftCardService.updateGiftCardCartPreview(giftCardCartToUpdate)
            .then(isSuccessful => {

                //console.log("updated Successful: " + JSON.stringify(isSuccessful));

                if (isSuccessful) {
                    this.router.navigate(["/GiftCards/receipt"]);
                }
                else {
                    //Display Error
                }
            });
        
    }

    clearErrors() {

        this.HasErrors = false;
        this.cardNumberErrorMessage = "";
        this.cardTypeErrorMessage = "";
        this.expirationMonthErrorMessage = "";
        this.expirationYearErrorMessage = "";

    }



}