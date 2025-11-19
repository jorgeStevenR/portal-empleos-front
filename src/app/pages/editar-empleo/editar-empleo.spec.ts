import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEmpleo } from './editar-empleo';

describe('EditarEmpleo', () => {
  let component: EditarEmpleo;
  let fixture: ComponentFixture<EditarEmpleo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEmpleo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEmpleo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
