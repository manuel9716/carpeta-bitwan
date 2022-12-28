import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import { LoginService } from 'src/app/servicios/login.service';


const nombre = document.getElementById("Nombre")

@Component({
  selector: 'app-usuarios-listar',
  templateUrl: './usuarios-listar.component.html',
  styleUrls: ['./usuarios-listar.component.css'],
})
export class UsuariosListarComponent implements OnInit {
  respuesta: any = 0;
  respuesta2: any = 0;
  formCrear: FormGroup;
  formActualizar: FormGroup;
  formActualizar2: FormGroup;
  editar: any = 0;
  

  constructor(
    private serviciosService: ServiciosService,
    private _builder: FormBuilder,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private loginService: LoginService
    
  ) {
    const validatortext = [Validators.required, Validators.maxLength(50), Validators.minLength(2)]
    this.formActualizar = this._builder.group({
      Id: ['',validatortext],
      Nombre: ['',validatortext],
      Apellido: ['',validatortext],
      Email: ['',validatortext],
      Telefono: ['',validatortext],
  })
  this.formActualizar2 = this._builder.group({
    UsuarioId: ['',validatortext],
    Nombre: ['',validatortext],
    Apellido: ['',validatortext],
    Email: ['',validatortext],
    Telefono: ['',validatortext],
})
}


  ngOnInit(): void {
    const validatortext = [Validators.required, Validators.maxLength(50), Validators.minLength(2)]
    this.formCrear = this._builder.group({
      
      Nombre: ['',validatortext],
      Apellido: ['',validatortext],
      Email: ['',validatortext],
      Telefono: ['',validatortext],
      // Email: ['',[Validators.required, Validators.email]],
      // Telefono: ['',[Validators.required, Validators.maxLength(10), Validators.minLength(2)]],
    });
    // this.formCrear.valueChanges.subscribe((value)=>console.log(this.formCrear));
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.spinner.show();
    this.serviciosService.ConsultarUsuariosBack1().subscribe((resp: any) => {
      console.log("hola mundo")
      this.respuesta = resp.data[0];
      if (this.respuesta){
        this.formActualizar.setValue
        ({
        Id: this.respuesta?.Id,
        Nombre: this.respuesta?.Nombre,
        Apellido: this.respuesta?.Apellido,
        Email: this.respuesta?.Email,
        Telefono: this.respuesta?.Telefono
        })
      }
      this.serviciosService.ConsultarUsuariosBack2().subscribe((resp: any) => {
      
        var size = resp.result.usuarios.length;
        this.respuesta2 = resp.result.usuarios[size - 1];
        if (this.respuesta2){
        this.formActualizar2.setValue
        ({
        UsuarioId: this.respuesta2?.usuarioId,
        Nombre: this.respuesta2?.nombre,
        Apellido: this.respuesta2?.apellido,
        Email: this.respuesta2?.email,
        Telefono: this.respuesta2?.telefono
        })
      }
          this.spinner.hide();
      
      });
    });
  }
  confirmar(checked: boolean): void{
    
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

  borrarback1(id_node,id_net ){
    this.serviciosService.DeleteUsuariosBack1(id_node).subscribe(res=>{
      //this.actualizar2()
      this.serviciosService.DeleteUsuariosBack2(id_net).subscribe(res=>{
        this.actualizar2()
      }, error=>{
        this.toaster.error('Falló en .net');
      })
    }, error=>{
      this.toaster.error('Falló en node');
    })
  }

  borrarback2(id){
      this.serviciosService.DeleteUsuariosBack2(id).subscribe(res=>{
      console.log(res)
      this.actualizar2()
    })
  }
  salir(){
    this.loginService.logout();    
  }
   actualizar(): void{

     this.spinner.show();
     const body = Object.assign({}, this.formActualizar.value);
     this.serviciosService.ActualizarUsuariosBack1(body).subscribe((resp: any) =>{
      this.formActualizar2.setValue({
        UsuarioId: this.formActualizar.value.Id,
        Nombre: this.formActualizar.value.Nombre,
        Apellido: this.formActualizar.value.Apellido,
        Email: this.formActualizar.value.Email,
        Telefono: this.formActualizar.value.Telefono,
      });

      const body2 = Object.assign({}, this.formActualizar2.value);
      this.serviciosService.ActualizarUsuariosBack2(body2).subscribe((resp: any) =>{
        if (resp.status == 200) {
          this.toaster.success('Usuario Actualizado');
          this.getUsuarios();
          this.formActualizar.reset();
        } else {
          this.toaster.error('Falló en .net');
        }
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 2000);
      }, error =>{
        this.toaster.error('Falló en .net');
      })

     }, error =>{
      this.toaster.error('Falló en node');
     })
  }


  actualizar2(): void{

  
  
     this.spinner.show();
     this.respuesta
     const body = Object.assign({}, this.formActualizar2.value);
     this.serviciosService.ActualizarUsuariosBack2(body).subscribe((resp: any) =>{
       if (resp.status == 200) {
         this.toaster.success('Usuario Actualizado');
         this.getUsuarios();
         this.formActualizar.reset();
       } else {
         this.toaster.error('Fallo');
       }
       setTimeout(() => {
         /** spinner ends after 5 seconds */
         this.spinner.hide();
       }, 2000);
     })
   }
}
