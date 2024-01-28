import { Component } from '@angular/core';
import { QuestionComponent } from '../question/question.component';
@Component({
  selector: 'app-questions-panel',
  standalone: true,
  imports: [QuestionComponent],
  templateUrl: './questions-panel.component.html',
  styleUrl: './questions-panel.component.css'
})
export class QuestionsPanelComponent {

}
