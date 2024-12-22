import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, of } from 'rxjs';
import { ProductCategory } from '../models/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products:Product[] = [];
  productCategories: ProductCategory[] = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Home Goods' },
    { id: 4, name: 'Books' },
    { id: 5, name: 'Food' } 
  ];

  constructor() { }

  addProduct(newProduct:Product)
  {
    this.products.push(newProduct);
    this.products= [...this.products];
  }

  getAllProducts():Observable<Product[]>{
    return of(this.products);
  }

  addProductCategory(newCategory:ProductCategory){
    this.productCategories.push(newCategory);
    this.productCategories = [...this.productCategories];
  }

  getAllCategories():Observable<ProductCategory[]>{
    return of(this.productCategories);
  }

}
