import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, SimpleChanges, Output, EventEmitter, HostListener } from '@angular/core';
import { RaceModel } from '../../race.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as PonyRacerActions from '../store/ponyracer.actions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'pr-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit, OnChanges {
  @ViewChild("raceFinish") raceFinishEl: ElementRef;
  finishElOffset: number;
  @Input() race: RaceModel;
  @Input() index: number;
  @Input() event: any;
  @Input() poniesAreAboutToFinish: BehaviorSubject<number>;
  @Input() startPos: any;
  @Input() raceLength: number;
  @Input() raceResults;// = new EventEmitter<any>();
  run: string = "0px";
  randomTop: string = "0px";
  initialState: number = 0;
  interval;
  randomColor: string;
  @Input() raceResultsArr: Array<any>;
  racesState: Observable<{races:RaceModel[]}>;

  constructor(private store: Store<{raceList: {races: RaceModel[]}}>) {

  }
  private randomColorBorder() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return `10px solid ${color}`;
  }

  private ordinalIndicator(place: number) {
    return place === 1 ? "st" : place === 2 ? "nd" : place === 3 ? "rd" : "th"
  }

  ngOnInit() {
    this.randomColor = this.randomColorBorder();
    this.finishElOffset = this.raceFinishEl.nativeElement.offsetWidth - this.raceFinishEl.nativeElement.childNodes[0].clientWidth;
    this.racesState = this.store.select("raceList");
    this.racesState.pipe(
      tap(races => {
        if(races.raceStatus) this.movePony();
      })
    ).subscribe()
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes.event && changes.event.currentValue) this.movePony();
    if(changes.startPos && changes.startPos.currentValue) this.run = "0px";
  }

  changeOrientation($event) {
    setTimeout(()=> {
      this.finishElOffset = this.raceFinishEl.nativeElement.offsetWidth - this.raceFinishEl.nativeElement.childNodes[0].clientWidth;
    }, 100);
  }

  trackFinishedPonies() {
    const newValue = this.poniesAreAboutToFinish.value - 1;
    this.poniesAreAboutToFinish.next(newValue);
  }
  movePony() {
    this.interval = setInterval(()=> {
    const incr = this.initialState += Math.floor(Math.random() * 30);
    this.run = `${incr}px`;
    const rTop = Math.floor(Math.random()*3) > 1 ? 2 : -2;
    this.randomTop = `${rTop}px`;
    if(incr >= this.finishElOffset) {
      this.trackFinishedPonies();
      
      const place = this.raceLength - this.poniesAreAboutToFinish.value;
      const points = place === 1 ? 3 : place === 2 ? 2 : place === 3 ? 1 : 0;
      
      console.log(`${this.race.name} finishes ${place}${this.ordinalIndicator(place)}  and gets ${points} point(s)`);
        clearInterval(this.interval);
        this.initialState = 0;
        const name = this.race.name;
        const newScore = this.race.scores + points;
        this.store.dispatch(new PonyRacerActions.UpdateRaceScore({name, newScore}));
        this.raceResultsArr.push({"name":this.race.name, place, points});
      }
    }, 50);
  }
  removeRace(index: number) {
    console.log(index)
    this.store.dispatch(new PonyRacerActions.DeletePony(index));
    this.raceLength = this.raceLength - 1;
    this.poniesAreAboutToFinish.next(this.raceLength);
  }
}
