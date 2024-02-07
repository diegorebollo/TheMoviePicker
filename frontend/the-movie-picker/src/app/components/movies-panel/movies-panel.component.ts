import { Component } from '@angular/core';
import { MovieComponent } from '../movie/movie.component';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-movies-panel',
  standalone: true,
  imports: [MovieComponent, NgFor],
  templateUrl: './movies-panel.component.html',
  styleUrl: './movies-panel.component.css'
})
export class MoviesPanelComponent {
  movies!: object[];  
  text!: string;

  ngOnInit(){

    const moviesData: any = history.state.movies;
    
    const howManyOptions = 4;

    if (moviesData.length > howManyOptions){

      const movieList: any[] = [];        
      
      while(movieList.length < howManyOptions){
        const randomIndex = Math.floor(Math.random() * moviesData.length);

        if (!movieList.includes(moviesData[randomIndex])){
          movieList.push(moviesData[randomIndex]);
        }
      };

      this.movies = movieList;

    } else {
      this.movies = moviesData;
    }
    this.text = this.movies.length === 1 ? "Here's our recommendation" : 'Which movie poster do you prefer?';
  }

}
