import { ProductCategory } from "./product-category";

export interface Product {
    id: number;
    name: string;
    category: ProductCategory;
    rate: number;

}
