import { RaceModel } from 'src/app/race.model';
import * as PonyRacerActions from './ponyracer.actions';
export interface State {
    src: string;
    races: RaceModel[];
    raceStatus: boolean;
    raceCount: number;
    isNewrace: boolean;
  }
  
const initialState: State = {
    src: "https://www.clipartmax.com/png/small/1-13464_dtrace-pony-created-by-general-zois-pony-creator-dtrace-cute-pony-shot.png",
    races: [
        new RaceModel("Zheka", 0, "https://www.clipartmax.com/png/small/1-13464_dtrace-pony-created-by-general-zois-pony-creator-dtrace-cute-pony-shot.png"),
        new RaceModel("Pipa", 0, "https://www.clipartmax.com/png/small/1-13464_dtrace-pony-created-by-general-zois-pony-creator-dtrace-cute-pony-shot.png"),
        new RaceModel("Puppa", 0, "https://www.clipartmax.com/png/small/1-13464_dtrace-pony-created-by-general-zois-pony-creator-dtrace-cute-pony-shot.png")
      ],
    raceStatus: false,
    raceCount: 0,
    isNewrace: false
}

export function ponyRacerReducer(state = initialState, action: PonyRacerActions.PonyRacerActions) {
    switch(action.type) {
        case PonyRacerActions.ADD_PONY:
            const newPony = new RaceModel(action.payload, 0, state.src);
            return {
                ...state,
                races: [...state.races, newPony]
            }
        case PonyRacerActions.DELETE_PONY:
            state.races.splice(action.payload, 1);
            state.races.slice();
            return {
                ...state,
                races: state.races
            }
        case PonyRacerActions.UPDATE_RACESCORE:
            const name = action.payload.name;
            const scores = action.payload.newScore;
            for(let race of state.races) {
                if(race.name === name) race.scores = scores;
            }
            return {
                ...state,
                races: state.races
            }
        case PonyRacerActions.RESET_SCORES:
            for(let race of state.races) {
                race.scores = 0;
            }
            state.raceCount = 0;
            return {
                ...state,
                races: state.races
            }
        case PonyRacerActions.START_RACE:
            state.raceStatus = true;
            state.raceCount++;
            return {
                ...state,
                races: state.races
            }
        case PonyRacerActions.STOP_RACE:
            state.raceStatus = false;
            return {
                ...state,
                races: state.races
            }
        case PonyRacerActions.IS_NEWRACE:
            state.isNewrace = action.payload;
            return {
                ...state,
                races: state.races
            }
        default:
            return state;
    }
}

