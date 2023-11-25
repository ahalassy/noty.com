import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotyappComponent } from './notyapp.component';

describe('NotyappComponent', () => {
  let component: NotyappComponent;
  let fixture: ComponentFixture<NotyappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotyappComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotyappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
