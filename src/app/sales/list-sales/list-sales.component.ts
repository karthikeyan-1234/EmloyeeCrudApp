import { Component, EventEmitter, Output, output } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { SaleInfo } from '../../models/sale-info';
import { CommunicationService } from '../../services/communication.service';
import { MessageType } from '../../enums/message-type.enum';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatSidenavModule } from '@angular/material/sidenav'; 

import { HttpClientModule } from '@angular/common/http';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { Sale } from '../../models/sale';
import Swal from 'sweetalert2';
import { AddSalesComponent } from '../add-sales/add-sales.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-list-sales',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, FormsModule, MatSelectModule,MatSidenavModule,
    MatIconModule, MatButtonModule, MatInputModule, HttpClientModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './list-sales.component.html',
  styleUrl: './list-sales.component.css'
})
export class ListSalesComponent {

  salesInfo: SaleInfo[] = [];
  customers: Customer[] = [];
  dataSource: MatTableDataSource<SaleInfo>;
  editedId: number = 0;
  displayedColumns = ['id', 'customerName', 'saleDate', 'actions'];
  open: boolean = true;
  @Output() saleSelected = new EventEmitter<any>();

  constructor(private saleService: SaleService,private customerService: CustomerService, 
    private commService: CommunicationService, private dialog:MatDialog){

    this.customerService.getAllCustomers().subscribe((customers)=> {
      this.customers = customers;
    })

    this.saleService.getAllSalesInfo().subscribe((salesInfo) => {
      console.log(salesInfo);
        this.salesInfo = salesInfo;

        this.salesInfo.forEach((info) => {
          const datex = new Date(info.saleDate);
          info.saleDate = datex;
        })

      }, err => {
    })

    this.dataSource = new MatTableDataSource(this.salesInfo);

    this.commService.currentMessage.subscribe((message) => {
      if(message.type === MessageType.Added || message.type === MessageType.Updated || 
        message.type === MessageType.Deleted || message.type === MessageType.Refresh){
        console.log("Refreshing table...");
        this.refreshTable();
      }
    })
  }

  refreshTable() {
      this.saleService.getAllSalesInfo().subscribe(res => {
        this.salesInfo = res;

        this.salesInfo.forEach((info) => {
          const date = new Date(info.saleDate);
          info.saleDate = date;
        })

        this.dataSource = new MatTableDataSource(this.salesInfo);
    }, err => {
    })
  }

  cancelEdit() {
    this.editedId = -1;
  }
  updateSale(sale: Sale) {
    this.saleService.updateSale(sale).subscribe((res)=>{
      Swal.fire({icon: 'success',text: 'Sale updated..!!'});
      this.editedId = -1;
      this.refreshTable();
    },(err) => {
      Swal.fire({icon: 'warning',text: err.message})
    })
  }
  
  deleteSale(sale: SaleInfo) {
   this.saleService.deleteSale(sale).subscribe(res => {
    Swal.fire("Sale Deleted..!!").then((res)=>{
      this.refreshTable();
    },(err) =>{
      Swal.fire("Unable to delete..!!","","error");
    })
   })
  }
  
  editSale(sale: SaleInfo) {
    this.editedId = sale.id;
  }

  showSaleItems(sale: SaleInfo){
    console.log("Showing sale info for ");console.log(sale);
    this.saleSelected.emit(sale);
  }

openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(AddSalesComponent, {
        width: '450px',
        height: '400px',
        enterAnimationDuration,
        exitAnimationDuration,
      }).afterClosed().subscribe(() => {
        console.log('The dialog was closed');
      });
    }  
}
