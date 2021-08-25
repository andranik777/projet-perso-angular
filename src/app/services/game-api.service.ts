import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {map} from "rxjs/operators";

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


  getGameDetails(id: string): Observable<any> {
    const gameInfoRequest = this.httpClient.get(`https://api.rawg.io/api/games/${id}?key=c542e67aec3a4340908f9de9e86038af`);
    console.log(gameInfoRequest);
    const gameTrailersRequest = this.httpClient.get(
      `https://api.rawg.io/api/games/${id}/movies?key=c542e67aec3a4340908f9de9e86038af`
    );
    const gameScreenshotsRequest = this.httpClient.get(
      `https://api.rawg.io/api/games/${id}/screenshots?key=c542e67aec3a4340908f9de9e86038af`
    );

    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }


  getGameDetail(id:string): Observable <any>{
    const gameInfoRequest = this.httpClient.get(`https://api.rawg.io/api/games/${id}?key=c542e67aec3a4340908f9de9e86038af`);
    return gameInfoRequest
  }



}
