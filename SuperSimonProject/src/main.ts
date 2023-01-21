import * as Tone from 'tone';
import { SuperSimon } from './controller/game';
import { Modal } from './controller/modal';

class Main {

  // Java equivalent: public static void main(String[] args) ☠️
  public static main(args: string[]) : void 
  {
    if(args) {
      const modalButton = document.getElementById('modal-button') as HTMLButtonElement;
      const spanClose = document.getElementsByClassName('close')[0] as HTMLSpanElement;
      const modal = document.getElementById('myModal') as HTMLDivElement;
      const modalContent = document.getElementById('modal-content') as HTMLParagraphElement;

      const synth = new Tone.Synth().toDestination();
      const modalInstance = new Modal(modal, modalContent);
      new SuperSimon(synth);

      modalButton.addEventListener('click', (e : MouseEvent) => {
        if(e.target === modalButton) {
          if(modal.classList.contains('show')) {
            modalInstance.closeModal();
            return;
          }
          if (!modal.classList.contains('show')) {
            modalInstance.openModal();
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
