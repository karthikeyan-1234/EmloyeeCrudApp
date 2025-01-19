import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Sale } from '../models/sale';
import { SaleDetailInfo } from '../models/sale-detail-info';
import { Product } from '../models/product';
import { ProductCategory } from '../models/product-category';
import { SaleInfo } from '../models/sale-info';


@Injectable({
  providedIn: 'root'
})
export class SaleService {


  saleInfo: SaleDetailInfo[] = [
    {
      id:1,
      saleId: 1,
      productId: 1,
      price: 1,
      quantity: 1,
      productName: "string"
    }
  ]

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

  deleteSale(sale: Sale):Observable<any>{
    const apiUrl = `${environment.salesUrl}/DeleteSaleByIdAsync/${sale.id}`;
    console.log("Trying to call...delete endpoint");
    console.log(apiUrl);
    return this.http.delete(apiUrl);
  }

  getSaleDetailInfoItems(sale: SaleInfo):Observable<SaleDetailInfo[]>{
    const apiUrl = `${environment.bffUrl}/SaleReport/GetSaleReport/${sale.id}`;
    return this.http.get<SaleDetailInfo[]>(apiUrl);
  }

  addNewSaleDetailInfo(newSaleDetailInfo: SaleDetailInfo):Observable<SaleDetailInfo>
  {
    const apiUrl = `${environment.salesUrl}/AddSaleDetailsAsync`
    return this.http.post<SaleDetailInfo>(apiUrl,newSaleDetailInfo)
  }

  updateSaleDetailInfo(newSaleDetailInfo: SaleDetailInfo):Observable<SaleDetailInfo>{
    const apiUrl = `${environment.salesUrl}/UpdateSaleDetailAsync`;
    return this.http.put<SaleDetailInfo>(apiUrl, newSaleDetailInfo);
  }
}
