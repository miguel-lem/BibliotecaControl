import { Component, OnInit } from '@angular/core';
import{FormGroup, FormBuilder} from '@angular/forms';
import { CrudunoService } from 'src/app/servicio/cruduno.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {
  formulariodePrestamo:FormGroup;

  constructor(
    public formulario:FormBuilder,
    private crudService:CrudunoService,
    private ruteador:Router
  ) { 
    this.formulariodePrestamo=this.formulario.group({
      cedula:[''],
      id_libro:['']
    });
  }

  ngOnInit(): void {
  }
  enviarDatos(): any {
    console.log("Me presionaste");
    console.log(this.formulariodePrestamo.value);
    this.crudService.prestarLibro(this.formulariodePrestamo.value).subscribe()
    this.ruteador.navigateByUrl('/principal')
  }

}
