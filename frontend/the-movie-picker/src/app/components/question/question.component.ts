import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {
  @Input() text!: string;
  @Input() optionName!: string;
  @Output() optionChosen = new EventEmitter<object>();


  onClick(){
    this.optionChosen.emit({optionName: this.optionName, optionChosen: this.text});
  };

};


