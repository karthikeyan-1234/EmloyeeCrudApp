import { Routes } from '@angular/router';
import { ListProductCategoriesComponent } from './masters/category/list-product-categories/list-product-categories.component';
import { ListProductsComponent } from './masters/product/list-products/list-products.component';
import { ProductMainComponent } from './masters/product/product-main/product-main.component';
import { CategoryMainComponent } from './masters/category/category-main/category-main.component';
import { MastersComponent } from './masters/masters.component';
import { CustomerComponent } from './masters/customer/customer.component';
import { SalesComponent } from './sales/sales.component';
import { SalesMainComponent } from './sales/sales-main/sales-main.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { PurchaseMainComponent } from './purchase/purchase-main/purchase-main.component';


export const routes: Routes = [
    //Add path to the list-product-categories component
    {
        "path": "list-product-categories",
        "component": CategoryMainComponent
    },
    {
        "path": "product-main",
        "component": ProductMainComponent
    },
    {
        "path": "customers",
        "component": CustomerComponent
    },    
    {
        "path": "masters",
        "component": MastersComponent
    },
    {
        "path": "sales",
        "component": SalesMainComponent
    },
    {
        "path": "purchases",
        "component": PurchaseMainComponent
    },        
    {
        "path": "",
        "redirectTo": "masters",
        "pathMatch": "full"
    }
];
