import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'  
import { ProductInput } from '../../../models/product-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ProductCategory } from '../../../models/product-category';
import { MatSelectModule } from '@angular/material/select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommunicationService } from '../../../services/communication.service';
import { MessageType } from '../../../enums/message-type.enum';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [MatTableModule,FormsModule,CommonModule,MatButtonModule, 
    MatInputModule, MatInput, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, 
    SweetAlert2Module, MatSortModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {

  @Input() products:Product[] = [];
  displayedColumns: string[] = ['name', 'category', 'rate', 'actions'];
  dataSource = new MatTableDataSource<Product>(this.products);
  editedId:number = 0;
  categories: ProductCategory[] = [];

  constructor(private productService:ProductService,private commService:CommunicationService) {
    

    this.productService.getAllCategories().subscribe((res:ProductCategory[]) => {
      console.log(res);
      this.categories = res;
    })

    this.productService.getAllProducts().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res)
    },(err) => {
      
    })

    this.commService.currentMessage.subscribe((message) => {

      console.log("List component subscribed message...",message);

      if(message.type === MessageType.Added || message.type === MessageType.Updated || 
        message.type === MessageType.Deleted || message.type === MessageType.Refresh){
        console.log("Refreshing table...");
        this.refreshTable();
      }
    })

  }

  ngOnInit(){
    this.refreshTable();
  }

  compareCategories(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  //refresh table
  refreshTable(){
    this.productService.getAllProducts().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res)
    },(err) => {
      
    })
  }

  //editProduct
  editProduct(product:Product){
    console.log("Editing...")
    console.log(product);
    console.log('Editing category:', product.productTypeId);
    console.log('Available categories:', this.categories);
    this.editedId = product.id;
    console.log("Edited id now is...",this.editedId);
  }

  //deleteProduct
  deleteProduct(product:Product){

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete ' + product.name + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if(result.value){
        this.productService.deleteProduct(product.id).subscribe((res) => {
          this.refreshTable();
          Swal.fire({title: 'Product Deleted',icon: 'success'});
        },(err) => {  
          console.log("Error while deleting product...",err);
        })      }
    })


  }

  //updateProduct
  updateProduct(product:Product){
    console.log("Updated value...",product);
    this.productService.updateProduct(product).subscribe((res) => {
      this.editedId = 0;
      this.refreshTable();
      Swal.fire({title: 'Product Updated',icon: 'success'});
    },(err) => {
      console.log("Error while updating product...",err);
    })
  }

  //cancelEdit
  cancelEdit(){
    this.editedId = 0;
  }

}
