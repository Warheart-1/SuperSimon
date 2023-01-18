import * as Tone from 'tone';

 type button = {
  color: string;
  tone: string;
 }

export class SuperSimon {
  public buttons : button[] = [
    {color: 'red', tone: "C4"},
    {color: 'blue', tone: "D4"},
    {color: 'green', tone: "E4"},
    {color: 'yellow', tone: "F4"},
  ];

  public buttonStart: string = 'start';
  public speed = 2500;
  private sequence = Array<string>();
  private lastSequence = Array<string>();
  private _synth : Tone.Synth<Tone.SynthOptions>;
  
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

  private addNextButton() {
    const randomIndex = Math.floor(Math.random() * this.buttons.length);
    this.sequence.push(this.buttons[randomIndex].color);
  }

  private playSequence() {
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
    } , this.speed * this.sequence.length);
  }

  private playSound(button: string) {
    const buttonElement = this.buttons.find(b => b.color === button);
    if (buttonElement) {
      this._synth.triggerAttackRelease(buttonElement.tone, "8n");
    }
  }

  private playButton(button: string) {
    const buttonElement = document.getElementById(button);
    if (buttonElement) {
      this.playSound(button);
      buttonElement.classList.add(`${button}-active`);
      setTimeout(() => {
        buttonElement.classList.remove(`${button}-active`);
      }, this.speed-100);
    }
  }

  private buttonClicked(button: string) {
    if (this.sequence.length > 0) {
      if (button === this.sequence[0]) {
        this.playSound(button);
        this.lastSequence.push(button);
        this.sequence.shift();
        if (this.sequence.length === 0) {
          if (this.speed > 500) {
            this.speed = this.speed - 500;
          } 

          setTimeout(() => {
            this.init();
          }, 500);
        }
      } else {
        this.gameOver();
      }
    }
  }
  
  public gameOver() {
    this.sequence = [];
    alert('Game over');
    const buttonStart = document.getElementById(this.buttonStart) as HTMLButtonElement;
    buttonStart.textContent = 'Restart';
    buttonStart.disabled = false;
  }
}
const synth = new Tone.Synth().toDestination();
const superSimon = new SuperSimon(synth);