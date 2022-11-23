import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosListarComponent } from '../app/modulos/usuarios-listar/usuarios-listar.component'



const routes: Routes = [
  {path:'', component:UsuariosListarComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
