import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Basket, BasketItem } from './Models/basket.model';
import { BasketService } from './Services/basketService';
import { StockService } from './Services/stockService';

describe('AppComponent', () => {

  let stockService: StockService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers:[
        AppComponent,
      { provide: StockService, useClass: StockService }
      ]
    }).compileComponents();


    stockService = TestBed.inject(StockService);
    
    stockService.upsertStockItem('a',.5);
    stockService.upsertStockItem('b',.3);

  });

  it('app exists', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('checkoutItems exist at correct size', () => {
    expect(stockService.getAllItems().length).toEqual(2);
  })
});
