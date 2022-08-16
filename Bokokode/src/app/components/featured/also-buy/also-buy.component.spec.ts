import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlsoBuyComponent } from './also-buy.component';

describe('AlsoBuyComponent', () => {
  let component: AlsoBuyComponent;
  let fixture: ComponentFixture<AlsoBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlsoBuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlsoBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
