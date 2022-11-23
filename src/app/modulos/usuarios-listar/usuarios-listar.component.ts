import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/servicios/servicios.service';

@Component({
  selector: 'app-usuarios-listar',
  templateUrl: './usuarios-listar.component.html',
  styleUrls: ['./usuarios-listar.component.css'],
})
export class UsuariosListarComponent implements OnInit {
  respuesta: any = 0;
  respuesta2: any = 0;
  formCrear: FormGroup;

  constructor(
    private serviciosService: ServiciosService,
    private _builder: FormBuilder,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.formCrear = this._builder.group({
      Nombre: [''],
      Apellido: [''],
      Email: [''],
      Telefono: [''],
    });
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.spinner.show();
    this.serviciosService.ConsultarUsuariosBack1().subscribe((resp: any) => {
      this.respuesta = resp.data[0];
      this.serviciosService.ConsultarUsuariosBack2().subscribe((resp: any) => {
        console.log(resp.result.usuarios);
        var size = resp.result.usuarios.length;
        this.respuesta2 = resp.result.usuarios[size - 1];
        
          this.spinner.hide();
        
      });
    });
  }
  guardar(): void {
    this.spinner.show();
    const body = Object.assign({}, this.formCrear.value);
    this.serviciosService.CrearUsuariosDual(body).subscribe((resp: any) => {
      if (resp.status == 200) {
        this.toaster.success('Usuario Creado');
        this.getUsuarios();
        this.formCrear.reset();
      } else {
        this.toaster.error('Fallo');
      }
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 2000);
    });
  }
}
