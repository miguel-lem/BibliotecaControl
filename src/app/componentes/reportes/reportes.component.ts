import { Component, OnInit } from '@angular/core';
import { CrudunoService } from 'src/app/servicio/cruduno.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  reportes:any

  constructor(
    private crudService:CrudunoService
  ) { }

  ngOnInit(): void {
    this.crudService.obtenerReportes().subscribe(respuesta=>{
      //aqui primero se imprime en consola para ver si estan llegando los datos
      console.log(respuesta)
      this.reportes=respuesta
    })
  }

}
