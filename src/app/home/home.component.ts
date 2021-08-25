import {Component, Input, OnInit} from '@angular/core';
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
  public sort:string ="relevance"
  public mySearch!:string
  public selectValue:string ="released"
  public platform:string = "1"
  public page:number =1;


  private routeSub!: Subscription;
  private gameSub!: Subscription;

  constructor(private gameApiService: GameApiService,
              private router: Router,
              private activatedRoute: ActivatedRoute

  ) { }

  change_page(page:number){
      return this.page++
  }

  game:any = [];

  display:any

  myfunction(index:any){
    this.display = index + "a"
  }
  onEvent(event:any) {
    event.stopPropagation();
  }



  ngOnInit(): void {
    this.gameApiService.getGame(1,"-added","1").subscribe((game) => {
      this.game = game.results;
      console.log(this.game)

    })
  }
  searchGames(page:number,sort: string, platform:string, search?: string,): void {
    this.gameSub = this.gameApiService
      .getGame(page,sort,platform, search)
      .subscribe((gameList: any) => {
          this.game =gameList.results;
          console.log("elo")

      });

    console.log(this.game)

  }

  moreGame(page:number,sort: string, platform:string, search?: string,): void {
    this.gameSub = this.gameApiService
      .getGame(page,sort,platform, search)
      .subscribe((gameList: any) => {
        this.game.push(...gameList.results)

      });
  }

  onSubmit(form: NgForm) {
    if(form.value.search){
      this.router.navigate(["game",{'search': form.value.search},{"ordering":form.value.sort}]);
    }
    else {
      this.router.navigate(["game",form.value.sort]);

    }
    console.log(form.value)
  }
  openGameDetails(id: string): void {
    this.router.navigate(['details', id]);
  }


  changement(evenement:any) {
    //Evenement contient l'évènement transmis, on peut accéder à la donnée sélectionnée en manipulant l'attribut target
    var objet = evenement.target.data;
    console.log(evenement)
  }

  changi(elo:string){
    console.log(elo)
  }

  bookTitle!:string

}
