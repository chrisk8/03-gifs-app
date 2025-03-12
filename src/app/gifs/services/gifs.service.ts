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
  gifsOnTrending = signal<Gif[]>( [] );

  //Señal para indicar la carga de la data en true
  gifsOnTrendingLoad = signal( true )


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
      const gifs = GifMapper.mapGifItemsToGifArray( resp.data );
      
      console.log( {gifs} );  
      //Se setea la respuesta mapeada a la señal gifsOnTrending
      this.gifsOnTrending.set( gifs );

      //se pasa a false la señal que indica la carga de los gifs ya que en este punto ya esta cagada en gifsOnTrending
      this.gifsOnTrendingLoad.set( false );

    });
  }



}
