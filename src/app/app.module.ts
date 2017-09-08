import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MyTeamsPage } from '../pages/my-teams/my-teams';
import { ListPage } from '../pages/list/list';
import {TournamentsPage} from '../pages/tournaments/tournaments';
import {TeamsPage} from '../pages/teams/teams';
import {TeamDetailPage} from '../pages/team-detail/team-detail';
import {TeamHomePage} from '../pages/team-home/team-home';
import {StandingsPage} from '../pages/standings/standings';
import {GamePage} from '../pages/game/game';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {EliteApi} from '../shared/elite-api.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MyTeamsPage,
    TournamentsPage,
    TeamsPage,
    TeamDetailPage,
    TeamHomePage,
    GamePage,
    StandingsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MyTeamsPage,
    TournamentsPage,
    TeamsPage,
    TeamDetailPage,
    TeamHomePage,
    StandingsPage,
    GamePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EliteApi,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
