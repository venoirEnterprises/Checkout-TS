import { Injectable } from "@angular/core";
import { Basket, BasketItem } from "../Models/basket.model";
import { StockService } from "./stockService";

@Injectable()
export class BasketService {

    private basket: Basket = new Basket();

    constructor(
        private stockService: StockService
    ) {
    }

    addStockItemToBasket(SKU: string, count: number) {
        const stockItem = this.stockService.getItemFromSKU(SKU);
        if(stockItem.SKU == SKU) {
            let basketItem = new BasketItem();
            basketItem.SKU = SKU;
            basketItem.count = count;
            this.basket.items.push(basketItem);
        }
    }

    getTotalForBasket() {
        let total = 0;
        this.basket.items.forEach(basketItem => { // Loading price dynamically from checkoutService
            // Group together checkoutItems, then get prices with discounts if they apply
            // Keeping separate checkout items, so they could remove the second group of a if they wanted
            total += this.stockService.getItemFromSKU(basketItem.SKU).standardPrice * basketItem.count            
        });

        return total;
    }

    emptyBasket() {
        this.basket = new Basket();
    }
}