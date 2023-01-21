import * as Tone from 'tone';
import { ISuperSimon, button } from '../doc/main';
import { Modal } from './modal';

export class SuperSimon implements ISuperSimon {
    public buttons : button[] = [
      {color: 'red', tone: "C4"},
      {color: 'blue', tone: "D4"},
      {color: 'green', tone: "E4"},
      {color: 'yellow', tone: "F4"},
    ];
  
    public buttonStart: string = 'start';

    public speed = 2500;
    public sequence = Array<string>();
    public lastSequence = Array<string>();
    public _synth : Tone.Synth<Tone.SynthOptions>;
    public itteration = 0;
    public numberOfClick = 0;
    private _score : HTMLTitleElement;
    private _numberClick : HTMLTitleElement;
    private _turn : HTMLTitleElement;
    
    public constructor(synth : Tone.Synth<Tone.SynthOptions>) {
      this.buttons.forEach(button => {
        document.getElementById(button.color)?.addEventListener('click', () => {
          this.buttonClicked(button.color);
        });
      });
      document.getElementById(this.buttonStart)?.addEventListener('click', (e : MouseEvent) => {
        (e.target as HTMLButtonElement).disabled = true;
        this.init();
      });
      this._score = document.getElementById('score-value') as HTMLTitleElement;
      this._numberClick = document.getElementById('number-click') as HTMLTitleElement;
      this._turn = document.getElementById('turn') as HTMLTitleElement;
      this._synth = synth;
    }
  
    public init() {
      const numberOfExercises = Math.floor(Math.random() * 1) + 1;
      if(this.lastSequence.length > 0) {
        this.sequence.push(...this.lastSequence);
        this.lastSequence = [];
      }
      for (let i = 0; i < numberOfExercises; i++) {
        this.addNextButton();
      }
      if(this.sequence.length > 0) {
        this.playSequence();
      }
      console.log(this.sequence);
      console.log(numberOfExercises)
    }
  
    public addNextButton() {
      const randomIndex = Math.floor(Math.random() * this.buttons.length);
      this.sequence.push(this.buttons[randomIndex].color);
    }
  
    public playSequence() {
      this._turn.innerHTML = `Please watch the sequence...`;
      this.buttons.forEach(button => {
        (document.getElementById(button.color) as HTMLButtonElement).disabled = true;
      });
      this.sequence.forEach((button, index) => {
        setTimeout(() => {
          this.playButton(button);
        }, this.speed * index);
      });
      setTimeout(() => {
        this.buttons.forEach(button => {
          (document.getElementById(button.color) as HTMLButtonElement).disabled = false;
        });
        this._turn.innerHTML = `Your turn!`;
      } , this.speed * this.sequence.length);
    }
  
    public playSound(button: string) {
      const buttonElement = this.buttons.find(b => b.color === button);
      if (buttonElement) {
        this._synth.triggerAttackRelease(buttonElement.tone, "8n");
      }
    }
  
    public playButton(button: string) {
      const buttonElement = document.getElementById(button);
      if (buttonElement) {
        this.playSound(button);
        buttonElement.classList.add(`${button}-active`);
        setTimeout(() => {
          buttonElement.classList.remove(`${button}-active`);
        }, this.speed-100);
      }
    }
  
    public buttonClicked(button: string) {
      if (this.sequence.length > 0) {
        if (button === this.sequence[0]) {
          this.numberOfClick++;
          this.playSound(button);
          this.showNumberClick();
          this.lastSequence.push(button);
          this.sequence.shift();
          if (this.sequence.length === 0) {
            this.itteration++;
            this.showScore();
            if (this.speed > 500) {
              this.speed -= 500;
            } 
            if(this.speed <= 500 && this.speed > 250) {
                this.speed -= 50;
            }
            let delay = 0;
            if(this.speed <= 500) {
                delay = 250;
            }
            if(this.speed > 500) {
                delay = 500;
            }
            setTimeout(() => {
              this.init();
            }, delay);
          }
        } else {
          this.gameOver();
        }
      }
    }

    public showNumberClick() {
        this._numberClick.textContent = `Number of click : ${this.numberOfClick}`;
    }

    public showScore() {
        this._score.textContent = `Score : ${this.itteration}`;
    }

    public finalScore() : string
    {
        return `<h1>Game Over</h1>
                <p>Score : ${this.itteration}</p>
                <p>Number of click : ${this.numberOfClick}</p>
                <p>Speed : ${this.speed} ms</p>`
    }
    
    public gameOver() {
      this._turn.innerHTML = `Game Over!`;
      const modal = new Modal(document.getElementById('myModal') as HTMLDivElement, document.getElementById('modal-content') as HTMLParagraphElement);
      modal.openModal(this.finalScore());
      this.sequence = [];
      this.lastSequence = [];
      this.itteration = 0;
      this.numberOfClick = 0;
      this.speed = 2500;
      this.showScore();
      this.showNumberClick();
      const buttonStart = document.getElementById(this.buttonStart) as HTMLButtonElement;
      buttonStart.textContent = 'Restart';
      buttonStart.disabled = false;
    }
  }