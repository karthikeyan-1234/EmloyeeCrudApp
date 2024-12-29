import { Component,ComponentFactoryResolver, ViewChild, ViewContainerRef, OnInit, Type } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { CategoryMainComponent } from './category/category-main/category-main.component';
import { ProductMainComponent } from './product/product-main/product-main.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-masters',
  standalone: true,
  imports: [MatButtonModule,MatTabsModule,CommonModule],
  templateUrl: './masters.component.html',
  styleUrl: './masters.component.css'
})
export class MastersComponent {
  @ViewChild('dynamicContainer', { read: ViewContainerRef, static: true })
  dynamicContainer!: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  links = [
    { label: 'Product Category', component: CategoryMainComponent },
    { label: 'Products', component: ProductMainComponent },
    { label: 'Tab 3', component: CategoryMainComponent }
  ];

  activeLink: string = '';

  ngOnInit() {
    // Optionally load the first tab by default
    this.loadComponent(0);
  }

  loadComponent(index: number) {
    const componentY = this.links[index].component as Type<any>;

    // Clear the container
    this.dynamicContainer.clear();

    // Create the component
    const factory = this.resolver.resolveComponentFactory(componentY);
    this.dynamicContainer.createComponent(factory);

    // Set active link
    this.activeLink = this.links[index].label;
  }
}
