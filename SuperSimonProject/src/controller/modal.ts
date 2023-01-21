import { IModal } from '../doc/main';

export class Modal implements IModal{

    public _modal: HTMLDivElement;
    public _modalContent: HTMLParagraphElement;
  
    constructor(modal: HTMLDivElement, modalContent: HTMLParagraphElement) {
      this._modal = modal;
      this._modalContent = modalContent;
    }
    
    public openModal(message?: string | HTMLElement) {
      this._modal.classList.add('show');
      this._modalContent.innerHTML = `${message}`;
    }
  
    public closeModal() {
      this._modal.classList.remove('show');
      this._modalContent.innerHTML = '';
    }
}