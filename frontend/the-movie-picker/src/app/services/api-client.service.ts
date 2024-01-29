import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Question } from '../interfaces/question';
@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  mainUrl = 'http://127.0.0.1:3000/api'

  constructor(private http: HttpClient) {};
  
  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.mainUrl}/questions`) 
  }
};
