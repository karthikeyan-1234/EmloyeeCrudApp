import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListSalesComponent } from "../list-sales/list-sales.component";
import { MatDialog } from '@angular/material/dialog';
import { AddSalesComponent } from '../add-sales/add-sales.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ListSaleItemsComponent } from "../list-sale-items/list-sale-items.component";
import { MatIconModule } from '@angular/material/icon';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Sale } from '../../models/sale';
import { SaleInfo } from '../../models/sale-info';




@Component({
  selector: 'app-sales-main',
  standalone: true,
  imports: [CommonModule, ListSalesComponent, MatButtonModule, MatSidenavModule, ListSaleItemsComponent,MatIconModule],
  templateUrl: './sales-main.component.html',
  styleUrl: './sales-main.component.css',

})
export class SalesMainComponent {

  showFiller = true;
  isSideNavOpen = false;
  selectedSale!: SaleInfo;

  constructor(private dialog:MatDialog) { }

  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
  }

  openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(AddSalesComponent, {
        width: '450px',
        height: '400px',
        enterAnimationDuration,
        exitAnimationDuration,
      }).afterClosed().subscribe(() => {
        console.log('The dialog was closed');
      });
    }

  handleSaleSelected(sale: SaleInfo){
    this.selectedSale = sale;
    this.toggleSideNav() ;
  }

  cancel(){
    this.isSideNavOpen = false;
    this.selectedSale = null as unknown as SaleInfo;
  }

}
