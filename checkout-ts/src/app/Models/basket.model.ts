import { StockItem } from "./stockItem.model";

export class BasketItem {
    SKU!: string;
    count!: number;
}

export class Basket {
    basketItemsForDisplay: BasketItem[] = [];
    total: number = 0;
}