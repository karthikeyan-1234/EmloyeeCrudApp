import { Component } from '@angular/core';
import { MatTableDataSource,MatTable, MatTableModule } from '@angular/material/table';
import { Customer } from '../../../models/customer';
import { CustomerService } from '../../../services/customer.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { CommunicationService } from '../../../services/communication.service';
import { MessageType } from '../../../enums/message-type.enum';


@Component({
  selector: 'app-list-customers',
  standalone: true,
  imports: [CommonModule, MatTableModule,MatFormFieldModule,FormsModule,
      MatIconModule,MatButtonModule, MatInputModule,HttpClientModule,SweetAlert2Module],
  templateUrl: './list-customers.component.html',
  styleUrl: './list-customers.component.css'
})
export class ListCustomersComponent {

  customers : Customer[] = [];
  dataSource : MatTableDataSource<Customer> | undefined;
  displayedColumns: string[] = ["id","name","actions"];
  editedId: number = 0;

  constructor(private service:CustomerService,private commService:CommunicationService){
    this.refreshTable();

    this.commService.currentMessage.subscribe((message) => {
            if(message.type === MessageType.Added || message.type === MessageType.Updated || 
              message.type === MessageType.Deleted || message.type === MessageType.Refresh){
              console.log("Refreshing table...");
              this.refreshTable();
            }
          })
  }

  refreshTable(){
    this.service.getAllCustomers().subscribe((res) => {
      console.log(res);
      this.customers = res;
      this.dataSource = new MatTableDataSource(this.customers);
      this.editedId= 0;
    });
  }

  editCustomer(customer:Customer){
    this.editedId = customer.id;
  }
  deleteCustomer(customer:Customer){
    this.service.deleteCustomer(customer).subscribe((res) => {
      Swal.fire("Customer deleted successfully..!!","","info");
      this.refreshTable();
    },(err)=>{
      console.log(err);
      Swal.fire("Unable to delete","","error")
    })
  }

  updateCustomer(customer:Customer){
    this.service.saveCustomer(customer).subscribe((res) => {
      this.refreshTable();
      Swal.fire('Customer Updated Successfully');
    },(err) => {

    })
  }
  cancelEdit(){
    this.editedId = 0;
  }

}
