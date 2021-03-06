import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {TeamsPage} from "../teams/teams";
import {EliteApi} from '../../shared/elite-api.service';

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {
  tournaments:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private eliteApi:EliteApi,
              private loadingController:LoadingController) {}

  ionViewDidLoad() {
    let loader=this.loadingController.create({
      content:'Getting tournaments...',
      spinner:'dots'
    });
    loader.present().then(()=>{
      this.eliteApi.getTournaments().subscribe(data=>{
        this.tournaments=data;
        loader.dismiss();        
      });
    })
    
  }

  itemTapped($event,tourney){
    this.navCtrl.push(TeamsPage,tourney);
  }

}
