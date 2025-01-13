import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Sale } from '../models/sale';
import { SaleDetail } from '../models/sale-detail';
import { SaleDetailInfo } from '../models/sale-detail-info';
import { Product } from '../models/product';
import { ProductCategory } from '../models/product-category';
import { SaleInfo } from '../models/sale-info';


@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }

  getAllSalesInfo():Observable<SaleInfo[]>{
    const apiUrl = `${environment.bffUrl}/SaleReport/GetAllSales`;
    return this.http.get<SaleInfo[]>(apiUrl);
  }

  addNewSale(newSale: Sale):Observable<Sale>{
    const apiUrl = `${environment.salesUrl}/AddSaleAsync`
    return this.http.post<Sale>(apiUrl,newSale)
  }

  updateSale(sale: Sale):Observable<Sale>{
    const apiUrl = `${environment.salesUrl}/UpdateSaleAsync`;
    return this.http.put<Sale>(apiUrl, sale);
  }
}
