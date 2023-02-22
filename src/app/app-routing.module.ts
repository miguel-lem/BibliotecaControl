import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//una vez creado los modulos, debemos indicarle aqui cuales seran y debemos
//crear las importaciones para poder acceder desde el routing 
import { PrincipalComponent } from './componentes/principal/principal.component';
import { PrestamosComponent } from './componentes/prestamos/prestamos.component';
import { DevolucionesComponent } from './componentes/devoluciones/devoluciones.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { CrearUsuarioComponent } from './componentes/crear-usuario/crear-usuario.component';
import { LibrosComponent } from './componentes/libros/libros.component';
import { ReportesComponent } from './componentes/reportes/reportes.component';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';
import { EditarLibroComponent } from './componentes/editar-libro/editar-libro.component';
import { CrearLibroComponent } from './componentes/crear-libro/crear-libro.component';


const routes: Routes = [
  //aqui se definen las rutas que se van a utilizar dentro del componente principal
  {path:'',pathMatch:'full',redirectTo:'principal'},
  {path:'principal',component:PrincipalComponent},
  {path:'prestamos',component:PrestamosComponent},
  {path:'devoluciones',component:DevolucionesComponent},
  {path:'usuarios',component:UsuariosComponent},
  {path:'crear-usuario',component:CrearUsuarioComponent},
  {path:'libros',component:LibrosComponent},
  {path:'reportes',component:ReportesComponent},
  {path:'editar-usuario/:cedula',component:EditarUsuarioComponent},
  {path:'editar-libro/:id',component:EditarLibroComponent},
  {path:'crear-libro',component:CrearLibroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
