import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {TournamentsPage} from '../tournaments/tournaments';
import {EliteApi} from '../../shared/elite-api.service';
import {TeamHomePage} from '../team-home/team-home';

@IonicPage()
@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {
  favorites=[
    {
      team:{id:6182,name:'HC Elite 7th',coach:'Michelotti'},
      tournamentId:'89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
      tournamentName:'March Madness Tournament',
      division:'HC Elite 7th'
    },
    {
      team:{id:805,name:'HC Elite',coach:'Michelotti'},
      tournamentId:'98c6857e-b0d1-4295-b89e-2d95a45437f2',
      tournamentName:'Holiday Hoops Challenge',
      division:'HC Elite'
    }
  ]

  constructor(private navCtrl: NavController,
              public navParams: NavParams,
              private loadingController:LoadingController,
              private eliteApi:EliteApi) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamsPage');
  }

  goToTournaments(){
    this.navCtrl.push(TournamentsPage);
  }

  favoriteTapped($event,favorite){
    let loader=this.loadingController.create({
      content:'Getting data...',
      spinner:'dots'
    });
    loader.present().then(()=>{
      this.eliteApi.getTournamentData(favorite.tournamentId).subscribe(t=>{
        this.navCtrl.push(TeamHomePage,favorite.team)
        loader.dismiss();
      });
    });

  }
}
