import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllCustomers():Observable<Customer[]>{
    const apiUrl = `${environment.masterUrl}/getAllCustomers`;
    return this.http.get<Customer[]>(apiUrl)
  }

  addCustomer(customer:Customer):Observable<Customer>{
    const apiUrl = `${environment.masterUrl}/addCustomer`;
    return this.http.post<Customer>(apiUrl,customer);
  }

  saveCustomer(customer:Customer):Observable<Customer>{
    const apiUrl = `${environment.masterUrl}/updateCustomer`;
    return this.http.put<Customer>(apiUrl,customer);
  }

  deleteCustomer(customer:Customer):Observable<any>{
    const apiUrl = `${environment.masterUrl}/deleteCustomer/${customer.id}`;
    return this.http.delete(apiUrl);
  }
}
