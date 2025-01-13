import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListSalesComponent } from "../list-sales/list-sales.component";
import { MatDialog } from '@angular/material/dialog';
import { AddSalesComponent } from '../add-sales/add-sales.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { animate, state, style, transition, trigger } from '@angular/animations';




@Component({
  selector: 'app-sales-main',
  standalone: true,
  imports: [CommonModule,ListSalesComponent, MatButtonModule, MatSidenavModule, AddSalesComponent],
  templateUrl: './sales-main.component.html',
  styleUrl: './sales-main.component.css',

})
export class SalesMainComponent {

  showFiller = false;

  constructor(private dialog:MatDialog) { }

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
}
