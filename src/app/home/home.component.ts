import { Component, OnInit } from '@angular/core';
import {GameCard} from "../../model/game-component/game-card";
import {GameApiService} from "../services/game-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sort!:string
  public mySearch!:string


  private routeSub!: Subscription;
  private gameSub!: Subscription;

  constructor(private gameApiService: GameApiService,
              private router: Router,
              private activatedRoute: ActivatedRoute

  ) { }


  game:any = [];

  display:any

  myfunction(index:any){
    this.display = index + "a"
  }
  onEvent(event:any) {
    event.stopPropagation();
  }

  rand:number = Math.random() * (10000 - 1) + 1;

  cardId:string = "yolo" +this.rand;

  ngOnInit(): void {
    this.gameApiService.getGame("released").subscribe((game) => {
      this.game = game.results;
      console.log(this.game)

    })
  }
  searchGames(sort: string, search?: string): void {
    this.gameSub = this.gameApiService
      .getGame(sort, search)
      .subscribe((gameList: any) => {
        this.game = gameList.results;
        console.log(gameList);
      });
  }
  onSubmit(form: NgForm) {
    this.router.navigate(['search', form.value.search]);
  }
  openGameDetails(id: string): void {
    this.router.navigate(['details', id]);
  }

}
