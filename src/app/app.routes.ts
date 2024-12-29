import { Routes } from '@angular/router';
import { ListProductCategoriesComponent } from './category/list-product-categories/list-product-categories.component';
import { ListProductsComponent } from './product/list-products/list-products.component';
import { ProductMainComponent } from './product/product-main/product-main.component';
import { CategoryMainComponent } from './category/category-main/category-main.component';

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
        "path": "",
        "redirectTo": "product-main",
        "pathMatch": "full"
    }
];
