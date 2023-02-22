import { Component, OnInit } from '@angular/core';
//importamos el servicio para poder extraer datos de la BD
import { CrudunoService } from 'src/app/servicio/cruduno.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  //creo una variable para pdoer almacenar informacion
  usuarios:any

  constructor(
    //agregamos al constructro el crud para poder utilizarlo
    private crudService:CrudunoService
  ) { }

  ngOnInit(): void {
    //aqui le vamos a extrear los resultados y verlos
    this.crudService.obtenerUsuario().subscribe(respuesta=>{
      //aqui primero se imprime en consola para ver si estan llegando los datos
      console.log(respuesta)
      this.usuarios=respuesta
    })
  }
  //para la funcion de eliminar usuario debemos controlar en tomar los datos de la fila
  borrarUsuario(cedula:any,iControl:any){
    console.log(cedula);
    console.log(iControl);
    if(window.confirm("Desea de verdad borrar al usuario¿?")){
      //le llamamos al servicio y de alli a la funcio de aliminado creada
      this.crudService.borrarUsuario(cedula).subscribe((respuesta)=>{
        //le asemos que se tome del icontrol y el primer elemento seleccionado
        this.usuarios.splice(iControl,1);
      });
    }
  }

}
