import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSaleItemsComponent } from './list-sale-items.component';

describe('ListSaleItemsComponent', () => {
  let component: ListSaleItemsComponent;
  let fixture: ComponentFixture<ListSaleItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSaleItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSaleItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
