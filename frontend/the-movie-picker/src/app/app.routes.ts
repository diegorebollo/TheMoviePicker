import { Routes } from '@angular/router';
import { QuestionsPanelComponent } from './components/questions-panel/questions-panel.component';
import { MoviesPanelComponent } from './components/movies-panel/movies-panel.component';
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
export const routes: Routes = [
    {path: '', component: MainComponent, children: [
        { path: '',
         component: HeaderComponent
        }, {
            path: 'questions',
            component: QuestionsPanelComponent
        }, {
            path: 'movies',
            component: MoviesPanelComponent
        }, {
            path: 'player',
            component: VideoplayerComponent
            
        }]},
];
