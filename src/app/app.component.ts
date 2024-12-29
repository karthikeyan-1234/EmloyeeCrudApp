  import { Component, ViewChild } from '@angular/core';
  import { RouterOutlet, RouterModule } from '@angular/router';
  import { MatToolbar } from '@angular/material/toolbar';
  import { MatIconModule } from '@angular/material/icon';
  import {MatButtonModule} from '@angular/material/button';
  import {MatTableModule} from '@angular/material/table';
  import { CommonModule } from '@angular/common';


  import {MatDialog} from '@angular/material/dialog';
  import { AddProductComponent } from './product/add-product/add-product.component';
  import { ProductService } from './services/product.service';
  import { Product } from './models/product';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatNavList } from '@angular/material/list';


  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, MatToolbar, MatIconModule, MatButtonModule, 
      MatTableModule, CommonModule, MatSidenavModule, MatNavList, MatListModule,
    RouterModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
  })
  export class AppComponent  {
    title = 'EmloyeeCrudApp';
    products:Product[] = [];
    displayedColumns: string[] = ['name', 'age']

    sideBarOpen = true;

    sideBarToggler() {
      this.sideBarOpen = !this.sideBarOpen;
    }

    isSideNavOpen = true;

  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
  }

    constructor(private dialog:MatDialog,private productService:ProductService){
      this.showAllProducts();
    }



    showAllProducts(){
      this.productService.getAllProducts().subscribe((products)=> {
        console.log("Incoming Products",products);
        this.products = [...products];
        console.log("Product passed to list",this.products);
      })
    }

  }
