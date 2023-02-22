import { Component, OnInit } from '@angular/core';
import { CrudunoService } from 'src/app/servicio/cruduno.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-libro',
  templateUrl: './editar-libro.component.html',
  styleUrls: ['./editar-libro.component.css']
})
export class EditarLibroComponent implements OnInit {
  elId:any;
  formulariodeLibro:FormGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private crudService:CrudunoService,
    public formulario:FormBuilder,
    private ruteador:Router
  ) { 
    this.elId=this.activeRoute.snapshot.paramMap.get('id');
    console.log('el id que seleccione: '+this.elId)
    this.crudService.traerLibro(this.elId).subscribe(respuesta=>{
      //aqui le imprimo la variable para ver lo que me esta extrayendo
      console.log(respuesta);
      //vamos utilizar el formulario pero le vamos a ingresar valores
      //que estaran viniendo directamente
      this.formulariodeLibro.setValue({
        id:respuesta[0]['id'],
        titulo:respuesta[0]['titulo'],
        anio:respuesta[0]['anio'],
        autor:respuesta[0]['autor'],
        categoria:respuesta[0]['categoria'],
        edicion:respuesta[0]['edicion'],
        idioma:respuesta[0]['idioma'],
        paginas:respuesta[0]['paginas'],
        descripcion:respuesta[0]['descripcion'],
        ejemplares:respuesta[0]['ejemplares']
      });
    });
    this.formulariodeLibro=this.formulario.group({
      id:[''],
      titulo:[''],
      anio:[''],
      autor:[''],
      categoria:[''],
      edicion:[''],
      idioma:[''],
      paginas:[''],
      descripcion:[''],
      ejemplares:['']
    });
  }

  ngOnInit(): void {
  }
  enviarDatos():any{
    console.log(this.elId)
    console.log(this.formulariodeLibro.value)
    this.crudService.editarLibro(this.elId,this.formulariodeLibro.value).subscribe(()=>{
      this.ruteador.navigateByUrl('/libros')
    })
  }

}
