import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockService } from './Services/stockService';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [StockService]
})
export class AppRoutingModule { }
