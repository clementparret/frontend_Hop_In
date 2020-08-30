import { Component, OnInit } from '@angular/core';
import {UtilisateurService} from "../services/utilisateur.service";
import {VilleService} from "../services/ville.service";
import {MembreService} from "../services/membre.service";
import {Utilisateur} from "../modele/Utilisateur.modele";

@Component({
  selector: 'app-trajets-futurs',
  templateUrl: './trajets-futurs.component.html',
  styleUrls: ['./trajets-futurs.component.scss']
})
export class TrajetsFutursComponent implements OnInit {

  utilisateur = new Utilisateur;

  constructor(private auth: UtilisateurService,
              private membreService: MembreService) { }

  ngOnInit(): void {
    this.auth.rechercherUtilisateurParIdAction()
      .then(
        (utilisateur: any) => {
          this.utilisateur = utilisateur;
          console.log(utilisateur);
        })
      .catch((err) => {
        console.log('Erreur lors de l\'initialisation de la page');
      });
  }

}
