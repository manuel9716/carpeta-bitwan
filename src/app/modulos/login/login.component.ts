import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  forma_autenticacion: FormGroup;
  recordarme = false;
  usuario={
    alias: null,
    password: null
  };
  constructor(private loginService: LoginService,
    private router: Router) {    
      this.forma_autenticacion = new FormGroup({                  
      alias: new FormControl('', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password : new FormControl('',Validators.required)
    }); }

  ngOnInit(): void {
  }

  login( form: NgForm){//Funcion para iniciar sesion por medio de formulario 
    console.log("hoola")   
    if (form.invalid){ //si el formulario es invalido      
     return (<any>Object).values( form.controls ).forEach( control => { //retorna warning en el formulario
      control.markAsTouched();
      });
    }else{//En caso de que el formulario sea válido
      //Swal.showLoading();
      this.loginService.login( this.usuario).subscribe(//Accede al servicio de login        
        resp => {//Retorna una repuesta si se da o no el login          
          //Swal.close();        
          if(resp['code'] !== 200){//Si la respuesta es erronea el login no se dió 
            /*Swal.fire({
              icon: 'error',
              title: "Datos erroneos",
              text: "El usuario o la contraseña no son validos"
            });*/
          }
          else{//En caso de que si se de el login
            if ( this.recordarme ) {//Si se marcó en el formulario almacena en el explorador el correo               
              localStorage.setItem('alias', this.usuario.alias);
            }    
            /*Swal.fire({
              title: 'Autenticando',
              text: 'Espere',
              allowOutsideClick: false,
              didOpen: function () {
                Swal.showLoading()
              }
            });*/           
            localStorage.setItem('alias', this.usuario.alias); //poner alias
            localStorage.setItem('nombre',resp['data'].nombres.toString()); //poner nombre
            //localStorage.setItem('id_rol',resp["permisos"].toString()); //  buscar como sacar el rol por los permisos
            localStorage.setItem('id_usuario',resp['data'].idusuario.toString());   // guardar id_usuario
            //localStorage.setItem('can_create',"true");  //guadar permisos del rol                                  
            // Swal.close();
            
            this.router.navigateByUrl('');//Re-dirigue al home
          }
        }
      );
    }         
  }

  myFunction() {
    let x : any = document.getElementById("inputPassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  

}

