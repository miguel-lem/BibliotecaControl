import { Component, OnInit } from '@angular/core';
import { CrudunoService } from 'src/app/servicio/cruduno.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  libros:any

  constructor(
    private crudService:CrudunoService
  ) { }

  ngOnInit(): void {
    this.crudService.obtenerLibros().subscribe(respuesta=>{
      console.log(respuesta)
      this.libros=respuesta
    })
  }

  borrarLibro(id:any,iControl:any){
    console.log(id);
    console.log(iControl);
    if(window.confirm("Desea de verdad borrar el libro¿?")){
      //le llamamos al servicio y de alli a la funcio de aliminado creada
      this.crudService.borrarLibro(id).subscribe((respuesta)=>{
        //le asemos que se tome del icontrol y el primer elemento seleccionado
        this.libros.splice(iControl,1);
      });
    }
  }

}
