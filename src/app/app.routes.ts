import { Routes } from '@angular/router';
import { ListProductCategoriesComponent } from './masters/category/list-product-categories/list-product-categories.component';
import { ListProductsComponent } from './masters/product/list-products/list-products.component';
import { ProductMainComponent } from './masters/product/product-main/product-main.component';
import { CategoryMainComponent } from './masters/category/category-main/category-main.component';
import { MastersComponent } from './masters/masters.component';


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
        "path": "masters",
        "component": MastersComponent
    },
    {
        "path": "",
        "redirectTo": "masters",
        "pathMatch": "full"
    }
];
