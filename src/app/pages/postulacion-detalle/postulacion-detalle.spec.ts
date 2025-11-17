import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulacionDetalle } from './postulacion-detalle';

describe('PostulacionDetalle', () => {
  let component: PostulacionDetalle;
  let fixture: ComponentFixture<PostulacionDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostulacionDetalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulacionDetalle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
