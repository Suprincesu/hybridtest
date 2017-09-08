import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import 'rxjs';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EliteApi{
    private baseurl='https://elite-schedule-app-i2-f5de9.firebaseio.com';
    currentTourney;any={};

    constructor(private http:Http){
    }

    getTournaments(){
        return new Promise(resolve=>{
            this.http.get(`${this.baseurl}/tournaments.json`)
                .subscribe(res=>resolve(res.json()));
        })
    }

    getTournamentData(tourneyId):Observable<any>{
        return this.http.get(`${this.baseurl}/tournaments-data/${tourneyId}.json`)
                    .map((response:Response)=>{
                        this.currentTourney=response.json();
                        return this.currentTourney;
                    });
    }

    getCurrentTourney(){
        return this.currentTourney;
    }
}