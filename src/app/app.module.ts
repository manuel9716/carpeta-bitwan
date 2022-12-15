import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosBuscarComponent } from './modulos/usuarios-buscar/usuarios-buscar.component';
import { UsuariosListarComponent } from './modulos/usuarios-listar/usuarios-listar.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginComponent } from './modulos/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuariosBuscarComponent,
    UsuariosListarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgxSpinnerModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
