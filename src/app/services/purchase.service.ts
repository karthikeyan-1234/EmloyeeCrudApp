import { Injectable } from '@angular/core';
import { Purchase } from '../models/purchase';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseInfo } from '../models/purchase-info';
import { PurchaseDetailInfo } from '../models/purchase-detail-info';


@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }  

  getAllPurchasesInfo():Observable<PurchaseInfo[]>{
    const apiUrl = `${environment.bffUrl}/GetAllPurchases`;
    return this.http.get<PurchaseInfo[]>(apiUrl);
  }

  addNewPurchase(newPurchase: Purchase):Observable<Purchase>{
    const apiUrl = `${environment.purchaseUrl}/AddPurchaseAsync`
    return this.http.post<Purchase>(apiUrl,newPurchase)
  }

  updatePurchase(purchase: Purchase):Observable<Purchase>{
    const apiUrl = `${environment.purchaseUrl}/UpdatePurchaseAsync`;
    return this.http.put<Purchase>(apiUrl, purchase);
  }

  deletePurchase(purchase: PurchaseInfo):Observable<any>{
    const apiUrl = `${environment.purchaseUrl}/DeletePurchaseByIdAsync/${purchase.id}`;
    console.log("Trying to call...delete endpoint");
    console.log(apiUrl);
    return this.http.delete(apiUrl);
  }

  getPurchaseDetailInfoItems(purchase: PurchaseInfo):Observable<PurchaseDetailInfo[]>{
    const apiUrl = `${environment.bffUrl}/GetPurchaseReport/${purchase.id}`;
    return this.http.get<PurchaseDetailInfo[]>(apiUrl);
  }

  addPurchaseDetailInfoItem(newItem: PurchaseDetailInfo):Observable<PurchaseDetailInfo>{
    const apiUrl = `${environment.purchaseUrl}/AddPurchaseDetailInfoAsync`;
    return this.http.post<PurchaseDetailInfo>(apiUrl,newItem);
  }

  updatePurchaseDetailInfoItem(item: PurchaseDetailInfo):Observable<PurchaseDetailInfo>{
    const apiUrl = `${environment.purchaseUrl}/UpdatePurchaseDetailAsync`;
    return this.http.put<PurchaseDetailInfo>(apiUrl, item);
  }

  deletePurchaseDetailInfoItem(item: PurchaseDetailInfo):Observable<any>{
    const apiUrl = `${environment.purchaseUrl}/DeletePurchaseDetailInfoByIdAsync/${item.id}`;
    return this.http.delete(apiUrl);
  }

  getPurchaseById(id: number):Observable<Purchase>{
    const apiUrl = `${environment.purchaseUrl}/GetPurchaseById/${id}`;
    return this.http.get<Purchase>(apiUrl);
  }
}
