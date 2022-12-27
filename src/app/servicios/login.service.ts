import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'http://45.230.33.14:4141/api/public/';
  
  
  userToken: string = "";
  regulator;

  private messageSource = new BehaviorSubject<boolean>(false);
  currentMessage = this.messageSource.asObservable(); //Envía el estado de autenticación al resto de componentes

  constructor(private http: HttpClient,              
              private router: Router,) {

                if ( localStorage.getItem('token') ) { //Al inciarse verifica si hay token guardado
                  this.userToken = localStorage.getItem('token');
                  this.messageSource.next(true);
                } else {
                  this.userToken = '';
                  this.messageSource.next(false);
                }

    }
  
    login(usuario ){      

      let httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
      };      
  
      //Envía usuario + contraseña + peticion de token"
      return this.http.post(this.url+'login',`json={"alias": "${usuario.alias}", "password":"${usuario.password}"}`, httpOptions).pipe( //symfony
      //return this.http.post(this.url+'usuario/auth',usuario).pipe(
        map( resp => {          
          console.log(resp);
          if(resp['code'] == 200){
            this.guardarToken( resp['data'].token );
            this.messageSource.next(true);
            console.log(resp['code']);
          }else{
            localStorage.removeItem('token');    
            this.userToken = '';
            this.messageSource.next(false);
            
            var n = localStorage.length;
            while(n--) {
              var key = localStorage.key(n);
              
                localStorage.removeItem(key);
            }
          } 
          return resp;
        })
      );    
    }
  
    private guardarToken( token: string ) {
  
      this.userToken = token;
      localStorage.setItem('token', token);
    }
  
    logout(){ //cierra sesion quitando el token
      localStorage.removeItem('token');    
      this.userToken = '';
      
      var n = localStorage.length;
      while(n--) {
        var key = localStorage.key(n);
        
          localStorage.removeItem(key);
      }
      this.router.navigateByUrl('');
      this.messageSource.next(false);
      //location.reload(); 
    }
  
  }
