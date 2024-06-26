import { Component, inject } from '@angular/core';
import { QuestionComponent } from '../question/question.component';
import { Question } from '../../interfaces/question';
import { ApiClientService } from '../../services/api-client.service';
import { NgFor } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-questions-panel',
  standalone: true,
  imports: [QuestionComponent, NgFor],
  providers: [ApiClientService],
  templateUrl: './questions-panel.component.html',
  styleUrl: './questions-panel.component.css'
})
export class QuestionsPanelComponent {

  numberOfQuestion!: number;
  allQuestions!: Question[];
  
  questionTitle!: string;  
  questionOptions: {optionName: string, options: any} = {optionName: '', options: []} ;

  optionsChosen: object[] = [];

  isSend = false;

  apiClient = inject(ApiClientService);
  router = inject(Router);

  ngOnInit(){       
    this.apiClient.getAllQuestions().subscribe(e => {
      this.allQuestions = e;
      this.allQuestions.map(e => {
        if (typeof e.options === 'string'){
          e.options = e.options.split(',').map(e => e.trim());          
        }
        this.numberOfQuestion = 0;
      });       
    });
  }; 
  
  ngDoCheck(){

    if (this.numberOfQuestion >= 0 && this.numberOfQuestion < this.allQuestions.length){       
      this.questionTitle = this.allQuestions[this.numberOfQuestion].title;
    };

    if(this.numberOfQuestion >= 0 && this.numberOfQuestion === this.allQuestions.length - 1){

      const randomOptions: string | string[] = [];
      const howManyOptions = 4

      while (randomOptions.length < howManyOptions) {
        const randomIndex = Math.floor(Math.random() * this.allQuestions[this.numberOfQuestion].options.length);
        const randomGenere = this.allQuestions[this.numberOfQuestion].options[randomIndex];

        if (!randomOptions.includes(randomGenere)){
          randomOptions.push(randomGenere);
        }
        
      }
      this.questionOptions = {optionName: this.allQuestions[this.numberOfQuestion].optionName, options: randomOptions};             


    } else if (this.numberOfQuestion >= 0 && this.numberOfQuestion < this.allQuestions.length) {
      this.questionOptions = {optionName: this.allQuestions[this.numberOfQuestion].optionName, options: this.allQuestions[this.numberOfQuestion].options}
    } 


   
  };

  addOptionChosen(optionChosen: object){
    this.optionsChosen.push(optionChosen);

    if(!this.isSend && this.numberOfQuestion >= 0 && this.numberOfQuestion >= this.allQuestions.length - 1 ){
      this.isSend = true;
      this.apiClient.sendData(this.optionsChosen).subscribe((response) => {

        const navigationExtras: NavigationExtras = {
          state: {movies: response},
        };  

        this.router.navigate(['/movies'], navigationExtras);    
      });     
   
    };
    this.numberOfQuestion ++;
  };

};
