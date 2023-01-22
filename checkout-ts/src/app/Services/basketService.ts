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
            this.basket.basketItemsForDisplay.push(basketItem);
            this.basket.total = this.getTotalPriceForBasket();
        }
    }

    removeStockItemFromBasket(index:number) {
        this.basket.basketItemsForDisplay.splice(index,1);        
        this.basket.total = this.getTotalPriceForBasket();
    }

    getBasketForDisplay(): Basket {
        return this.basket;
    }

    getTotalPriceForBasket() {
        let totalPrice = 0;
        this.stockService.getAllItems().forEach(stockItem =>{
            let remainingStockItemCountBySKU = this.basket.basketItemsForDisplay.filter(item => item.SKU == stockItem.SKU).map(o => o.count).reduce((partialSum, a) => partialSum + a, 0);// 5

            let highestCurrentDiscountForStockItemCount = this.stockService.getLargestDiscountItemByCount(stockItem, remainingStockItemCountBySKU);
            
            while(remainingStockItemCountBySKU >= highestCurrentDiscountForStockItemCount.count && highestCurrentDiscountForStockItemCount.discountedPrice != 0) {

                totalPrice += highestCurrentDiscountForStockItemCount.discountedPrice;
                                
                remainingStockItemCountBySKU = remainingStockItemCountBySKU - highestCurrentDiscountForStockItemCount.count;

                highestCurrentDiscountForStockItemCount = this.stockService.getLargestDiscountItemByCount(stockItem, remainingStockItemCountBySKU);
            }

            totalPrice += remainingStockItemCountBySKU * stockItem.standardPrice;
        });

        return parseFloat(totalPrice.toFixed(2));
    }

    emptyBasket() {
        this.basket = new Basket();
    }
}