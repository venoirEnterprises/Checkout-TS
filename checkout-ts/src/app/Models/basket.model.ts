import { StockItem } from "./stockItem.model";

export class BasketItem {
    checkoutItem!: StockItem;
    count!: number;
}

export class Basket {
    items: BasketItem[] = [];
}