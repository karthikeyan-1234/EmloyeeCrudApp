import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../services/product.service';
import { ProductCategory } from '../../models/product-category';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule  } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
//import { MatRadioGroup,MatRadioButton,MatRadioModule } from '@angular/material/radio';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { CommunicationService } from '../../services/communication.service';
import { Product } from '../../models/product';
import { MessageType } from '../../enums/message-type.enum';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { Sale } from '../../models/sale';
import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'app-add-sales',
  standalone: true,
  imports: [CommonModule,MatIconModule, MatDatepickerModule, 
    MatDialogModule, MatButtonModule, MatFormFieldModule,MatInputModule,
    MatSelectModule, //MatRadioModule, MatRadioButton, 
    ReactiveFormsModule, FormsModule, SweetAlert2Module],
  templateUrl: './add-sales.component.html',
  styleUrl: './add-sales.component.css'
})
export class AddSalesComponent {
  categories: ProductCategory[] = [];

  newSaleForm!: FormGroup;
  customerId: any;
  customers: Customer[] = [];
  newSale: Sale = {
    id: 0,
    customerId: 0,
    saleDate: new Date()
  }

  constructor(private saleService:SaleService,private formBuilder:FormBuilder,
    private commService:CommunicationService,private customerService: CustomerService
  ){}

  ngOnInit(): void {


    this.customerService.getAllCustomers().subscribe(res => {
      this.customers = res;
      console.log(this.customers);
    })

    this.newSaleForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      saleDate: ['',Validators.required],
    })

  }

  formSubmitted(){
    this.newSale.customerId = this.newSaleForm.value.customerId;
    this.newSale.saleDate = this.newSaleForm.value.saleDate;

    this.saleService.addNewSale(this.newSale).subscribe((res) => {
      Swal.fire({icon: 'success',text:'Sale Added Successfully'});
      this.commService.changeMessage({type: MessageType.Added, payload: 'Sale Added'});
    },(err) => {
        Swal.fire({icon: 'warning',text: err.message})
    })
  }
}
