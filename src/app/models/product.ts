import { ProductCategory } from "./product-category";

export interface Product {
    id: number;
    name: string;
    productTypeId: number;
    category: ProductCategory;
}
