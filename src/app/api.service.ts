import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService 
{

  userData=[]

  constructor(private http: HttpClient) { }


  getUser(){
    let searchParams = new HttpParams();
    // searchParams=searchParams.append('page','1')
    // searchParams=searchParams.append('limit','50')
    searchParams= searchParams.append('created','1')
    let httpheader = new HttpHeaders({
      'content-type': 'application/json',
      'app-id': '62f0ea8119f004633cfdb23c'
    })
    return this.http.get<any>("https://dummyapi.io/data/v1/user",{headers : httpheader,params:searchParams})
  }

  postUser(data:any){
    
    let httpheader = new HttpHeaders({
      'content-type':'application/json',
      'app-id':'62f0ea8119f004633cfdb23c'
    })
    return this.http.post<any>("https://dummyapi.io/data/v1/user/create/",data,{headers:httpheader})
  }

  putUser(data:any,id:number){
    let httpheader = new HttpHeaders({
      'content-type':'application/json',
      'app-id':'62f0ea8119f004633cfdb23c'
    })
    return this.http.put<any>("https://dummyapi.io/data/v1/user/"+id,data,{headers:httpheader})
  }

  deleteUser(id:number){
    let httpheader = new HttpHeaders({
      'content-type':'application/json',
      'app-id':'62f0ea8119f004633cfdb23c'
    })
    return this.http.delete<any>("https://dummyapi.io/data/v1/user/"+id,{headers:httpheader})
  }
}
