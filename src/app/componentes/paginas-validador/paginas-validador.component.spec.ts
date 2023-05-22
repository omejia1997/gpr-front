import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginasValidadorComponent } from './paginas-validador.component';

describe('PaginasValidadorComponent', () => {
  let component: PaginasValidadorComponent;
  let fixture: ComponentFixture<PaginasValidadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginasValidadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginasValidadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
