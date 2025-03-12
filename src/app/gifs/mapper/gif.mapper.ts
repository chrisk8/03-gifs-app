import { Gif } from "../interfaces/gif.interface";
import { GifItem } from "../interfaces/giphy.interface";

//La funcion de este mapper es recibir el objeto de la respuesta de la peticion GET y devolver un objeto basado en la interfaz gif.interface
//Se declaran metodos estaticos ya que no se hara ninguna instancia de esos metodos
export class GifMapper {
    //Metodo para mapear una respuesta a la peticion GET y transformarla en un objeto de tipo Gif
    //Se recibe como argumento una response de tipo GifItem de la interfaz giphy.interface y devuelve un objeto de tipo Gif por lo tanto retorna un Gif
    // {
    //     id: string,
    //     title: string,
    //     url: string
    // }
    static mapGiphyResponseToGif( response: GifItem ):Gif {
        return {
            id: response.id,
            title: response.title,
            url: response.images.original.url,
        }
    }


    //Metodo para mappear un arreglo de tipo GifItem para devolver un array de objetos de tipo Gif
    //Recibe como parametro un arreglo de tipo GifItem 
    static mapGifItemsToGifArray( gifItems: GifItem[] ):Gif[] {
        //Se usa el metodo map() del array del argumento para aplicar la funcion mapGiphyResponseToGif a cada elemento
        //para devolver un arreglo con el resultado de la funcion
        // const gifs = gifItems.map( this.mapGiphyResponseToGif );
        // return gifs;

        return gifItems.map( this.mapGiphyResponseToGif );  //Return explicito

    }
}