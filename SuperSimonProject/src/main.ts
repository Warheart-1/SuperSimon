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
      /**
       * 
       * @description Bouton pour ouvrir la modal et afficher les règles du jeu
       */
      const modalButton = document.getElementById('modal-button') as HTMLButtonElement;
      /**
       * 
       * @description Bouton pour fermer la modal
       */
      const spanClose = document.getElementsByClassName('close')[0] as HTMLSpanElement;
      /**
       * 
       * @description Modal contenant les règles du jeu
       */
      const modal = document.getElementById('myModal') as HTMLDivElement;
      /**
       * 
       * @description Contenu de la modal pour changer le texte à la volée
       */
      const modalContent = document.getElementById('modal-content') as HTMLParagraphElement;
      /**
       * 
       * @description Instance de la modal
       */
      const modalInstance = new Modal(modal, modalContent);
      /**
       * 
       * @description Volume du synthétiseur pour les notes de musique
       */
      const volume = new Tone.Volume(-20).toDestination();
      /**
       * 
       * @description Synthétiseur de notes
       */
      const synth = new Tone.Synth().connect(volume);
      /**
       * 
       * @description Instance du jeu Super Simon
       */
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
