import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {UtilisateurService} from "../services/utilisateur.service";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  erreur: boolean = false;

  constructor(private utilisateurService: UtilisateurService,
              private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Fonction appelée lors d'une tentative de connexion
   * @param form le formulaire rempli par l'utilisateur
   */
  onSubmit(form: NgForm) {
    const email = form.value['email'];
    const motDePasse = form.value['motDePasse'];
    this.utilisateurService.authentifierUtilisateurAction(email, motDePasse)
      .then((res) => {
        this.router.navigate(['/espace/informations']);
      })
      .catch((err) => {
        this.erreur = true;
      })
  }

}
