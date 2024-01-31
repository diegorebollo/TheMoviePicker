import { Component, Input, inject } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  @Input() movie!: any;

  router = inject(Router);

  onClick(movie: any){

    const navigationExtras: NavigationExtras = {
      state: {movie: movie},
    }; 
    
    this.router.navigate(['/player'], navigationExtras);   

  }  

}
