import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetManagerComponent } from './asset-manager.component';

describe('AssetManagerComponent', () => {
  let component: AssetManagerComponent;
  let fixture: ComponentFixture<AssetManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AssetManagerComponent]
    });
    fixture = TestBed.createComponent(AssetManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
