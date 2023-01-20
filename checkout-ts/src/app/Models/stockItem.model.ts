import { StockItemDiscount } from "./stockItemDiscount.model";

export class StockItem {
    SKU!: string;
    standardPrice!: number;
    discounts: StockItemDiscount[] = [];
}