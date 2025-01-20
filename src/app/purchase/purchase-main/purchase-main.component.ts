import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListPurchasesComponent } from '../list-purchases/list-purchases.component';
import { MatDialog } from '@angular/material/dialog';
import { AddPurchaseComponent } from '../add-purchase/add-purchase.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ListPurchaseItemsComponent } from '../list-purchase-items/list-purchase-items.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Sale } from '../../models/sale';
import { SaleInfo } from '../../models/sale-info';
import { PurchaseInfo } from '../../models/purchase-info';
import { Purchase } from '../../models/purchase';

@Component({
  selector: 'app-purchase-main',
  standalone: true,
  imports: [CommonModule, ListPurchasesComponent, MatButtonModule, MatSidenavModule, ListPurchaseItemsComponent,MatIconModule],
  templateUrl: './purchase-main.component.html',
  styleUrl: './purchase-main.component.css'
})
export class PurchaseMainComponent {
showFiller = true;
  isSideNavOpen = false;
  selectedPurchase!: PurchaseInfo;

  constructor(private dialog:MatDialog) { }

  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
  }

  openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(AddPurchaseComponent, {
        width: '450px',
        height: '400px',
        enterAnimationDuration,
        exitAnimationDuration,
      }).afterClosed().subscribe(() => {
        console.log('The dialog was closed');
      });
    }

  handlePurchaseSelected(purchase: PurchaseInfo){
    this.selectedPurchase = purchase;
    this.toggleSideNav() ;
  }

  cancel(){
    this.isSideNavOpen = false;
    this.selectedPurchase = null as unknown as PurchaseInfo;
  }
}
