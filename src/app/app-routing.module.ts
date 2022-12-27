import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosListarComponent } from '../app/modulos/usuarios-listar/usuarios-listar.component'
import { LoginComponent } from './modulos/login/login.component';


const routes: Routes = [
  {path:'', component:UsuariosListarComponent}
 // {path:'login', component:LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
