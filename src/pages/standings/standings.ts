import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';
import {EliteApi} from '../../shared/elite-api.service';

@IonicPage()
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {
  allStandings:any[];
  standings:any[];
  team:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private eliteApi:EliteApi) {
              this.team=this.navParams.data;  
              }

  ionViewDidLoad() {
    let tourneyData=this.eliteApi.getCurrentTourney();
    this.standings=tourneyData.standings;

    this.allStandings=
        _.chain(this.standings)
        .groupBy('division')
        .toPairs()
        .map(item=>_.zipObject(['divisionName','divisionStandings'],item))
        .value();
  }

}
