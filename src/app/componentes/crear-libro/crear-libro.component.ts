import { Component, OnInit } from '@angular/core';
import{FormGroup, FormBuilder} from '@angular/forms';
import { CrudunoService } from 'src/app/servicio/cruduno.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-libro',
  templateUrl: './crear-libro.component.html',
  styleUrls: ['./crear-libro.component.css']
})
export class CrearLibroComponent implements OnInit {
  formulariodeLibro:FormGroup;

  constructor(public formulario:FormBuilder,
    private crudService:CrudunoService,
    private ruteador:Router 
    ) {
    this.formulariodeLibro=this.formulario.group({
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

  enviarDatos(): any {
    console.log("Me presionaste");
    console.log(this.formulariodeLibro.value);
    this.crudService.agregarLibros(this.formulariodeLibro.value).subscribe()
    this.ruteador.navigateByUrl('/libros')
  }

}
