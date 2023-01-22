import * as Tone from 'tone';
import { ISuperSimon, button } from '../doc/main';
import { Modal } from './modal';

export class SuperSimon implements ISuperSimon {

    public buttons : button[] = [
      {color: 'red', tone: "C4", note: "DO"},
      {color: 'blue', tone: "D4", note: "RE"},
      {color: 'green', tone: "E4", note: "MI"},
      {color: 'yellow', tone: "F4", note: "FA"},
    ];
  
    public buttonStart: string = 'start';

    public speed = 2500;
    public sequence = Array<string>();
    public lastSequence = Array<string>();
    public _synth : Tone.Synth<Tone.SynthOptions>;
    public itteration = 0;
    public numberOfClick = 0;
    public _turn : HTMLTitleElement;
    private _score : HTMLTitleElement;
    private _numberClick : HTMLTitleElement;
    
    
    constructor(synth : Tone.Synth<Tone.SynthOptions>) {
      this.buttons.forEach(button => {
        document.getElementById(button.color)?.addEventListener('click', () => {
          this.buttonClicked(button.color);
        });
      });
      document.getElementById(this.buttonStart)?.addEventListener('click', () => {
        /**
         * 
         * Bouton de démarrage du jeu
         */
        const buttonStart = document.getElementById(this.buttonStart) as HTMLButtonElement;
        buttonStart.disabled = true;
        buttonStart.style.backgroundColor = 'grey';
        buttonStart.textContent = "You are already playing!"
  
        this.init();
      });
      this._score = document.getElementById('score-value') as HTMLTitleElement;
      this._numberClick = document.getElementById('number-click') as HTMLTitleElement;
      this._turn = document.getElementById('turn') as HTMLTitleElement;
      this._synth = synth;
    }
  
    public init() {
      /**
       * 
       * Nombre de sequences à rajouter
       */
      const numberOfExercises = 1;
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
    }
  
    public addNextButton() {
      /**
       * 
       * Nombre aléatoire entre 0 et la longueur du tableau de boutons pour ajouter au hasard une couleur à la séquence
       */
      const randomIndex = Math.floor(Math.random() * this.buttons.length);
      this.sequence.push(this.buttons[randomIndex].color);
    }
  
    public playSequence() {
      this._turn.textContent = `Please watch the sequence...`;
      this.buttons.forEach(button => {
        (document.getElementById(button.color) as HTMLButtonElement).disabled = true;
      });
      this.sequence.forEach((button: string, index: number) => {
        setTimeout(() => {
          this.playButton(button);
        }, this.speed * index);
      });
      setTimeout(() => {
        this.buttons.forEach(button => {
          (document.getElementById(button.color) as HTMLButtonElement).disabled = false;
        });
        this._turn.textContent = `Your turn!`;
      } , this.speed * this.sequence.length);
    }
  
    public playSound(button: string) {
      /**
       * 
       * Trouver le bouton correspondant à la couleur et jouer le son correspondant
       */
      const buttonElement = this.buttons.find(b => b.color === button);
      if (buttonElement) {
        this._synth.triggerAttackRelease(buttonElement.tone, "8n");
      }
    }
  
    public playButton(button: string) {
      /**
       * 
       * Trouver le bouton correspondant à la couleur 
       */
      const buttonElement = document.getElementById(button);
      /**
       * 
       * Trouve la son correspondant à la couleur
       */
      const buttonSound = this.buttons.find(b => b.color === button)!;
      if (buttonElement) {
        this.playSound(button);
        buttonElement.textContent = buttonSound.note;
        buttonElement.classList.add(`${button}-active`);
        setTimeout(() => {
          buttonElement.textContent = '';
          buttonElement.classList.remove(`${button}-active`);
        }, this.speed-100);
      }
    }

    public animateButton(button: string) {
      const buttonElement = document.getElementById(button);
      const buttonNote = this.buttons.find(b => b.color === button)!;
      if (buttonElement) {
        buttonElement.textContent = buttonNote.note;
        buttonElement.classList.add(`${button}-active`);
        setTimeout(() => {
          buttonElement.textContent = '';
          buttonElement.classList.remove(`${button}-active`);
        }, 100);
      }
    }

    public adjustSpeed() : number
    {
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
      return delay;
    }
  
    public buttonClicked(button: string) {
      if (this.sequence.length > 0) {
        if (button === this.sequence[0]) {
          this.numberOfClick++;
          this.animateButton(button);
          this.playSound(button);
          this.showNumberClick();
          this.lastSequence.push(button);
          this.sequence.shift();
          if (this.sequence.length === 0) {
            this.itteration++;
            this.showScore();
            this._turn.innerHTML = `Well done!`;
            let delay = this.adjustSpeed();
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
                <p>Speed : ${this.speed} ms</p>
                <button class="buttonGame start" id="restart">Restart</button>`
    }

    public restartGame(modal : Modal) {
      const buttonStart = document.getElementById(this.buttonStart) as HTMLButtonElement;
      document.getElementById("restart")!.addEventListener('click', () => {
        buttonStart.textContent = 'You are already playing!';
        buttonStart.style.backgroundColor = 'gray';
        buttonStart.disabled = true;
        modal.closeModal();
        this.init();
      });
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
      this.restartGame(modal);
      this.showScore();
      this.showNumberClick();
      const buttonStart = document.getElementById(this.buttonStart) as HTMLButtonElement;
      buttonStart.style.backgroundColor = 'purple';
      buttonStart.textContent = 'Restart';
      buttonStart.disabled = false;
    }
  }