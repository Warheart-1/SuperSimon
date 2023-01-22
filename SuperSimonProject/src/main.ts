import * as Tone from 'tone';
import { SuperSimon } from './controller/game';
import { Modal } from './controller/modal';
import { rules } from './controller/rules';

class Main {

  // Java equivalent: public static void main(String[] args) ☠️
  // (En vrai, ça sert à rien, mais c'est marrant pour trigger des gens)
  public static main(args: string[]) : void 
  {
    if(args) {
      const modalButton = document.getElementById('modal-button') as HTMLButtonElement;
      const spanClose = document.getElementsByClassName('close')[0] as HTMLSpanElement;
      const modal = document.getElementById('myModal') as HTMLDivElement;
      const modalContent = document.getElementById('modal-content') as HTMLParagraphElement;
      const modalInstance = new Modal(modal, modalContent);
      const volume = new Tone.Volume(-20).toDestination();
      const synth = new Tone.Synth().connect(volume);
      new SuperSimon(synth);

      modalButton.addEventListener('click', (e : MouseEvent) => {
        if(e.target === modalButton) {
          if(modal.classList.contains('show')) {
            modalInstance.closeModal();
            return;
          }
          if (!modal.classList.contains('show')) {
            modalInstance.openModal(rules);
            return;
          }
        }
      });

      spanClose.addEventListener('click', (e : MouseEvent) => {
        if(e.target === spanClose && modal.classList.contains('show')) {
          modalInstance.closeModal();
        }
      });

      window.addEventListener('click', (e : MouseEvent) => {
        if(e.target === modal && modal.classList.contains('show')) {
          modalInstance.closeModal();
        }
      });
    }
  }

}

Main.main(["__main__","__args__"]);

// Path: SuperSimonProject\src\doc\main.ts
