import { Injectable } from "@angular/core";
import { CheckoutItem } from "../Models/checkoutItem.model";

@Injectable()
export class CheckoutService {

    getItemFromSKU(checkoutItems: CheckoutItem[], SKU: string) {
        return checkoutItems.find(item => item.SKU == SKU);
    }
    
}