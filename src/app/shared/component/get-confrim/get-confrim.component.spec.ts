import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetConfrimComponent } from './get-confrim.component';

describe('GetConfrimComponent', () => {
  let component: GetConfrimComponent;
  let fixture: ComponentFixture<GetConfrimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetConfrimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetConfrimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
