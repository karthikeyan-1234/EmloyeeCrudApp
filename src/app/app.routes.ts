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
import { AuthGuard } from './guards/auth.guard';
import { MenuComponent } from './common/menu/menu.component';


export const routes: Routes = [
    //Add path to the list-product-categories component
    {
        "path": "list-product-categories",
        "component": CategoryMainComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin']} // Add the roles data property
    },
    {
        "path": "product-main",
        "component": ProductMainComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin']} // Add the roles data property
    },
    {
        "path": "customers",
        "component": CustomerComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin']} // Add the roles data property
    },    
    {
        "path": "masters",
        "component": MastersComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin']} // Add the roles data property
    },
    {
        "path": "sales",
        "component": SalesMainComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin']} // Add the roles data property
    },
    {
        "path": "purchases",
        "component": PurchaseMainComponent,
        canActivate: [AuthGuard],
        data: { roles: ['super-admin']} // Add the roles data property
    },
    {
        "path": "menu",
        "component": MenuComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin']} // Add the roles data property
    },        
    { 
        path: '**',
        redirectTo: 'masters' 
    },
];
