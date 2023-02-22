import { Component, OnInit } from '@angular/core';
import{FormGroup, FormBuilder} from '@angular/forms';
import { CrudunoService } from 'src/app/servicio/cruduno.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.css']
})
export class DevolucionesComponent implements OnInit {
  formulariodeDevolucion:FormGroup;

  constructor(
    public formulario:FormBuilder,
    private crudService:CrudunoService,
    private ruteador:Router
  ) { 
    this.formulariodeDevolucion=this.formulario.group({
      cedula:[''],
      id_libro:['']
    });
  }

  ngOnInit(): void {
  }
  enviarDatos(): any {
    console.log("Me presionaste");
    console.log(this.formulariodeDevolucion.value);
    this.crudService.devolverLibro(this.formulariodeDevolucion.value).subscribe()
    this.ruteador.navigateByUrl('/principal')
  }

}
