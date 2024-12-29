import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../../services/product.service';
import { ProductCategory } from '../../../models/product-category';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule  } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
//import { MatRadioGroup,MatRadioButton,MatRadioModule } from '@angular/material/radio';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { CommunicationService } from '../../../services/communication.service';
import { Product } from '../../../models/product';
import { MessageType } from '../../../enums/message-type.enum';

@Component({
  selector: 'app-add-product',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule,MatIconModule, MatDatepickerModule, 
    MatDialogModule, MatButtonModule, MatFormFieldModule,MatInputModule,
    MatSelectModule, //MatRadioModule, MatRadioButton, 
    ReactiveFormsModule, FormsModule, SweetAlert2Module],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {

  categories: ProductCategory[] = [];
  freshStates: string[] = [];

  newProductForm!: FormGroup;

  constructor(private productService:ProductService,private formBuilder:FormBuilder,
    private commService:CommunicationService
  ){}

  ngOnInit(): void {
    this.productService.getAllCategories().subscribe(res => {
      this.categories = res;
    })

    this.newProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['',Validators.required],
      rate: ['0.00', Validators.required]
    })

  }

  formSubmitted(){

    console.log("Adding product..", this.newProductForm.value);

    const productCategory = this.categories.find(c => c.id === this.newProductForm.value.category)!;

    const newProduct: Product = {
      id: 0,
      name: this.newProductForm.value.name,
      productTypeId: productCategory.id,
      rate: this.newProductForm.value.rate,
      category: productCategory
    }

    this.productService.addProduct(newProduct).subscribe((res) => {
      console.log(res);
      Swal.fire('Product Added Successfully');
      this.commService.changeMessage({type: MessageType.Added, payload: 'Product Added'});
    },(error) => {
      console.log(error);
    })
  }
}
