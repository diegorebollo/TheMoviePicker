import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Question } from '../interfaces/question';
@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  mainUrl = 'https://api.drebollo.com/api'

  constructor(private http: HttpClient) {};
  
  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.mainUrl}/questions`) 
  }

  sendData(data: any): Observable<any> {
    return this.http.post<any>(`${this.mainUrl}/result`, data);
  }
};


