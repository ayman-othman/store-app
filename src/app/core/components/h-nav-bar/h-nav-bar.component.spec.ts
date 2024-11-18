import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HNavBarComponent } from './h-nav-bar.component';

describe('HNavBarComponent', () => {
  let component: HNavBarComponent;
  let fixture: ComponentFixture<HNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HNavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
