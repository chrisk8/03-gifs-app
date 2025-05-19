//**Este servicio es inyectado en 
//    tending-page.component
//
// Para poder realizar peticiones HTTP, se hace una injeccion de depndencias
// de HttpClient
// HttpClient es un objeto que permite hacer peticiones [get, post, put, delete, patch, create]
//  - get devuelve un OBSERVABLE<Object> de tipo Object que indica que un obejto estan emitiendo valores y se necesita estar pendiente de esos valores
//    en este caso se hace el tipado estricto para que el OBSERVABLE sea de tipo GiphyResponse
// En Angular se necesita definir el funcionamiento del httpCliebt y se necesita proveer el servicio de manera global
// Para provver el servicio, se configura el archivo app.config.ts y se agrega 
//
//
// El metodo loadTrendingGifs hace una peticion GET a la URL
//https://api.giphy.com/v1/gifs/trending?api_key=tqVDo4v5dN8Bky1coZxJfPSdoD6jojF8&limit=25&offset=0&rating=g&bundle=messaging_non_clips
//  - https://api.giphy.com - Se toma de las variables de entorno (apiUrl)
//  - /v1/gifs/trending     - Se concatena al argumento del metodo get
//  - Los query params se inician con una , y es un objeto, cada propiedad es un parametro
//  - ?api_key=tqVDo4v5dN8Bky1coZxJfPSdoD6jojF8 - queryParams de consulta
//    &limit=25
//    &offset=0
//    &rating=g
//
// Para poder manipular la informacion de la respuesta del API, al momento de hcer la peticion, esta no se dispara hasta que no se SUSCRIBAN a esa peticion.
// el metodo subcribe recibe una funcion callback para obtener la respuesta
//  */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor() {
    //Cuando se cree una instancia de GifsService se hara la peticion GET para obtener la data
    this.loadTrendingGifs();
  }

  //Aqui se inyecta la dependencia del providerHttpClient del app.config.ts
  private http = inject(HttpClient);

  //Señal para mappear la respuesta a un arreglo de <Gif>
  gifsOnTrending = signal<Gif[]>([]);

  //Señal para indicar la carga de la data en true
  gifsOnTrendingLoad = signal(true)


  //Metodo que realiza una peticion HTTP a la API de Giphy para obtener el trending de Gifs
  loadTrendingGifs() {

    //Se realiza una peticion de tipo GET
    this.http.get<GiphyResponse>(`${environment.apiUrl}/v1/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 50
      }
    }).subscribe((resp) => {
      // console.log(resp);    TODO el Objeto de respuesta de la peticion

      //Constante para almacenar la respuesta mapeada a tipo GIF
      const gifs = GifMapper.mapGifItemsToGifArray(resp.data);

      console.log({ gifs });
      //Se setea la respuesta mapeada a la señal gifsOnTrending
      this.gifsOnTrending.set(gifs);

      //se pasa a false la señal que indica la carga de los gifs ya que en este punto ya esta cagada en gifsOnTrending
      this.gifsOnTrendingLoad.set(false);

    });
  }


  //Metodo para buscar GIFs por parametro 
  searchGifs(query: string) {
    return this.http.get<GiphyResponse>(`${environment.apiUrl}/v1/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        q: query,
        limit: 50
      }

      //** En lugar se suscribirse a la peticion en este metodo, se hace desde el componente
      //   Pero el componente no recibe la respuesta mapeada, recibe toda la respuesta de la peticion.
      // El servicio es el que se encarga de proveer los datos ya procesados.
      // Para devolver la respuesta ya mapeada en este metodo, se usan operadores RXJS.
      // 
      // Estos operadores se encadenan medainate el metodo pipe() que permite encadenar
      // ciertas funcionalidades de un observable.
      // Cuando se hace la peticion, pasa por el piepe() y luego por el tap() y procesa lo que este definido
      //    tap( ()=>{} ) para disparar un efecto secundario. Map no hace transformaciones
      //    map( ()=>{} ) para emitir un valor transformado, recorre cada elemento de la respuesta y devuelve el valor transofrmado segun la funcion 
      //
      // 
      //  */

    }).pipe(
      // tap( (resp) => { console.log( 'tap1: ', resp ) } )
      // Para desestructurar la respuesta y solo tomar la data del objeto resp -> ({ data })
      // Este map regresa el array de la data de la respuesta HTTP (resp.data)
      map( ( {data} )=>
        data
        //console.log( 'Map:' , data );
     ),

      // Este map toma el array de la data y lo transforma a un arreglo de tipo GIF[] 
      map( (items) =>
        GifMapper.mapGifItemsToGifArray(items)
       ),
    );
    //**Se comenta este bloque de codigo para delegar esta tarea al search-page.component y retornar explicitamente 
    //  el observable de la peticion para que se suscriba y pueda disparar la peticion.
    //*
    // .subscribe((resp) => {  
    //   const gifs = GifMapper.mapGifItemsToGifArray(resp.data);
    //   console.log({ gifs });
    // });
    //
    //*
  }



}
