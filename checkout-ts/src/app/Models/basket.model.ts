import { StockItem } from "./stockItem.model";

export class BasketItem {
    SKU!: string;
    count!: number;
}

export class Basket {
    items: BasketItem[] = [];
}