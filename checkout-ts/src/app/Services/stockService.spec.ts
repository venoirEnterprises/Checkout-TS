import { inject, TestBed } from '@angular/core/testing';
import { StockItem } from '../Models/stockItem.model';
import { StockService } from './stockService';


describe('StockService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                StockService
            ]
        });

        const stockService = TestBed.inject(StockService);
        stockService.addItemToStock('a',.5);
        stockService.addItemToStock('b',.3);
        
        // Adding to basket as separate service?
    });

    it('should be created', inject([StockService], (service: StockService) => {
        expect(service).toBeTruthy();
    }));

    it('should return first checkoutItem by SKU', inject([StockService], (service: StockService) => {
        expect(service.getItemFromSKU('a')).toEqual(service.getAllItems()[0]);
    }));

    it('should return empty item on invalid SKU', inject([StockService], (service: StockService) => {
        expect(service.getItemFromSKU('invalidSKU')).toEqual(new StockItem());
    }));
});
