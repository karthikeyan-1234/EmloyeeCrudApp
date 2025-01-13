import { Component } from '@angular/core';
import { ListCustomersComponent } from "../list-customers/list-customers.component";
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddCustomerComponent } from '../add-customer/add-customer.component';

@Component({
  selector: 'app-customer-main',
  standalone: true,
  imports: [ListCustomersComponent,MatButtonModule],
  templateUrl: './customer-main.component.html',
  styleUrl: './customer-main.component.css'
})
export class CustomerMainComponent {

    constructor(private dialog:MatDialog) { }
  
    openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(AddCustomerComponent, {
        width: '350px',
        height: '400px',
        enterAnimationDuration,
        exitAnimationDuration,
      }).afterClosed().subscribe(() => {
        console.log('The dialog was closed');
      });
    }

}
