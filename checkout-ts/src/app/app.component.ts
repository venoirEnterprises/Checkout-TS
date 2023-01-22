import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Basket } from './Models/basket.model';
import { StockItem } from './Models/stockItem.model';
import { BasketService } from './Services/basketService';
import { StockService } from './Services/stockService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  basketForDisplay: Basket = new Basket();
  stockItems: StockItem[] = [];


  constructor(
      private basketService: BasketService,
      private stockService: StockService,
      private router: Router
  ){}
  
  ngOnInit(): void {
    

    this.stockService.upsertStockItem('a',.5);
    this.stockService.upsertDiscountToStockItem('a',3,1.3);
    this.stockService.upsertStockItem('b',.3);
    this.stockService.upsertDiscountToStockItem('b',2,.45);
    this.stockService.upsertStockItem('c',.2);
    this.stockService.upsertStockItem('d',.15);
    this.getBasket();

    this.stockItems = this.stockService.getAllItems();
  }

  getBasket() {
    this.basketForDisplay = this.basketService.getBasketForDisplay();
  }

  addToBasket(SKU: string) {
    this.basketService.addStockItemToBasket(SKU, 1);
  }

  updateAmountForBasketItem(index:number, newAmount: number) {
    this.basketService.updateAmountForBasketItem(index,newAmount);
    this.basketService.getTotalPriceForBasket();
    this.getBasket();
  }

  removeFromBasket(index:number) {
    this.basketService.removeStockItemFromBasket(index);
  }

  emptyBasket() {
    this.basketService.emptyBasket();
    this.getBasket();
  }
  
}
