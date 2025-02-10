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
import { Purchase } from '../../models/purchase';
import { SaleService } from '../../services/sale.service';
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'app-add-purchase',
  standalone: true,
  imports: [CommonModule,MatIconModule, MatDatepickerModule, 
    MatDialogModule, MatButtonModule, MatFormFieldModule,MatInputModule,
    MatSelectModule, //MatRadioModule, MatRadioButton, 
    ReactiveFormsModule, FormsModule, SweetAlert2Module],
  templateUrl: './add-purchase.component.html',
  styleUrl: './add-purchase.component.css'
})
export class AddPurchaseComponent {
  categories: ProductCategory[] = [];
  today = new Date();
  newPurchaseForm!: FormGroup;
  customerId: any;
  customers: Customer[] = [];
  newPurchase: Purchase = {
    id: 0,
    vendorId: 0,
    purchaseDate: new Date()
  }

  constructor(private purchaseService:PurchaseService,private formBuilder:FormBuilder,
    private commService:CommunicationService,private customerService: CustomerService
  ){
    this.newPurchaseForm = this.formBuilder.group({
      vendorId: ['', Validators.required],
      saleDate: ['',Validators.required],
    })
  }

  formSubmitted(){
      this.newPurchase.vendorId = this.newPurchaseForm.value.vendorId;
      this.newPurchase.purchaseDate = this.newPurchaseForm.value.saleDate;
  
      this.purchaseService.addNewPurchase(this.newPurchase).subscribe((res) => {
        Swal.fire({icon: 'success',text:'Purchase Added Successfully'});
        this.commService.changeMessage({type: MessageType.Added, payload: 'Purchase Added'});
      },(err) => {
          Swal.fire({icon: 'warning',text: err.message})
      })
    }
}
