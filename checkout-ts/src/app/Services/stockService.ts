import { Injectable } from "@angular/core";
import { StockItem } from "../Models/stockItem.model";
import { StockItemDiscount } from "../Models/stockItemDiscount.model";

@Injectable()
export class StockService {

    checkoutItems: StockItem[] = [];

    upsertStockItem(SKU: string, standardPrice: number) {
        let stockItem:StockItem = this.getItemFromSKU(SKU);
        
        if(stockItem.SKU == "") {
            stockItem.SKU = SKU;
            this.checkoutItems.push(stockItem);
        }
        stockItem.standardPrice = standardPrice
    }

    upsertDiscountToStockItem(SKU: string, count: number, discountedPrice: number) {
        let stockItem:StockItem = this.getItemFromSKU(SKU);
        
        if(stockItem.SKU !== "") {
            let newDiscount = this.getDiscountPriceFromStockItemByCount(stockItem, count);
            if(newDiscount.count == 0)
            {
                newDiscount.count = count;
                stockItem.discounts.push(newDiscount);
            }
            newDiscount.discountedPrice = discountedPrice;
        }
    }

    getAllItems() {
        return this.checkoutItems;
    }

    getItemFromSKU(SKU: string): StockItem {
        const result = this.checkoutItems.find(item => item.SKU == SKU);
        return result == undefined? new StockItem(): result;
    }

    getDiscountPriceFromStockItemByCount(stockItem: StockItem, count: number):StockItemDiscount {
        const result = stockItem.discounts.find(discountItem => discountItem.count == count);
        return result == undefined? new StockItemDiscount(): result;
    }
}