export class RaceModel {
    public name: string;
    public scores: number;
    public src: string;

    constructor(name: string, scores: number, src: string) {
        this.name = name;
        this.scores = scores;
        this.src = src;
    }
}
