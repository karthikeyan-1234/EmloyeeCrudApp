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

  constructor() { 

    this.products = [
      {
        name: 'Laptop',
        category: this.productCategories[1],
        rate: 899.99,
        id: 1
      },
      {
        name: 'Smartphone',
        category: this.productCategories[1],
        rate: 599.99,
        id: 2
      },
      {
        name: 'Headphones',
        category: this.productCategories[1],
        rate: 149.99,
        id: 3
      },
      {
        name: 'T-Shirt',
        category: this.productCategories[2],
        rate: 24.99,
        id: 4
      },
      {
        name: 'Jeans',
        category: this.productCategories[2],
        rate: 49.99,
        id: 5
      },
      {
        name: 'Running Shoes',
        category: this.productCategories[2],
        rate: 99.99,
        id: 6
      },
      {
        name: 'Running socks',
        category: this.productCategories[3],
        rate: 59.99,
        id: 7
      },
      {
        name: 'Weight Training Shoes',
        category: this.productCategories[2],
        rate: 48.99,
        id: 8
      },
      {
        name: 'Wrist Bands',
        category: this.productCategories[4],
        rate: 29.99,
        id: 9
      },
      {
        name: 'Skate rollers',
        category: this.productCategories[3],
        rate: 29.99,
        id: 10
      },
      {
        name: 'Shorts',
        category: this.productCategories[4],
        rate: 29.99,
        id: 11
      },
      {
        name: 'TShirts',
        category: this.productCategories[2],
        rate: 29.99,
        id: 12
      }



    ];

  }

  addProduct(newProduct:Product):Observable<Product | undefined>
  {
    console.log("adding product..",newProduct);
    newProduct.id = this.products.length + 1;
    this.products.push(newProduct);
    this.products= [...this.products];
    return of(newProduct);
  }

  updateProduct(updatedProduct:Product):Observable<Product | undefined>{
    let product = this.products.find(p => p.id === updatedProduct.id);
    if(product){
      product.name = updatedProduct.name;
      product.category = updatedProduct.category;
      product.rate = updatedProduct.rate;
    }
    console.log("Updated product list...",this.products);
    return of(product);
  }

  deleteProduct(productId:number):Observable<boolean>{
    let index = this.products.findIndex(p => p.id === productId);
    if(index !== -1){
      this.products.splice(index,1);
      this.products = [...this.products];
      return of(true);
    }
    return of(false);
  }

  getAllProducts():Observable<Product[]>{
    return of(this.products);
  }

  addProductCategory(newCategory:ProductCategory):Observable<ProductCategory> {
    newCategory.id = this.productCategories.length + 1;
    this.productCategories.push(newCategory);
    this.productCategories = [...this.productCategories];
    return of(newCategory);
  }

  getAllCategories():Observable<ProductCategory[]>{
    return of(this.productCategories);
  }

  getAllFreshnessStates():Observable<string[]>{
    return of(['Fresh','ReFurbished','Second Hard']);
  }

}
