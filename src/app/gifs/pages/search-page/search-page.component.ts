import { Component, inject, signal } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifsListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {

  gifsService = inject( GifsService );
  resultSearch = signal<Gif[]>( [] );


  //**Cuando se manda a llamar searchGifs(), va al gufs.service y dispara la peticion http y ahi mismo se hace el 
  //  .subscribe() que hace el mapeo de la respuesta y lo devuelve como un array de Gif.interface, sin embargo no se puede 
  //  retornar ese array en la funcion searchGifs() ya que el subscribe 
  //  es el que devuelve un onbservable de tipo Gif y no el metodo.
  //* 
  //  Se tiene que delegar el metodo subscribe de alguna forma para que este metodo se pueda
  //  suscribir a la pticion y devuelva un array de GiphyResponse por lo tanto
  //  no devuelve la respuesta mapeada. El servicio es el que se encarga de ofrecer los datos ya procesados o mapeados.
  //  
  //  Para devolver la respuesta mapeada desde el servicio se usan operadores de RXJS, en este caso el map().
  //  */
  onSearch(query: string) {
    this.gifsService.searchGifs(query)
    .subscribe( (resp) =>{
      this.resultSearch.set( resp );
    } )
  }

 }
