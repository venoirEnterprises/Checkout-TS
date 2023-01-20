import { Injectable } from "@angular/core";
import { StockItem } from "../Models/stockItem.model";

@Injectable()
export class StockService {

    checkoutItems: StockItem[] = [];

    addItemToStock(SKU: string, standardPrice: number) {
        let checkoutItem:StockItem = new StockItem();
        checkoutItem.SKU = SKU;
        checkoutItem.standardPrice = standardPrice
        
        this.checkoutItems.push(checkoutItem);
    }

    getAllItems() {
        return this.checkoutItems;
    }

    getItemFromSKU(SKU: string): StockItem {
        const result = this.checkoutItems.find(item => item.SKU == SKU);
        return result == undefined? new StockItem(): result;
    }
}