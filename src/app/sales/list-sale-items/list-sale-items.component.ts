import { Component, EventEmitter, Input, Output, output } from '@angular/core';
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
import { SaleDetailInfo } from '../../models/sale-detail-info';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-list-sale-items',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, FormsModule, MatSelectModule,MatSidenavModule,
    MatIconModule, MatButtonModule, MatInputModule, HttpClientModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './list-sale-items.component.html',
  styleUrl: './list-sale-items.component.css'
})
export class ListSaleItemsComponent {
  @Input() sale!: SaleInfo;
  saleDetails!: SaleDetailInfo[];
  products!: Product[];
  dataSource!: MatTableDataSource<SaleDetailInfo>;
  editedId: number = 0;
  displayedColumns = ['id', 'productName', 'quantity', 'price', 'amount', 'actions'];
  open: boolean = true;
  @Output() entryCancelled = new EventEmitter<any>();
  
  newProduct: any;
  newPrice: any;
  newQuantity: any;

  isAdding = true; // Track if a new row is being added
  newRow = { productId: null, price: 0.00, quantity: null }; // Temporary storage for new row data
  @Output() isAddingChanged = new EventEmitter<boolean>();
  showInputRow = true;


  constructor(private saleService: SaleService,private productService:ProductService,private cdRef: ChangeDetectorRef){
  }

  ngOnChanges(): void {
    if (this.sale) {
      // Fetch the sale items for the selected sale
      console.log('Selected Sale:', this.sale);
      this.loadSaleItems(this.sale);
      this.productService.getAllProducts().subscribe((res)=>{
          this.products = res;
      },(err)=>{

      })

      this.isAdding = true;
      this.isAddingChanged.emit(this.isAdding); 
    }
  }

  addNewRow() {
    console.log("Adding new row...");
    this.isAdding = true;
    this.showInputRow = true;
    this.isAddingChanged.emit(this.isAdding); 
    this.newRow = { productId: null, price: 0.00, quantity: null }; // Reset new row
    console.log("New row to be displayed..!!");
    this.cdRef.detectChanges();
  }

  saveNewRow() {
    if (this.newRow.productId && this.newRow.price && this.newRow.quantity) {
      // Add new row to data source
      //this.isAdding = false;
    } else {
      alert('Please fill all fields');
    }
  }

  cancelAdd() {
    //this.isAdding = false;
    this.newRow = { productId: null, price: 0.00, quantity: null };
  }

  loadSaleItems(sale: SaleInfo): void {
    this.saleService.getSaleDetailInfoItems(sale!).subscribe((saleDetails) => {
      this.saleDetails = saleDetails;
      this.dataSource = new MatTableDataSource(this.saleDetails);
      console.log("Sale items..");
      console.log(this.saleDetails);
  },(err) => {

  })
  }

  cancelEdit() {
      this.editedId = -1;
  }
  updateSaleInfo(saleInfo: SaleDetailInfo) {
    this.saleService.updateSaleDetailInfo(saleInfo).subscribe((res)=>{
       Swal.fire({icon: 'success',text: 'Sale updated..!!'});
        this.editedId = -1;
        this.loadSaleItems(this.sale);
      },(err) => {
        Swal.fire({icon: 'warning',text: err.message})
      })
  }
    
  deleteSaleInfo(sale: SaleDetailInfo) {
     throw new Error('Method not implemented.');
  }
    
  editSaleInfo(sale: SaleDetailInfo) {
    this.editedId = sale.id;
  }

  addSaleInfo()
  {
    Swal.fire("Add new sale item");
  }

  cancel(){
    this.entryCancelled.emit();
  }

  addNewItem(){}

}
