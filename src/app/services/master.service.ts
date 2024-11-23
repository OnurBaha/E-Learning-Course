import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, Login, User } from '../model/master.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }

  apiUrl: string = "https://projectapi.gerasim.in/api/OnlineLearning/";

  getAllCourse(): Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${this.apiUrl}GetAllCourse`)
  }

  getCourseVideosbyCourseId(id:number): Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${this.apiUrl}GetCourseVideosbyCourseId?courseId=${id}`)
  }

  addNewUser(obj:User): Observable<IApiResponse>{
    return this.http.post<IApiResponse>(`${this.apiUrl}AddNewUser`, obj)
  }

  onLogin(obj:Login): Observable<IApiResponse>{
    return this.http.post<IApiResponse>(`${this.apiUrl}login`, obj)
  }

}
