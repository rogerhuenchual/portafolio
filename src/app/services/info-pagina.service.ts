import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})

export class InfoPaginaService {


  equipo:any[] = [];
  info:InfoPagina = {};
  cargada = false;

  constructor(private http: HttpClient) {

   this.cargarInfo();
   this.cargarEquipo();

   }

private cargarInfo(){

  console.log("cargarInfo...");
  this.http.get('assets/data/data-pagina.json')
    .subscribe((resp:InfoPagina) =>{
      this.info = resp;
      this.cargada = true;
    });
}


private cargarEquipo(){

  console.log("cargarEquipo...");
  this.http.get('https://angular-html-218f4.firebaseio.com/equipo.json')
    .subscribe((resp:any[]) =>{
      console.log(resp);
      this.equipo = resp;
      this.cargada = true;
    });
}

}
