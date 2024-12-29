import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, of } from 'rxjs';
import { ProductCategory } from '../models/product-category';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products:Product[] = [];
  productCategories: ProductCategory[] = [];

  constructor(private http: HttpClient) { 

    this.products = [];

  }

  addProduct(newProduct:Product):Observable<Product | undefined>
  {
    const apiUrl = `${environment.masterUrl}/AddProduct`;
    return this.http.post<Product>(apiUrl,newProduct);
  }

  updateProduct(updatedProduct:Product):Observable<Product | undefined>{
    const apiUrl = `${environment.masterUrl}/updateProduct`;
    return this.http.put<Product>(apiUrl,updatedProduct);
  }

  deleteProduct(productId:number):Observable<Product>{
    const apiUrl = `${environment.masterUrl}/deleteProduct/${productId}`;
    return this.http.delete<Product>(apiUrl);
  }

  // getAllProducts():Observable<Product[]>{
  //   return of(this.products);
  // }

  getAllProducts():Observable<Product[]>{
    const apiUrl = `${environment.masterUrl}/getAllProducts`;
    return this.http.get<Product[]>(apiUrl);
  }

  addProductCategory(newCategory:ProductCategory):Observable<ProductCategory> {
    const apiUrl = `${environment.masterUrl}/addProductType`; 
    return this.http.post<ProductCategory>(apiUrl,newCategory);
  }

  deleteProductCategory(newCategory:ProductCategory):Observable<any>{
    const apiUrl = `${environment.masterUrl}/deleteProductType/${newCategory.id}`;
    return this.http.delete(apiUrl);
  }

  updateProductCategory(newCategory:ProductCategory):Observable<any>{
    const apiUrl = `${environment.masterUrl}/UpdateProductType`;
    return this.http.put(apiUrl,newCategory);
  }  

  getAllCategories():Observable<ProductCategory[]>{
    const apiUrl = `${environment.masterUrl}/getAllProductTypes`; 
    return this.http.get<ProductCategory[]>(apiUrl);
  }

  getAllFreshnessStates():Observable<string[]>{
    return of(['Fresh','ReFurbished','Second Hard']);
  }

}
