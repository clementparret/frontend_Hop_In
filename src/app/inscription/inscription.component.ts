import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {MembreService} from "../services/membre.service";
import {Router} from "@angular/router";
import {Utilisateur} from "../modele/Utilisateur.modele";
import {Ville} from "../modele/Ville.modele";
import {VilleService} from "../services/ville.service";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  code: string = '';
  codeOk: boolean = false;
  villes: Ville[];
  erreurMdp: boolean = false;
  erreur: boolean = false;

  constructor(private membreService: MembreService,
              private villeService: VilleService,
              private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Fonction appelée lorsqu'un visiteur essaie de s'inscrire
   * @param form formulaire rempli par le visiteur
   */
  onSubmit(form: NgForm) {
    let membre = new Utilisateur;
    let ville = new Ville;
    membre.nom = form.value['nom'];
    membre.prenom = form.value['prenom'];
    membre.dateNaissance = form.value['dateNaissance'];
    membre.motDePasse = form.value['motDePasse'];
    const motDePasse2 = form.value['motDePasse2'];
    membre.email = form.value['email'];
    membre.adresse = form.value['adresse'];
    membre.codePostal = form.value['code'];
    membre.telephone = form.value['telephone'];
    ville.nom = form.value['commune'].nom;
    ville.code = form.value['commune'].code;
    ville.codePostal = form.value['commune'].codesPostaux;
    ville.codeDepartement = form.value['commune'].codeDepartement;
    if (membre.motDePasse !== motDePasse2) {
      this.erreurMdp = true;
    } else {
      this.membreService.inscrireMembreAction(membre, ville)
        .then((res) => {
          this.router.navigate(['/connexion']);
        })
        .catch((err) => {
          this.erreur = true;
        })
    }
  }

  /**
   * Fonction appelée lorsque le code postal est modifié, met à jour la liste des villes associées
   */
  onChangementCode() {
    if (this.code.length === 5) {
      this.villeService.rechercherVilleParCodePostalAction(this.code)
        .then((res) => {
          this.villes = this.villeService.villes;
          if (typeof this.villes !== 'undefined' && this.villes !== null && this.villes.length > 0) {
            this.codeOk = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.codeOk = false;
      this.villes = null;
    }
  }

}
