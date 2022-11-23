import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosBuscarComponent } from './usuarios-buscar.component';

describe('UsuariosBuscarComponent', () => {
  let component: UsuariosBuscarComponent;
  let fixture: ComponentFixture<UsuariosBuscarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosBuscarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosBuscarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
