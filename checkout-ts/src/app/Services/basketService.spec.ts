import { inject, TestBed } from '@angular/core/testing';
import { StockItem } from '../Models/stockItem.model';
import { BasketService } from './basketService';
import { StockService } from './stockService';


describe('BasketService', () => {

    let basketService: BasketService;
    let stockService: StockService
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BasketService,
                StockService
            ]
        });

        basketService = TestBed.inject(BasketService);
        stockService = TestBed.inject(StockService);

        stockService.upsertStockItem('a',.5);
        stockService.upsertDiscountToStockItem('a',3,1.3);
        stockService.upsertStockItem('b',.3);
        stockService.upsertDiscountToStockItem('b',2,.45);
        stockService.upsertStockItem('c',.2);
        stockService.upsertStockItem('d',.15);
        
    });

    it('should be created', inject([BasketService], () => {
        expect(basketService).toBeTruthy();
    }));

    it('total of empty basket is 0', inject([BasketService], () => {
        expect(basketService.getTotalPriceForBasket()).toEqual(0);
    }));

    it('total of basket by count and SKU by standardPrice', inject([BasketService], () => {
        expect(basketService.getTotalPriceForBasket()).toEqual(0);
        
        basketService.addStockItemToBasket('a',2);
        expect(basketService.getTotalPriceForBasket()).toEqual(1);// price of 0.5 * 2

        basketService.emptyBasket();
        expect(basketService.getTotalPriceForBasket()).toEqual(0);
    }));

    it('total of basket two SKUs, one discounted', inject([BasketService], () => {
        expect(basketService.getTotalPriceForBasket()).toEqual(0);
        
        basketService.addStockItemToBasket('a',1);
        basketService.addStockItemToBasket('b',1);
        basketService.addStockItemToBasket('a',4);
        expect(basketService.getBasketForDisplay().basketItemsForDisplay.length).toEqual(3);
        expect(basketService.getTotalPriceForBasket()).toEqual(2.6);
        // discount of 1.3 for 3 + price of 0.5 * 2

        basketService.emptyBasket();
        expect(basketService.getTotalPriceForBasket()).toEqual(0);
    }));
});
