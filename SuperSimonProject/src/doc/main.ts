import * as Tone from 'tone';
import { Modal } from '../controller/modal';

/**
 * 
 * @description Type de données pour les boutons du jeu
 */
export type button = {
    /**
     * 
     * Couleur du bouton (rouge, bleu, vert, jaune) 
     */
    color: string;
    /**
     * 
     * Fréquence de la note jouée par le bouton
     */
    tone: string;
    /**
     * 
     * Note jouée par le bouton
     */
    note: string;
   }

/**
 * 
 * @description Interface pour le jeu Super Simon 
 * 
 */
export interface ISuperSimon 
{
    /**
     * 
     * Objet contenant les boutons du jeu ainsi que leurs couleurs, notes et fréquences 🔘
     */
    buttons: button[];
    /**
     * 
     * Bouton de démarrage du jeu 🎮
     */
    buttonStart: string;
    /**
     * 
     * Tableau contenant la séquence de boutons à cliquer [🔴,🟢,🔵,🟡]
     */
    sequence: string[];
    /**
     * 
     * Tableau contenant le dernier résultat de la séquence de boutons à cliquer  [🟡]
     */
    lastSequence: string[];
    /**
     * 
     * Vitesse a laquelle la séquence de boutons est jouée {en millisecondes} 🕑
     * @default 2500
     */
    speed: number;
    /**
     * 
     * Objet contenant le synthétiseur de notes 🎹
     * @see https://tonejs.github.io/docs/13.8.25/Synth
     */
    _synth: Tone.Synth;
    /**
     * 
     * Nombre de tours validés 🔄️
     */
    itteration: number; 
    /**
     * 
     * Nombre de boutons cliqués 🎯
     */
    numberOfClick: number;
    /**
     * 
     * Element HTML indiquant à qui est le tour 🔄️
     */
    _turn: HTMLTitleElement;
    /**
     * 
     *  @description Initialise le jeu et joue la séquence de boutons à cliquer (appeller de facon recursive pour rejouer la séquence de boutons automatiquement )
     */
    init(): void;
    /**
     * 
     * Jouer la séquence de boutons
     * @example
     * // Initialiser le jeu
     * this.buttonStart?.addEventListener('click', () => {
     *  this.init();
     * });
     * // ...
     * // Jouer la séquence de boutons
     * if(this.sequence.length > 0) {
     *   this.playSequence();
     * }
     */
    playSequence(): void;
    /**
     * 
     * @param color - Couleur du bouton à jouer 🔴,🟢,🔵,🟡
     * 
     * Jouer un bouton
     * @example
     * // Jouer la séquence de boutons
     * this.sequence.forEach((color : string, index : number) => {
     *  setTimeout(() => {
     *   this.playButton(color);
     * }, this.speed * index);
     * });
     * // ...
     * 
     * // Jouer un bouton
     * this.playButton(color);
     * 
     */
    playButton(color: string): void;
    /**
     * 
     * Ajouter un bouton à la séquence ⏭️
     */
    addNextButton(): void;
    /**
     * 
     * @param button - Couleur du bouton cliqué
     * 
     * Vérifier si le bouton cliqué est le bon bouton 
     */
    buttonClicked(button: string): void;
    /**
     * 
     * Afficher le score 👁️
     */
    showScore(): void;
    /**
     * 
     * Affiche le game over et réinitialise toutes les variables du jeu ☠️
     */
    gameOver(): void;
    /**
     * 
     * Afficher le nombre de boutons cliqués 
     */
    showNumberClick(): void;
    /**
     * 
     * Ajuster la vitesse de la séquence de boutons 
     * @returns La nouvelle vitesse de la séquence de boutons (utiliser pour le setTimeout)
     * @example
     * 
     * if(this.sequence.length > 0) {
     *   //...
     *  let delay = this.adjustSpeed();
     *  setTimeout(() => {
     *      this.init();
     *  }, delay);
     */
    adjustSpeed() : number
    /**
     * 
     * @description Animer le bouton cliqué ou joué 
     * @param button - Couleur du bouton à animer
     */
    animateButton(button: string) : void;
    /**
     * 
     * Afficher le score accumulé 👁️
     */
    showScore() : void;
    /**
     * 
     * Afficher le score final et le nombre de boutons cliqués au total puis réinitialiser le jeu 🏁
     */
    finalScore() : void;
    /**
     * 
     * @description - Affucher la modal de fin de jeu 
     * @param Modal - Objet Modal pour afficher la modal
     * 
     */
    restartGame(Modal : Modal) : void;

}

/**
 * 
 * @description Interface pour la modal
 * 
 */
export interface IModal {
    /**
     * 
     * @description Afficher la modal
     */
    _modal: HTMLDivElement;
    /**
     * 
     * @description Contenu de la modal
     */
    _modalContent: HTMLDivElement;
    /**
     * 
     * Ouvrir la modal
     */
    openModal(): void;
    /**
     *
     * Fermer la modal 
     */
    closeModal(): void;
}