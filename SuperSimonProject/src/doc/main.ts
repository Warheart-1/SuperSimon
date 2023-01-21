import * as Tone from 'tone';

export type button = {
    color: string;
    tone: string;
   }

export interface ISuperSimon {
    buttons: button[];
    buttonStart: string;
    sequence: string[];
    lastSequence: string[];
    speed: number;
    _synth: Tone.Synth;
    itteration: number;
    numberOfClick: number;
    init(): void;
    playSequence(): void;
    playButton(color: string): void;
    addNextButton(): void;
    buttonClicked(color: string): void;
    showScore(): void;
    gameOver(): void;
    showNumberClick(): void;
}

export interface IModal {
    _modal: HTMLDivElement;
    _modalContent: HTMLDivElement;
    openModal(): void;
    closeModal(): void;
}