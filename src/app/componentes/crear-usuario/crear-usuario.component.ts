import { Component, OnInit } from '@angular/core';
//importamos dos librerias que permiten el primero trabajar con los datos en grupo
//y el segundo es el que nos permite interactuar con los datos desde el formulario
import{FormGroup, FormBuilder} from '@angular/forms';
//se debe importar el servicio creado para enviar los datos
import { CrudunoService } from 'src/app/servicio/cruduno.service';
//importamos un router para poder redireccionar una vez que se aya guardado la informacion
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  //creada las importaciones, debemos crear un elemento para dar uso del elemento
  formulariodeUsuario:FormGroup;

  //luego debemos con el builder recepcionar los datos del formgroup
  constructor(public formulario:FormBuilder,
    //le agregamos al constructor en servicio para poder aprovechar los recursos
    private crudService:CrudunoService,
    //tambien agrgamos al constructor y creamos un objeto del router para poder utilizarlo
    private ruteador:Router
    ) { 
    //luego almacenamos y los datos para poder procesarlos
    this.formulariodeUsuario=this.formulario.group({
      //se crea un grupo de los datos que voy a recibir
      cedula:[''],
      nombre:[''],
      apellido:[''],
      correo:[''],
      telefono:['']
    });
  }

  ngOnInit(): void {
  }
  //esta funcion esta creada aqui y sera utilizada desde el html
  //los datos se envian y recepcionan aqui
  enviarDatos(): any {
    //la siguiente linea es para probar que si estafuncionando el boton en el html
    console.log("Me presionaste");
    //aqui se hace una impresion para comprobar que los datos se estan recepcionando
    //le damos uso del formulario creado arriba
    console.log(this.formulariodeUsuario.value);
    //ahora en la funcion le pasamos al servicio todos los datos del formulario que ya les 
    //extraimos desde la vista
    this.crudService.agregarUsuario(this.formulariodeUsuario.value).subscribe()
    //ahora le mandamo aca para que una ves guardada la inforacion nos redireccione a lver los datos
    this.ruteador.navigateByUrl('/usuarios')
  }

}
