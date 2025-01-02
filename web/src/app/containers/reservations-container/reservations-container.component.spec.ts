import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsContainerComponent } from './reservations-container.component';

describe('ReservationsContainerComponent', () => {
  let component: ReservationsContainerComponent;
  let fixture: ComponentFixture<ReservationsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationsContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
