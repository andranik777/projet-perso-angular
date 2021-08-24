import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameApiService {

  static urlGame = 'https://api.rawg.io/api/games?key=c542e67aec3a4340908f9de9e86038af';


  constructor(private httpClient: HttpClient) { }

  getGame(
    page:number,
    ordering: string,
    platform:string,
    search?: string,
  ): Observable<any> {

    let params = new HttpParams().set('ordering', ordering).set('parent_platforms', platform).set('page', page);
    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search).set('parent_platforms', platform).set('page', page);
      console.log(params)

    }

    return this.httpClient.get<any>(GameApiService.urlGame,{params:params,
    });
  }

}
