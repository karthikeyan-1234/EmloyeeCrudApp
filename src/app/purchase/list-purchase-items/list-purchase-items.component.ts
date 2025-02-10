import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { PurchaseInfo } from '../../models/purchase-info';
import { PurchaseDetailInfo } from '../../models/purchase-detail-info';
import { Product } from '../../models/product';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PurchaseService } from '../../services/purchase.service';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
import { Purchase } from '../../models/purchase';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-list-purchase-items',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, FormsModule, MatSelectModule,MatSidenavModule,
      MatIconModule, MatButtonModule, MatInputModule, HttpClientModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './list-purchase-items.component.html',
  styleUrl: './list-purchase-items.component.css'
})
export class ListPurchaseItemsComponent {
  @Input() purchase!: PurchaseInfo;

  purchaseDetails!: PurchaseDetailInfo[];
  products!: Product[];
  dataSource!: MatTableDataSource<PurchaseDetailInfo>;
  editedId: number = 0;
  displayedColumns = ['id', 'productName', 'quantity', 'price', 'amount', 'actions'];
  open: boolean = true;
  @Output() closed = new EventEmitter<void>();
  

  isAddingNewEntry = true;
  newEntry: PurchaseDetailInfo = {
      id: 0,
      purchaseId: 0,
      productId: 0,
      productName: '',
      quantity: 0,
      price: 0,
  };

  constructor(private purchaseService: PurchaseService,private productService:ProductService,private cdr: ChangeDetectorRef
  ){
  }

  ngOnChanges(): void {
    if (this.purchase) {
      // Fetch the sale items for the selected purchase
      console.log('Selected Purchase:', this.purchase);
      this.newEntry.purchaseId = this.purchase.id;
      this.loadPurchaseItems(this.purchase);
      this.productService.getAllProducts().subscribe((res)=>{
          this.products = res;
      },(err)=>{

      })

    }
  }

  resetNewEntry() {
    this.newEntry = {
      id: 0,
      purchaseId: this.purchase.id,
      productId: 0,
      productName: '',
      quantity: 0,
      price: 0,
    };
  }
  

  loadPurchaseItems(purchase: PurchaseInfo): void {
    this.purchaseService.getPurchaseDetailInfoItems(purchase!).subscribe((purchaseDetails) => {
      this.purchaseDetails = purchaseDetails;
      this.dataSource = new MatTableDataSource(this.purchaseDetails);
      console.log("Purchase items..");
      console.log(this.purchaseDetails);
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
  updatePurchaseInfo(purchaseInfo: PurchaseDetailInfo) {
    this.purchaseService.updatePurchaseDetailInfoItem(purchaseInfo).subscribe((res)=>{
      if(purchaseInfo.id == 0)  
          Swal.fire({icon: 'success',text: 'Purchase added..!!'});
      else
          Swal.fire({icon: 'success',text: 'Purchase updated..!!'});
        this.editedId = -1;
        this.resetNewEntry();
        this.loadPurchaseItems(this.purchase);
      },(err) => {
        Swal.fire({icon: 'warning',text: err.message})
      })
  }
    
  deletePurchaseInfo(purchaseInfo: PurchaseDetailInfo) {
    Swal.fire({
      title: 'Are you sure?',text: "You want to delete this Purchase?",icon: 'warning',showCancelButton: true,
      confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed)
        this.deletePurchaseInfoConfirmed(purchaseInfo);
    })
  }

  deletePurchaseInfoConfirmed(purchase: PurchaseDetailInfo) {
    this.purchaseService.deletePurchaseDetailInfoItem(purchase).subscribe(res => {
      Swal.fire("Sale Deleted..!!").then((res)=>{
        this.loadPurchaseItems(this.purchase);
      },(err) =>{
        Swal.fire("Unable to delete..!!","","error");
      })
      })
  }
    
  editPurchaseInfo(purchase: PurchaseDetailInfo) {
    this.cancelEdit();
    this.editedId = purchase.id;
  }

  addPurchaseEmptyEntry()
  {
    this.isAddingNewEntry = true;

    if(this.dataSource)
    {
      const data = this.dataSource.data;
      data.unshift(this.newEntry); // Add new entry to data array
      this.dataSource.data = data; // Update dataSource
    }
    this.editedId = 0;
    this.cdr.detectChanges();
  }

  cancel(){
    this.isAddingNewEntry = false;
    console.log("Cancelling new entry..");
    console.log(this.newEntry);
    console.log(this.dataSource.data);

    //Check if dataSource is not null and remove new entry from it
    if(this.dataSource && this.dataSource.data)
    {
      const data = this.dataSource.data.filter(entry => entry.id != 0); // Remove new entry from data array
      this.dataSource.data = data; // Update dataSource
    }

    this.closed.emit();
    this.cdr.detectChanges();
  }


}
