import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {GamePage} from '../game/game'

import * as _ from 'lodash';
import * as moment from 'moment';
import {EliteApi} from '../../shared/elite-api.service';


@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  allGames:any[];
  dateFilter:string;
  games:any[];
  team:any;
  teamStanding:any;
  wins:any;
  losses:any;
  coach:any;
  useDateFilter=false;
  private tourneyData:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private eliteApi:EliteApi) {}

  ionViewDidLoad() {
  this.team=this.navParams.data;
  this.tourneyData=this.eliteApi.getCurrentTourney();

  this.games=_.chain(this.tourneyData.games)
              .filter(g=>g.team1Id===this.team.id || g.team2Id === this.team.id)
              .map(g=>{
                let isTeam1=(g.team1Id===this.team.id);
                let opponentName=isTeam1 ? g.team2:g.team1;
                let scoreDisplay=this.getScoreDisplay(isTeam1,g.team1Score,g.team2Score)
                return {
                  gameId:g.id,
                  opponent:opponentName,
                  time:Date.parse(g.time),
                  location:g.location,
                  locationUrl:g.locationUrl,
                  scoreDisplay:scoreDisplay,
                  homeAway:(isTeam1 ? "vs.":"at")
                };
              }).value();
    this.allGames=this.games;
    this.teamStanding=_.find(this.tourneyData.standings,{'teamId':this.team.id});
    this.wins=this.teamStanding.wins;
    this.losses=this.teamStanding.losses;
    this.coach=this.team.coach;
  }

  getScoreDisplay(isTeam1,team1Score,team2Score){
    if(team1Score && team2Score){
      var teamScore=(isTeam1 ? team1Score:team2Score);
      var opponentScore=(isTeam1 ? team2Score:team1Score);
      var winIndicator=teamScore>opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" +opponentScore;
    }else{
      return "";
    }
  }

  gameClick($event,game){
    let sourceGame=this.tourneyData.games.find(g=>g.id===game.gameId);
    this.navCtrl.parent.parent.push(GamePage,sourceGame);
  }

  dateChanged(){
    this.games=_.filter(this.allGames,g=>moment(g.time).isSame(this.dateFilter,'day'));
  }
}
