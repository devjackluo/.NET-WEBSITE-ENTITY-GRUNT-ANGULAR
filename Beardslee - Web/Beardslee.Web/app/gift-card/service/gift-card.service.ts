import {Injectable } from "@angular/core";

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


import {GiftCardCart} from "../models/giftCardCart.dto";

@Injectable()
export class GiftCardService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private giftCardUrl = "api/1.0/GiftCard";

    giftCardCart: GiftCardCart = new GiftCardCart();

    constructor(private http: Http) { }

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


    getGiftCart(uniqueIdentifier: string): Promise<GiftCardCart> {
        const url = `${this.giftCardUrl}/${uniqueIdentifier}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as GiftCardCart[])
            .catch(this.handleError);
    }



    addGiftCardCart(giftCardCart: GiftCardCart): Promise<GiftCardCart> {
        return this.http.post(this.giftCardUrl + "/create/1", JSON.stringify(giftCardCart), { headers: this.headers })
            .toPromise()
            .then(response => response.json() as GiftCardCart)
            .catch(this.handleError);
    }

    updateGiftCardCartCheckout(giftCardCart: GiftCardCart): Promise<Boolean> {
        return this.http.put(this.giftCardUrl + "/checkout", JSON.stringify(giftCardCart), { headers: this.headers })
            .toPromise()
            .then(response => {
                console.log("response: " + response.status);
                return (response.status == 200);
            })
            .catch(this.handleError);
    }

    updateGiftCardCartPreview(giftCardCart: GiftCardCart): Promise<Boolean> {
        return this.http.put(this.giftCardUrl + "/preview", JSON.stringify(giftCardCart), { headers: this.headers })
            .toPromise()
            .then(response => {
                console.log("response: " + response.status);
                return (response.status == 200);
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
