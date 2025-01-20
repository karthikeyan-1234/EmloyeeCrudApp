import { Component, EventEmitter, Output, output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
import Swal from 'sweetalert2';

import { PurchaseService } from '../../services/purchase.service';
import { AddPurchaseComponent } from '../add-purchase/add-purchase.component';
import { PurchaseInfo } from '../../models/purchase-info';
import { Customer } from '../../models/customer';
import { Purchase } from '../../models/purchase';
import { CustomerService } from '../../services/customer.service';
import { CommunicationService } from '../../services/communication.service';
import { MessageType } from '../../enums/message-type.enum';





@Component({
  selector: 'app-list-purchases',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, FormsModule, MatSelectModule,MatSidenavModule,
      MatIconModule, MatButtonModule, MatInputModule, HttpClientModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './list-purchases.component.html',
  styleUrl: './list-purchases.component.css'
})
export class ListPurchasesComponent {
  customers: Customer[] = [];
  purchaseInfo: PurchaseInfo[] = [];
  dataSource: MatTableDataSource<PurchaseInfo>;
  editedId: number = 0;
  displayedColumns = ['id', 'vendorName', 'purchaseDate', 'actions'];
  open: boolean = true;
  @Output() purchaseSelected = new EventEmitter<any>();

  constructor(private purchaseService: PurchaseService,private customerService: CustomerService, 
    private commService: CommunicationService, private dialog:MatDialog) { 

      this.customerService.getAllCustomers().subscribe((customers)=> {
        this.customers = customers;
      })

      this.purchaseService.getAllPurchasesInfo().subscribe((purchaseInfo) => {
        console.log(purchaseInfo);
          this.purchaseInfo = purchaseInfo;
  
          this.purchaseInfo.forEach((info) => {
            const datex = new Date(info.purchaseDate);
            info.purchaseDate = datex;
          })
  
        }, err => {
      })

      this.dataSource = new MatTableDataSource(this.purchaseInfo);
  
      this.commService.currentMessage.subscribe((message) => {
        if(message.type === MessageType.Added || message.type === MessageType.Updated || 
          message.type === MessageType.Deleted || message.type === MessageType.Refresh){
          console.log("Refreshing table...");
          this.refreshTable();
        }
      })

  }

  refreshTable() {
    this.purchaseService.getAllPurchasesInfo().subscribe(res => {
      this.purchaseInfo = res;

      this.purchaseInfo.forEach((info) => {
        const date = new Date(info.purchaseDate);
        info.purchaseDate = date;
      })

      this.dataSource = new MatTableDataSource(this.purchaseInfo);
  }, err => {
  })
  }

  cancelEdit() {
    this.editedId = -1;
  }
  updatePurchase(purchase: Purchase) {
    this.purchaseService.updatePurchase(purchase).subscribe((res)=>{
      Swal.fire({icon: 'success',text: 'Purchase updated..!!'});
      this.editedId = -1;
      this.refreshTable();
    },(err) => {
      Swal.fire({icon: 'warning',text: err.message})
    })
  }
  
  deletePurchase(purchase: PurchaseInfo) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this Purchase?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePurchaseConfirmed(purchase);
      }
    })

  }


  deletePurchaseConfirmed(purchase: PurchaseInfo) {
    this.purchaseService.deletePurchase(purchase).subscribe(res => {
      Swal.fire("Purchase Deleted..!!").then((res)=>{
        this.refreshTable();
      },(err) =>{
        Swal.fire("Unable to delete..!!","","error");
      })
     })
    }
  
  editPurchase(purchase: PurchaseInfo) {
    this.editedId = purchase.id;
  }

  showPurchaseItems(purchase: PurchaseInfo){
    console.log("Showing purchase info for ");console.log(purchase);
    this.purchaseSelected.emit(purchase);
  }

openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(AddPurchaseComponent, {
        width: '450px',
        height: '400px',
        enterAnimationDuration,
        exitAnimationDuration,
      }).afterClosed().subscribe(() => {
        console.log('The dialog was closed');
      });
    }    


}
