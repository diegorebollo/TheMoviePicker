import { Component } from '@angular/core';
import { VgApiService, VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';

@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.css'
})
export class VideoplayerComponent {
  movieData!: any;
  movieURL!: any;
  vgHls!: string;
  api:VgApiService = new VgApiService;


  ngOnInit(){
    this.movieData = history.state.movie;
    this.movieURL = this.movieData.movieUrl.split(',')[2].split("b'")[1].split("'")[0];
    // this.movieURL = this.movieData.movieUrl.split(',')[0].split("'")[1];
    console.log(this.movieURL)
 };

  onPlayerReady(){
    console.log(this.api)   
    console.log('ddd') 
  }

  


}
