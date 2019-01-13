import { Component, OnInit, OnDestroy } from '@angular/core';
import { RaceModel } from '../race.model';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit, OnDestroy {

  racesState: Observable<{races:RaceModel[]}>;
  public racesStartedEvent: any;
  public toStartPosition: any;
  public currentRaceResults: any;
  public raceResultsArr: Array<any> = [];

  raceLength: number;
  poniesAreAboutToFinish;
  private subscription: Subscription;
  constructor(private store: Store<{raceList: {races: RaceModel[]}}>) { }

  ngOnInit() {
    this.racesState = this.store.select("raceList");
    this.racesState.pipe(
    ).subscribe(races => { 
      this.raceLength = races.races.length;
      this.racesStartedEvent = races.raceStatus;
    })
    this.poniesAreAboutToFinish = new BehaviorSubject(3);
  }

  racesAreStarted(event: any) {
    this.raceResultsArr = [];
    this.racesStartedEvent = event;
  }

  toStartPos(event: any) {
    this.toStartPosition = event;
  }

  getCurrentRaceResults(event: any) {
    this.currentRaceResults = event;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
