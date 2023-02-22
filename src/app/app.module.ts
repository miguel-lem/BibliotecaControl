import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { PrestamosComponent } from './componentes/prestamos/prestamos.component';
import { DevolucionesComponent } from './componentes/devoluciones/devoluciones.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { LibrosComponent } from './componentes/libros/libros.component';
import { ReportesComponent } from './componentes/reportes/reportes.component';
import { CrearUsuarioComponent } from './componentes/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';
import { EditarLibroComponent } from './componentes/editar-libro/editar-libro.component';
import { CrearLibroComponent } from './componentes/crear-libro/crear-libro.component';

//debemos importar la parte de los formularios y la reactiva, para poder
//por un lado trabajar con los datos y por el otro para que se mantenga actualizado
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
//la aiguiente es para poder interactuar con la base de datos
import{HttpClientModule} from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    PrestamosComponent,
    DevolucionesComponent,
    UsuariosComponent,
    LibrosComponent,
    ReportesComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    EditarLibroComponent,
    CrearLibroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
