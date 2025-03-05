import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


//interface para definir como deb lucir una opcion del menu del dashboard
interface menuOption {
  icon: string
  label: string,
  route: string,    //Para definir la ruta a la que llevara esa opcion
  sublabel: string,
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [ 
    RouterLinkActive ,
    RouterLink, 
  ],
  templateUrl: './gifs-side-menu-options.component.html',
})
export class GifsSideMenuOptionsComponent { 
    //Las opciones del menu seran un arreglo de tipo menuOption para tener valores estaticos  Y NO COMO UNA SEÑAL ya que no es dinamico
    menuOptions: menuOption[] = [
      {
        icon: 'fa-solid fa-ghost fa-2xl',
        label: 'Trending',
        route: 'dashboard/trending',    //Para definir la ruta a la que llevara esa opcion
        sublabel: 'GIFs Populares',
      },
      {
        icon: 'fa-solid fa-binoculars fa-2xl',
        label: 'Buscador',
        route: '/dashboard/search',    //Para definir la ruta a la que llevara esa opcion
        sublabel: 'Buscar GIFs',
      }
    ]
}
