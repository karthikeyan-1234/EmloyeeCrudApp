import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ProductService } from '../../services/product.service';
import { CommunicationService } from '../../services/communication.service';
import { Message } from '../../models/message';
import { MessageType } from '../../enums/message-type.enum';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule,MatIconModule, MatDatepickerModule, 
      MatDialogModule, MatButtonModule, MatFormFieldModule,MatInputModule,
      MatSelectModule, //MatRadioModule, MatRadioButton, 
      ReactiveFormsModule, FormsModule, SweetAlert2Module],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  newCategoryForm!: FormGroup;

  constructor(private formBuilder:FormBuilder, private productService: ProductService, private communicationService: CommunicationService) { 
    this.newCategoryForm = this.formBuilder.group({
      name: ['']
    })
  }

  formSubmitted(){
    this.productService.addProductCategory(this.newCategoryForm.value).subscribe((response) => {
      console.log(response);
      const message: Message = { type: MessageType.Added, payload: 'Category Added' };
      this.communicationService.changeMessage(message);
    })
  }

}
