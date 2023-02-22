import { Component, OnInit } from '@angular/core';

import { CrudunoService } from 'src/app/servicio/cruduno.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  //creamos una variable id para aqui almacenar el id
  //y luego poder pedirle al servicio que me carge esos datos en la vista 
  //extrayendole desde el lado del servidor
  elId:any
  //creada las importaciones, debemos crear un elemento para dar uso del elemento
  formulariodeUsuario:FormGroup;

  constructor(
    //le utilizamos el activeroute para poder recuoerar la variable y luego almacenarla en la variable creada aqui
    private activeRoute: ActivatedRoute,
    //creamos el servicio para poder utilizarlos
    private crudService:CrudunoService,
    //luego debemos con el builder recepcionar los datos del formgroup
    public formulario:FormBuilder,
    private ruteador:Router
  ) {
    //capturamos el dato en la variable
    this.elId=this.activeRoute.snapshot.paramMap.get('cedula');
    //le imprime en pantalla para ver el dato que se esta guardando en la variable
    console.log('el id que seleccione: '+this.elId)
    //como ya creamos el objeto de crudservice ya le podemos utilizarlo aqui
    this.crudService.traerUsuario(this.elId).subscribe(respuesta=>{
      //aqui le imprimo la variable para ver lo que me esta extrayendo
      console.log(respuesta)
      //vamos utilizar el formulario pero le vamos a ingresar valores
      //que estaran viniendo directamente
      this.formulariodeUsuario.setValue({
        //le asiganmos un valor cero y el valor que venga a la API
        cedula:respuesta[0]['cedula'],
        nombre:respuesta[0]['nombre'],
        apellido:respuesta[0]['apellido'],
        correo:respuesta[0]['correo'],
        telefono:respuesta[0]['telefono']
      })
    })
    //luego almacenamos y los datos para poder procesarlos
    this.formulariodeUsuario=this.formulario.group({
      //se crea un grupo de los datos que voy a recibir
      cedula:[''],
      nombre:[''],
      apellido:[''],
      correo:[''],
      telefono:['']
    })
   }

  ngOnInit(): void {
  }

  enviarDatos():any{
    //impresion de id 
    console.log(this.elId)
    //impresion para comprobar que los datos editados si se les esta enviando de la nueva forma
    console.log(this.formulariodeUsuario.value)
    //ahora le llamamos al servicio, le pasamos la funcion son los datos, primero el identificador y junto los datos totales
    this.crudService.editarUsuario(this.elId,this.formulariodeUsuario.value).subscribe(()=>{
      //ahora le mandamo aca para que una ves guardada la inforacion nos redireccione a lver los datos
      this.ruteador.navigateByUrl('/usuarios')
    })
  }

}
