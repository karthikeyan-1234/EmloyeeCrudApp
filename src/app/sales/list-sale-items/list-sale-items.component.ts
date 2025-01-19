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
import { MatDialogRef } from '@angular/material/dialog';  // Import MatDialogRef
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
  @Output() closed = new EventEmitter<void>();
  

  isAddingNewEntry = true;
  newEntry: SaleDetailInfo = {
      id: 0,
      saleId: 0,
      productId: 0,
      productName: '',
      quantity: 0,
      price: 0,
  };

  constructor(private saleService: SaleService,private productService:ProductService,private cdr: ChangeDetectorRef
  ){
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

    }
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

      if(this.isAddingNewEntry)
      {
        this.isAddingNewEntry = false;
        console.log(this.dataSource.data);
        const data = this.dataSource.data.filter(entry => entry.id != 0); // Remove new entry from data array
        console.log(data);
        this.dataSource.data = data; // Update dataSource
      }

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
    this.isAddingNewEntry = true;
    const data = this.dataSource.data;
    data.unshift(this.newEntry); // Add new entry to data array
    this.editedId = 0;
    this.dataSource.data = data; // Update dataSource
    this.cdr.detectChanges();
  }

  cancel(){
    this.isAddingNewEntry = false;
    console.log("Cancelling new entry..");
    console.log(this.newEntry);
    const data = this.dataSource.data.filter(entry => entry.id == 0); // Remove new entry from data array
    this.dataSource.data = data; // Update dataSource
    this.closed.emit();
    this.cdr.detectChanges();
  }


}
