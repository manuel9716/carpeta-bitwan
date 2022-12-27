import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

//Back1 = Nodejs
//Back2 = .Net

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  servidor='http://localhost:4001'
  //servidor2='http://localhost:5262/api/usuarios'

  constructor(private servicio:HttpClient) { }
  

  ConsultarUsuariosBack1(){
    return this.servicio.get(this.servidor + '/usuarios')
    
  }

  ConsultarUsuariosBack2(){
    return this.servicio.get(this.servidor + '/api-sql/usuarios-consultar')
  }

 CrearUsuariosDual(body){
   return this.servicio.post(this.servidor + '/postdual', body )
  }
  ActualizarUsuariosBack1(body){
    return this.servicio.put(this.servidor + '/usuarios', body )
   }

  ActualizarUsuariosBack2(body){
    return this.servicio.put(this.servidor + '/api-sql/usuario-actualizar', body )
   }

   DeleteUsuariosBack1(id){
    return this.servicio.delete(this.servidor + '/usuarios/' + id )
   }

   DeleteUsuariosBack2(id){
    return this.servicio.delete(this.servidor + '/api-sql/usuario-eliminar/'+ id )
   }
}
