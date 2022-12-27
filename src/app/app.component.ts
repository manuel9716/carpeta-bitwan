import { Component } from '@angular/core';
import { LoginService } from './servicios/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hola';
  login: boolean = false;
  constructor(private loginService: LoginService){
    this.loginService.currentMessage.subscribe(message=>{
      if (message) {
        this.login= true;  
      } else {
        this.login= false;  
      }
    })    
    console.log(this.login);       
  }
}
  

