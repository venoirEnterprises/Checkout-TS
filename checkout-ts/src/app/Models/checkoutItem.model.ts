import { CheckoutItemDiscount } from "./checkoutItemDiscount.model";

export class CheckoutItem {
    SKU!: string;
    standardPrice!: number;
    discounts: CheckoutItemDiscount[] = [];
}