import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-tabs',
  templateUrl: './game-tabs.component.html',
  styleUrls: ['./game-tabs.component.scss']
})
export class GameTabsComponent implements OnInit {

  @Input() game: any;

  menuList = ["About","Screenshots","Trailers"]
  selectedList :any = "About";

  openMenulist(menuList:any) {
    this.selectedList = menuList;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
