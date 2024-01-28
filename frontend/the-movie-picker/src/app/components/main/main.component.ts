import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { QuestionsPanelComponent } from '../questions-panel/questions-panel.component';
import { RouterOutlet, RouterLinkActive, RouterLink, Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, QuestionsPanelComponent, RouterOutlet, RouterLinkActive, RouterLink, NgClass],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  currentUrl!: string;
  
  router = inject(Router);

  ngOnInit() { 
    this.currentUrl = this.router.url;
    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart)
    ).subscribe((event) => {
      this.currentUrl = (event as NavigationStart).url
    });
  };    
};
