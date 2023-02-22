import { Injectable } from '@angular/core';
//importamos la libreria para poder conectar con la BD
import { HttpClient } from '@angular/common/http';
//importamos un observable para que mantenga actualizada la informacion
import { Observable } from 'rxjs';
//luego importamos el modelo de datos
import { Usuarios } from './Usuarios';
import { Libros } from './Libros';


@Injectable({
  providedIn: 'root'
})
export class CrudunoService {

  API: string='http://localhost/biblioteca.php/'

  //creamos el servicio en el constructor
  constructor(private clienteHttp:HttpClient) { }

  //Tanto para enviar como para recepcionar los datos se utiliza JSON

  //creamos la funcion para poder pasarle los datos al servidor mediante el url
  //esta funcion es para pasar los datos del usurio
  agregarUsuario(datosusuario:Usuarios):Observable<any>{
    return this.clienteHttp.post(this.API+"?insertarusuario",datosusuario);
  }


  //esta funcion es para pasarle los datos del libro a la BD
  agregarLibros(datoslibros:Libros):Observable<any>{
    return this.clienteHttp.post(this.API+"?insertarlibro=1",datoslibros);
  }

  //funcion para obtener datos desde la BD y mostrarlos en la vista
  obtenerUsuario(){
    return this.clienteHttp.get(this.API+"?verusuario")
  }

  //funcion para obtener los datos desde BD de la parte libros
  obtenerLibros(){
    return this.clienteHttp.get(this.API+"?verlibro")
  }

  //funcion para obteenr los datos desde BD de la parte reportes
  obtenerReportes(){
    return this.clienteHttp.get(this.API+"?verreporte")
  }

//funcion para eliminar los usuarios de la BD
  borrarUsuario(cedula:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?borrarusuario="+cedula);
  }

  //funcion para eliminar un libro de la BD
  borrarLibro(id:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?borrarlibro="+id);
  }

  //funcion para obtener un usuario de la BD
  traerUsuario(cedula:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultarusuario="+cedula);
  }

  //funcino para editar el usuario
  editarUsuario(cedula:any,datosusuario:any):Observable<any>{
    //aqui le pasamos el servidor el pedido de la funcion, el identificador y los datos que los vamos almacenar como nuevos
    return this.clienteHttp.post(this.API+"?actualizarusuario="+cedula,datosusuario);
  }

  //funcion para obtener un libro de la BD
  traerLibro(id:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultarlibro="+id);
  }

  //funcino para editar el libro de la bd
  editarLibro(id:any,datoslibro:any):Observable<any>{
    //aqui le pasamos el servidor el pedido de la funcion, el identificador y los datos que los vamos almacenar como nuevos
    return this.clienteHttp.post(this.API+"?actualizarlibros="+id,datoslibro);
  }

  //funcion para prestar el libro
  prestarLibro(datosprestamo:Libros):Observable<any>{
    return this.clienteHttp.post(this.API+"?insertarreporte=1",datosprestamo);
  }
  
  //funcion para devolver el libro
  devolverLibro(datosprestamo:Libros):Observable<any>{
    return this.clienteHttp.post(this.API+"?insertardevolucion=1",datosprestamo);
  }
}
