//Se crea esta interfaz para definir solo los datos que se necesitan de un gif con base en la GifsResponse
//La GIfResponse tiene demasiada informacion que no se usara dentro del flujo de la aplicacion por lo que se necesita mapear los campos que se requieren
export interface Gif {
    id: string,
    title: string,
    url: string
}