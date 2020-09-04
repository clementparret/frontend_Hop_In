import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../modele/Utilisateur.modele";
import {UtilisateurService} from "../services/utilisateur.service";
import {TrajetService} from "../services/trajet.service";
import {MembreService} from "../services/membre.service";

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {

  utilisateur = new Utilisateur;
  liste: any[];
  selectionne: any;

  constructor(private auth: UtilisateurService,
              private trajetService: TrajetService,
              private membreService: MembreService) { }

  ngOnInit(): void {
    this.chargerPage(true);
  }

  onClickTrajet(i) {
    this.selectionne = this.liste[i];
    console.log(this.selectionne)
  }

  chargerPage(resetSelectionne: boolean) {
    this.auth.rechercherUtilisateurParIdAction()
      .then(
        (utilisateur: any) => {
          this.utilisateur = utilisateur;
          this.liste = this.trajetService.trierListe(utilisateur, false);
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

}
