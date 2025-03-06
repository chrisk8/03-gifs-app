import { Component, signal } from '@angular/core';
import { GifsListComponent } from '../../components/gifs-list/gifs-list.component';

// const imageUrls: string[] = [
//   '"https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",',
//   './src/assets/skt5.jpg',
//   './src/assets/wdd1.jpg',
//   './src/assets/music4.jpg',
//   './src/assets/rubk3.jpg',
//   './src/assets/battery2.jpg',
//   './src/assets/rubk1.jpg',
//   './src/assets/skt2.jpg',
//   './src/assets/music5.jpg',
//   './src/assets/wdd3.jpg',
//   './src/assets/battery3.jpg',
//   './src/assets/skt3.jpg',
//   './src/assets/music2.jpg',
//   './src/assets/battery4.jpg',
//   './src/assets/music1.jpg',
//   './src/assets/skt4.jpg',
//   './src/assets/alon3.jpg',
//   './src/assets/wdd2.jpg',
//   './src/assets/music6.jpg',
//   './src/assets/alon1.jpg',
//   './src/assets/skt1.jpg',
//   './src/assets/battery1.jpg',
//   './src/assets/rubk2.jpg',
//   './src/assets/alon4.jpg',
//   './src/assets/music3.jpg',
//   './src/assets/alon2.jpg',
// ];
const imageUrls: string[] = [
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
];

@Component({
  selector: 'app-trending-page',
  imports: [
    GifsListComponent,
  ],
  templateUrl: './trending-page.component.html',

})
export default class TrendingPageComponent {
  listUrls = signal<string[]>( imageUrls );
}
