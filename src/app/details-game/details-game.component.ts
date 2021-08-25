import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {GameApiService} from "../services/game-api.service";

@Component({
  selector: 'app-details-game',
  templateUrl: './details-game.component.html',
  styleUrls: ['./details-game.component.scss']
})
export class DetailsGameComponent implements OnInit {
  gameRating = 0;
  gameId!: string;
  game: any ;
  routeSub: Subscription | undefined;
  gameSub: Subscription | undefined;

  constructor(
    private  activatedRoute:ActivatedRoute,
    private httpService: GameApiService
  ) { }

  // avec activeatedRoute params on aplique un observable avec subscrape et on recupere les params
  // on doit utiliser activeted route


  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((param:Params)=>{
     this.gameId = param["id"];
     this.getGameDetails(this.gameId)
    })
  }

  /*
  * on utilise pour recuperer les données on fait un requette get en passent par httpClient
  * httpClient.get(url)
  * et on fait un subscribe
  * */

  getGameDetails(id: string): void {
    this.gameSub = this.httpService
      .getGameDetails(id)
      .subscribe((gameResp: any) => {
        this.game = gameResp;
        console.log(this.game)
      });
  }


  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }




}

/*
* // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();
*
*
*
* */

