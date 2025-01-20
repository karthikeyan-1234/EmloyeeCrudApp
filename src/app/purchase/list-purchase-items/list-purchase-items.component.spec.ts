import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPurchaseItemsComponent } from './list-purchase-items.component';

describe('ListPurchaseItemsComponent', () => {
  let component: ListPurchaseItemsComponent;
  let fixture: ComponentFixture<ListPurchaseItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPurchaseItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPurchaseItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
