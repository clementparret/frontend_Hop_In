import { Component, OnInit } from '@angular/core';
import {UtilisateurService} from "../services/utilisateur.service";
import {VilleService} from "../services/ville.service";
import {MembreService} from "../services/membre.service";
import {Utilisateur} from "../modele/Utilisateur.modele";
import {TrajetService} from "../services/trajet.service";
import {NbOccurencesPipe} from "../pipes/nbOccurences.pipe";

@Component({
  selector: 'app-trajets-futurs',
  templateUrl: './trajets-futurs.component.html',
  styleUrls: ['./trajets-futurs.component.scss']
})
export class TrajetsFutursComponent implements OnInit {

  utilisateur = new Utilisateur;
  liste: any[];
  selectionne: any;

  constructor(private auth: UtilisateurService,
              private trajetService: TrajetService,
              private nbOccurencesPipe: NbOccurencesPipe,
              private membreService: MembreService) { }

  /**
   * Initialise le component
   */
  ngOnInit(): void {
    this.chargerPage(true);
  }

  /**
   * Fonction appelée lors du clic sur un trajet, affiche les informations détaillées
   * @param i index du trajet cliqué
   */
  onClickTrajet(i) {
    this.selectionne = this.liste[i];
    console.log(this.selectionne)
  }

  /**
   * Fonction responsable du chargement de la page
   * @param resetSelectionne
   */
  chargerPage(resetSelectionne: boolean) {
    this.auth.rechercherUtilisateurParIdAction()
      .then(
        (utilisateur: any) => {
          this.utilisateur = utilisateur;
          this.liste = this.trajetService.trierListe(utilisateur, true);
          if (resetSelectionne) {
            this.selectionne = this.liste[0];
          } else {
            this.selectionne = this.liste.filter(item => item._id===this.selectionne._id)[0];
          }
          console.log(utilisateur);
          console.log(this.liste)
        })
      .catch((err) => {
        console.log(err)
        console.log('Erreur lors de l\'initialisation de la page');
      });
  }

  /**
   * Fonction appelée lorsqu'un membre annule un de ses déplacements
   */
  onAnnuler() {
    this.trajetService.annulerDeplacement(this.selectionne._id)
      .then(res => this.chargerPage(true));
  }

  /**
   * Fonction appelée lorsqu'un membre accepte un candidat sur un de ses trajets
   * @param trajetIndex index du trajet sur lequel on accepte le candidat
   * @param utilisateurId id du membre dont on accepte la candidature
   */
  onAccepter(trajetIndex: number, utilisateurId: string) {
    let nbPlaces = this.nbOccurencesPipe.transform(this.selectionne.trajets[trajetIndex].candidats, utilisateurId);
    this.trajetService.accepterCandidat(this.selectionne.trajets[trajetIndex]._id, utilisateurId, nbPlaces)
      .then(res => this.chargerPage(false));
  }

  /**
   * Fonction appelée lorsqu'un membre refuse un candidat sur un de ses trajets
   * @param trajetIndex index du trajet sur lequel on refuse le candidat
   * @param utilisateurId id du membre dont on refuse la candidature
   */
  onRefuser(trajetIndex: number, utilisateurId: string) {
    let nbPlaces = this.nbOccurencesPipe.transform(this.selectionne.trajets[trajetIndex].candidats, utilisateurId);
    this.trajetService.refuserCandidat(this.selectionne.trajets[trajetIndex]._id, utilisateurId, nbPlaces)
      .then(res => this.chargerPage(false));
  }

  onDesistement() {

  }

}
