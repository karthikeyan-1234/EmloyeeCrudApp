import { Component } from '@angular/core';
import { ListProductCategoriesComponent } from "../list-product-categories/list-product-categories.component";
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../../product/add-product/add-product.component';
import { MatButtonModule } from '@angular/material/button';
import { AddCategoryComponent } from '../add-category/add-category.component';


@Component({
  selector: 'app-category-main',
  standalone: true,
  imports: [ListProductCategoriesComponent,MatButtonModule],
  templateUrl: './category-main.component.html',
  styleUrl: './category-main.component.css'
})
export class CategoryMainComponent {

  constructor(private dialog:MatDialog) { }

  openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(AddCategoryComponent, {
        width: '350px',
        height: '400px',
        enterAnimationDuration,
        exitAnimationDuration,
      }).afterClosed().subscribe(() => {
        console.log('The dialog was closed');
      });
    }

}
