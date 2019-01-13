import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { RaceModel } from '../../race.model';
import { Store } from '@ngrx/store';
import * as PonyRacerActions from '../store/ponyracer.actions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  addPonyForm = false;
  races: RaceModel[] = [];
  //@Output() raceStarted = new EventEmitter<any>();
  @Output() newRace = new EventEmitter<any>();

  @Input() poniesAreAboutToFinish: BehaviorSubject<number>;
  @Input() raceLength: number;
  raceRuns: boolean = false;
  isNameValid: boolean = false;
  racesState: Observable<{races:RaceModel[]}>;

  private subscription: Subscription;
  constructor(private store: Store<{raceList: {races: RaceModel[]}}>) { }

  ngOnInit() {
    this.racesState = this.store.select("raceList");
  }

  addPony() {
    this.addPonyForm = true;
  }
  validateName(value: string) {
     this.racesState.pipe(
     tap(races => this.isNameValid = races.races.some(val => {
          return val.name === value
      })
     )
    ).subscribe();
  }
  onSubmit(f: NgForm) {
    this.raceLength = this.raceLength + 1;
    this.poniesAreAboutToFinish.next(this.raceLength);
    this.store.dispatch(new PonyRacerActions.AddPony(f.value.name))
    this.addPonyForm = false;
  }

  startRace() {
    this.store.dispatch(new PonyRacerActions.IsNewrace(false))
    this.newRace.emit(false);
    this.raceRuns = true;
    this.store.dispatch(new PonyRacerActions.StartRace())
    //this.raceStarted.emit(true);
  }

  toStart() {
    //this.raceStarted.emit(false);
    this.raceRuns = false;
    this.poniesAreAboutToFinish.next(this.raceLength);
    this.newRace.emit(true);
    this.store.dispatch(new PonyRacerActions.IsNewrace(true))
  }

  cancel() {
    this.addPonyForm = false;
  }
}
