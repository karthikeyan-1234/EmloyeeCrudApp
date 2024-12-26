  import { Component } from '@angular/core';
  import { RouterOutlet } from '@angular/router';
  import { MatToolbar } from '@angular/material/toolbar';
  import { MatIconModule } from '@angular/material/icon';
  import {MatButtonModule} from '@angular/material/button';
  import {MatTableModule} from '@angular/material/table';
  import { CommonModule } from '@angular/common';
  import { ChangeDetectorRef } from '@angular/core'; // Import ChangeDetectorRef


  import {
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
  } from '@angular/material/dialog';
  import { AddProductComponent } from './components/add-product/add-product.component';
  import { ProductService } from './services/product.service';
  import { Product } from './models/product';
  import { ListProductsComponent } from "./components/list-products/list-products.component";


  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, MatToolbar, MatIconModule, MatButtonModule, MatTableModule, CommonModule, ListProductsComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
  })
  export class AppComponent {
    title = 'EmloyeeCrudApp';
    products:Product[] = [];
    displayedColumns: string[] = ['name', 'age']

    constructor(private dialog:MatDialog,private productService:ProductService){
      this.showAllProducts();
    }

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

    showAllProducts(){
      this.productService.getAllProducts().subscribe((products)=> {
        console.log("Incoming Products",products);
        this.products = [...products];
        console.log("Product passed to list",this.products);
      })
    }

  }
