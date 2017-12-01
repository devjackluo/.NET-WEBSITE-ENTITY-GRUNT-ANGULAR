import {Component} from "@angular/core";
import { Router } from "@angular/router";

import { GiftCardService} from "../service/gift-card.service";
import {GiftCardCart} from "../models/giftCardCart.dto";

@Component({
    selector: "gift-card-enter-amount",
    templateUrl: "./app/gift-card/enter-amount/enter-amount.html",
    styleUrls: ["./app/css/gift-cards.component.css"]
})

export class GiftCardEnterAmountComponent {

    Amount: number;
    errorMessage: string = "";


    constructor(private router: Router, private giftCardService: GiftCardService) { }

    continue() {

        this.errorMessage = "";

        if (this.Amount == null) {
            this.errorMessage = "A amount is required.";
            return;
        } else {

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

        
        var giftCardCard = new GiftCardCart();
        giftCardCard.Amount = this.Amount;

        this.giftCardService.addGiftCardCart(giftCardCard)
            .then(giftCardCard => {
                console.log("Added GiftcardCart: " + JSON.stringify(giftCardCard));
                this.giftCardService.giftCardCart = giftCardCard as GiftCardCart;
                this.router.navigate(["/GiftCards/checkout"]);
            });
        

    }
}