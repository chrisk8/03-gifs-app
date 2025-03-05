import { Component } from '@angular/core';
import { environment } from '@environments/environment';


@Component({
  selector: 'gifs-side-menu-header',
  imports: [],
  templateUrl: './gifs-side-menu-header.component.html',
  
})
export class GifsSideMenuHeaderComponent { 
  //Se crea una propiedad para usar las variables de entornos
  //Se debe importar el archivo de PRODUCCION ya que el de desarrollo es cambiado atumaticamente por lo que tenga el de PROD
  environments = environment;
}
