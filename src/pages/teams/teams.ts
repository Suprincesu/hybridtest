import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import * as _ from 'lodash';
import {TeamHomePage} from '../team-home/team-home';
import {EliteApi} from '../../shared/elite-api.service';

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  private allTeams:any;
  private allTeamDivisions:any;
  teams=[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private eliteApi:EliteApi,
              private loadingController:LoadingController) {
  }

  ionViewDidLoad() {
    let loader=this.loadingController.create({
      content:'Getting teams...',
      spinner:'dots'
    });
    loader.present().then(()=>{
      let selectedTourney=this.navParams.data;
      this.eliteApi.getTournamentData(selectedTourney.id).subscribe(data=>{
        this.allTeams=data.teams;
        this.allTeamDivisions=
            _.chain(data.teams)
            .groupBy('division')
            .toPairs()
            .map(item=>_.zipObject(['divisionName','divisionTeams'],item))
            .value();

        this.teams=this.allTeamDivisions;
        console.log(this.teams);
        loader.dismiss();
      })
    });
   
  }

  itemTapped($event,team){
    this.navCtrl.push(TeamHomePage,team);
  }
}
