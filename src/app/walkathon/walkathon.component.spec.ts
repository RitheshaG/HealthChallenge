import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkathonComponent } from './walkathon.component';

describe('WalkathonComponent', () => {
  let component: WalkathonComponent;
  let fixture: ComponentFixture<WalkathonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalkathonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalkathonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
