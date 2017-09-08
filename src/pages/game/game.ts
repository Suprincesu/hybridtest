import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../shared/elite-api.service';
import { TeamHomePage } from '../team-home/team-home';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  game:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private eliteApi:EliteApi) {
              this.game=this.navParams.data;
  }

  ionViewDidLoad() {
  }

  teamTapped(teamId){
    let tourneyData=this.eliteApi.getCurrentTourney();
    let team=tourneyData.teams.find(t=>t.id===teamId);
    this.navCtrl.push(TeamHomePage,team);
  }
}
