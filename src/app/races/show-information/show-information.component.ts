import { Component, OnInit, Input } from '@angular/core';
import { RaceModel } from 'src/app/race.model';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as PonyRacerActions from '../store/ponyracer.actions';
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-show-information',
  templateUrl: './show-information.component.html',
  styleUrls: ['./show-information.component.css']
})
export class ShowInformationComponent implements OnInit {
  @Input() raceLength: number;
  @Input() raceResults;
  @Input() raceResultsArr;
  races: RaceModel[];
  racesState: Observable<{races:RaceModel[]}>;
  raceCount: number;
  private subscription: Subscription;

  ordinalIndicator(place: number) {
    return place === 1 ? "st" : place === 2 ? "nd" : place === 3 ? "rd" : "th"
  }
  constructor(private store: Store<{raceList: {races: RaceModel[]}}>) { }

  ngOnInit() {
    this.racesState = this.store.select("raceList");
    this.racesState.pipe(
      tap(races => {
        
        return races.races.sort((a,b)=> b.scores-a.scores)
      })
    ).subscribe(result => {
      console.log("RRR ", result)
      this.raceCount = result.raceCount
    })
  }

  reset() {
    this.store.dispatch(new PonyRacerActions.ResetScores())
    this.raceCount = 0;
  }
}
