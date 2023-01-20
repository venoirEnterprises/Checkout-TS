import { inject, TestBed } from '@angular/core/testing';
import { CheckoutItem } from '../Models/checkoutItem.model';
import { CheckoutService } from './checkoutService';


describe('CheckoutService', () => {

    let checkoutItemA:CheckoutItem = new CheckoutItem();
    checkoutItemA.SKU='a';
    checkoutItemA.standardPrice = 50;

    const checkoutItems: CheckoutItem[] = [];
    checkoutItems.push(checkoutItemA);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CheckoutService
            ]
        });
    });

    it('should be created', inject([CheckoutService], (service: CheckoutService) => {
        expect(service).toBeTruthy();
    }));

    it('should return first checkoutItem by SKU', inject([CheckoutService], (service: CheckoutService) => {
        expect(service.getItemFromSKU(checkoutItems, 'a')).toBe(checkoutItems[0]);
    }));

    it('should return empty array on invalid SKU', inject([CheckoutService], (service: CheckoutService) => {
        expect(service.getItemFromSKU(checkoutItems, 'invalidSKU')).toBe(undefined);
    }));
});
