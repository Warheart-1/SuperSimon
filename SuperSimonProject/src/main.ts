export class SuperSimon {
  public buttons : string[] = ['red', 'blue', 'green', 'yellow'];
  public buttonStart: string = 'start';
  public sequence = Array<string>();
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
  }

  private playSequence() {
    this.sequence.forEach((button, index) => {
      setTimeout(() => {
        this.playButton(button);
      }, 1000 * index);
    });
  }

  private playButton(button: string) {
    const buttonElement = document.getElementById(button);
    if (buttonElement) {
      buttonElement.classList.add('active');
      setTimeout(() => {
        buttonElement.classList.remove('active');
      }, 500);
    }
  }
  
  private addNextButton() {
    const randomIndex = Math.floor(Math.random() * this.buttons.length);
    this.sequence.push(this.buttons[randomIndex]);
  }

  private buttonClicked(button: string) {
  }
}

const superSimon = new SuperSimon();

