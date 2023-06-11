import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestManagerComponent } from './gest-manager.component';

describe('GestManagerComponent', () => {
  let component: GestManagerComponent;
  let fixture: ComponentFixture<GestManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GestManagerComponent]
    });
    fixture = TestBed.createComponent(GestManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
