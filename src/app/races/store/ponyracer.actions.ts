import { Action } from '@ngrx/store';

export const ADD_PONY = "ADD_PONY";
export const DELETE_PONY = "DELETE_PONY";
export const UPDATE_RACESCORE = "UPDATE_RACESCORE";
export const SORT_RACES = "SORT_RACES";
export const RESET_SCORES = "RESET_SCORES";
export const START_RACE = "START_RACE";
export const STOP_RACE = "STOP_RACE";
export const IS_NEWRACE = "IS_NEWRACE"; 

export class AddPony implements Action {
    readonly type = ADD_PONY;
    constructor(public payload: string) {}
}

export class DeletePony implements Action {
    readonly type = DELETE_PONY;
    constructor(public payload: number) {}
}

export class UpdateRaceScore implements Action {
    readonly type = UPDATE_RACESCORE;
    constructor(public payload: {name: string, newScore: number}) {}
}

export class ResetScores implements Action {
    readonly type = RESET_SCORES;
}

export class StartRace implements Action {
    readonly type = START_RACE;
}

export class StopRace implements Action {
    readonly type = STOP_RACE;
}

export class IsNewrace implements Action {
    readonly type = IS_NEWRACE;
    constructor(public payload: boolean) {}
}

export type PonyRacerActions = 
    AddPony |
    DeletePony |
    UpdateRaceScore |
    ResetScores |
    StartRace |
    StopRace |
    IsNewrace