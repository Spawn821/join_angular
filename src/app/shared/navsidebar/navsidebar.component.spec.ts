import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavsidebarComponent } from './navsidebar.component';

describe('NavsidebarComponent', () => {
  let component: NavsidebarComponent;
  let fixture: ComponentFixture<NavsidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavsidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
