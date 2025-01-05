import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCategory } from '../../models/product-category';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { CommunicationService } from '../../services/communication.service';
import { MessageType } from '../../enums/message-type.enum';


@Component({
  selector: 'app-list-product-categories',
  standalone: true,
  imports: [CommonModule, MatTableModule,MatFormFieldModule,FormsModule,
    MatIconModule,MatButtonModule, MatInputModule],
  templateUrl: './list-product-categories.component.html',
  styleUrl: './list-product-categories.component.css'
})
export class ListProductCategoriesComponent {
  
  categories: ProductCategory[] = [];
  dataSource: MatTableDataSource<ProductCategory>;
  editedId: number = 0;
  displayedColumns = ['id', 'name', 'actions'];

  constructor(private productService: ProductService, private commService: CommunicationService) {
      this.productService.getAllCategories().subscribe((categories) => {
          this.categories = categories;
      });

      this.dataSource = new MatTableDataSource(this.categories);

          this.commService.currentMessage.subscribe((message) => {
      
            console.log("List component subscribed message...",message);
      
            if(message.type === MessageType.Added || message.type === MessageType.Updated || 
              message.type === MessageType.Deleted || message.type === MessageType.Refresh){
              console.log("Refreshing table...");
              this.refreshTable();
            }
          })
      
  }

  refreshTable() {
      this.productService.getAllCategories().subscribe((categories) => {
          this.categories = categories;
          this.dataSource = new MatTableDataSource(this.categories);
      });
  }


  editCategory(category: ProductCategory) {
      this.editedId = category.id;
  }

  saveCategory(category: ProductCategory) {

  }

  deleteCategory(id: number) {

  }

  updatedCategory(category: ProductCategory) {
      this.editedId = 0;
  }

  cancelEdit() {
      this.editedId = 0;
  }

}
