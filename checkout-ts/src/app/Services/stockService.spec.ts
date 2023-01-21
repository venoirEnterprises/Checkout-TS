import { inject, TestBed } from '@angular/core/testing';
import { StockItem } from '../Models/stockItem.model';
import { StockService } from './stockService';


describe('StockService', () => {

    let stockService: StockService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                StockService
            ]
        });

        stockService = TestBed.inject(StockService);
        stockService.upsertStockItem('a',.5);
        stockService.upsertDiscountToStockItem('a',3,1.3);
        stockService.upsertStockItem('b',.3);
        stockService.upsertDiscountToStockItem('b',2,.45);
        stockService.upsertStockItem('c',.2);
        stockService.upsertStockItem('d',.15);
        
        // Adding to basket as separate service?
    });

    it('should be created', inject([StockService], () => {
        expect(stockService).toBeTruthy();
    }));

    it('should return first checkoutItem by SKU', inject([StockService], () => {
        expect(stockService.getItemFromSKU('a')).toEqual(stockService.getAllItems()[0]);
    }));

    it('should return correct stockItems size', inject([StockService], () => {
        expect(stockService.getAllItems().length).toEqual(4);
    }));

    it('should return empty item on invalid SKU', inject([StockService], () => {
        expect(stockService.getItemFromSKU('invalidSKU')).toEqual(new StockItem());
    }));

    it('upserting item does not change size regardless of calls, returns correct new price', inject([StockService], () => {
        const newPrice = 100;
        stockService.upsertStockItem('a',20);
        stockService.upsertStockItem('a',250);
        stockService.upsertStockItem('a',newPrice);

        expect(stockService.getItemFromSKU('a').standardPrice).toEqual(newPrice);
        expect(stockService.getAllItems().length).toEqual(4);
    }));

    it('should get correct amount of discounts for items', inject([StockService], () =>{
        expect(stockService.getItemFromSKU('a').discounts.length).toEqual(1);
        expect(stockService.getItemFromSKU('b').discounts.length).toEqual(1);
        expect(stockService.getItemFromSKU('c').discounts.length).toEqual(0);
        expect(stockService.getItemFromSKU('invalid').discounts.length).toEqual(0);
    }));

    it('upserting discount for stockItem returns correct discount and size', inject([StockService], () =>{
        stockService.upsertDiscountToStockItem('a',3,1.1)
        expect(stockService.getItemFromSKU('a').discounts.find(discountItem => discountItem.count == 3)?.discountedPrice).toEqual(1.1);
        expect(stockService.getItemFromSKU('a').discounts.length).toEqual(1);
    }));
});
