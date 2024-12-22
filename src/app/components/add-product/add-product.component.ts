import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../services/product.service';
import { ProductCategory } from '../../models/product-category';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule  } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatButtonModule, MatFormFieldModule,MatInputModule,MatSelectModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {

  categories: ProductCategory[] = [];

  constructor(private productService:ProductService){}

  ngOnInit(): void {
    this.productService.getAllCategories().subscribe(res => {
      this.categories = res;
    })
  }
}
