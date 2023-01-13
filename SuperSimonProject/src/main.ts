export class SuperSimon {
  public buttons : string[] = ['red', 'blue', 'green', 'yellow'];
  public buttonStart: string = 'start';
  public sequence = Array<string>();
  public speed = 2500;
  public constructor() {
    this.buttons.forEach(button => {
      document.getElementById(button)?.addEventListener('click', () => {
        this.buttonClicked(button);
      });
    });
    document.getElementById(this.buttonStart)?.addEventListener('click', () => {
      this.init();
    });
  }

  private init() {
    const numberOfExercises = Math.floor(Math.random() * 10) + 1;
    for (let i = 0; i < numberOfExercises; i++) {
      this.addNextButton();
    }
    if(this.sequence.length > 0) {
      this.playSequence();
    }
    console.log(this.sequence);
    console.log(numberOfExercises);
  }

  private playSequence() {
    this.sequence.forEach((button, index) => {
      setTimeout(() => {
        this.playButton(button);
      }, this.speed * index);
    });
  }

  private playButton(button: string) {
    const buttonElement = document.getElementById(button);
    if (buttonElement) {
      buttonElement.classList.add('active');
      setTimeout(() => {
        buttonElement.classList.remove('active');
      }, this.speed-100);
    }
  }
  
  private addNextButton() {
    const randomIndex = Math.floor(Math.random() * this.buttons.length);
    this.sequence.push(this.buttons[randomIndex]);
  }

  private buttonClicked(button: string) {
    if (this.sequence.length > 0) {
      if (button === this.sequence[0]) {
        this.sequence.shift();
        if (this.sequence.length === 0) {
          if (this.speed > 500) {
            this.speed = this.speed - 500;
          } 
          this.init();
        }
      } else {
        this.sequence = [];
        alert('Game over');
      }
    }
  }
}

const superSimon = new SuperSimon();

