import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsListItemComponent } from './reservations-list-item.component';

describe('ReservationsListItemComponent', () => {
  let component: ReservationsListItemComponent;
  let fixture: ComponentFixture<ReservationsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationsListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
