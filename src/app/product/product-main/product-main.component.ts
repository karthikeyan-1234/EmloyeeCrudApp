import { Component } from '@angular/core';
import { ListProductsComponent } from "../list-products/list-products.component";
import { AddProductComponent } from "../add-product/add-product.component";
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-main',
  standalone: true,
  imports: [ListProductsComponent,MatButtonModule],
  templateUrl: './product-main.component.html',
  styleUrl: './product-main.component.css'
})
export class ProductMainComponent {

  constructor(private dialog:MatDialog) { }

  openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddProductComponent, {
      width: '350px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

}
