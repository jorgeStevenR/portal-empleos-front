import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCandidato } from './register-candidato';

describe('RegisterCandidato', () => {
  let component: RegisterCandidato;
  let fixture: ComponentFixture<RegisterCandidato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCandidato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCandidato);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
