import { Component, OnInit } from '@angular/core';
import { Basket } from './Models/basket.model';
import { BasketService } from './Services/basketService';
import { StockService } from './Services/stockService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  basketForDisplay: Basket = new Basket();


  constructor(
    private basketService: BasketService,
      private stockService: StockService
  ){}
  
  ngOnInit(): void {
    

    this.stockService.upsertStockItem('a',.5);
    this.stockService.upsertDiscountToStockItem('a',3,1.3);
    this.stockService.upsertStockItem('b',.3);
    this.stockService.upsertDiscountToStockItem('b',2,.45);
    this.stockService.upsertStockItem('c',.2);
    this.stockService.upsertStockItem('d',.15);
    this.basketForDisplay = this.basketService.getBasketForDisplay();

    
        
    this.basketService.addStockItemToBasket('a',1);
    this.basketService.addStockItemToBasket('b',1);
    this.basketService.addStockItemToBasket('a',4);
    
  }
  
}
