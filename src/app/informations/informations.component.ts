import { Component, OnInit } from '@angular/core';
import {UtilisateurService} from "../services/utilisateur.service";
import {Utilisateur} from "../modele/Utilisateur.modele";
import {NgForm} from "@angular/forms";
import {MembreService} from "../services/membre.service";
import {Voiture} from "../modele/Voiture.modele";
import {Ville} from "../modele/Ville.modele";
import {VilleService} from "../services/ville.service";

declare var $: any;

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.scss']
})
export class InformationsComponent implements OnInit {

  utilisateur = new Utilisateur;
  utilisateurAge: number;
  code: string = '';
  codeOk: boolean = false;
  villes: Ville[];
  ville: Ville;
  erreurMdp: boolean = false;

  constructor(private auth: UtilisateurService,
              private villeService: VilleService,
              private membreService: MembreService) { }

  ngOnInit(): void {
    this.auth.rechercherUtilisateurParIdAction()
      .then(
        (utilisateur: any) => {
          this.utilisateur = utilisateur;
          this.code = this.utilisateur.codePostal;
          this.onChangementCode();
          const ajd = new Date();
          const dateNaissance = new Date(this.utilisateur.dateNaissance);
          this.utilisateurAge = ajd.getFullYear() - dateNaissance.getFullYear();
          const m = ajd.getMonth() - dateNaissance.getMonth();
          if (m < 0 || (m === 0 && ajd.getDate() < dateNaissance.getDate())) {
            this.utilisateurAge--;
          }
          this.villeService.rechercherVilleParCodeAction(this.utilisateur.ville.code)
            .then(res => {
              this.ville = this.villeService.villeCourante;
            })
            .catch((err) => {
              console.log('Erreur lors de la récupération de la ville de résidence');
            });
        })
      .catch((err) => {
        console.log('Erreur lors de l\'initialisation de la page');
      });
  }

  onModifDescription(form: NgForm) {
    const description = form.value['description'];
    this.membreService.modifierDescriptionAction(this.auth.utilisateurId, description)
      .then((res) => {
        this.utilisateur.description = description;
      })
      .catch((err) => {
        console.log('Erreur lors de la modification de la description');
      });
  }

  onAjouterVoiture(form: NgForm) {
    let voiture = new Voiture;
    voiture.modele = form.value['modele'];
    voiture.marque = form.value['marque'];
    voiture.couleur = form.value['couleur'];
    voiture.active = true;
    this.membreService.ajouterVoitureAction(this.auth.utilisateurId, voiture)
      .then((res) => {
        this.utilisateur.voitures.push(voiture);
      })
      .catch((err) => {
        console.log('Erreur lors de l\'ajout de voiture');
      })
  }

  onChangerMdp(form: NgForm) {
    const mdpActuel = form.value['mdpActuel'];
    const mdpNouveau1 = form.value['mdpNouveau1'];
    const mdpNouveau2 = form.value['mdpNouveau2'];
    if (mdpNouveau1 !== mdpNouveau2) {
      this.erreurMdp = true;
    } else {
      this.auth.verifierMotDePasseAction(mdpActuel)
        .then((res: any) => {
          this.auth.changerMotDePasseAction(mdpNouveau1)
            .then((res) => {
              $('#popupMdp').modal('hide');
              console.log('Mot de passe modifié avec succès');
            })
            .catch((err) => {
              console.log('Erreur lors du changement de mot de passe');
            });
        })
        .catch((err) => {
          console.log('Erreur lors du changement de mot de passe');
        })
    }
  }

  onChangerInfos(form: NgForm) {
    this.membreService.modifierMembreAction(this.auth.utilisateurId, form.value)
      .then( res => {
        this.ngOnInit();
      })
      .catch((err) => { console.log(err) });
  }

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
      this.ville = null;
    }
  }

  onDesactiver(index: number) {
    let voitureId = this.utilisateur.voitures[index]._id;
    this.membreService.desactiverVoitureAction(voitureId)
      .then( res => {
        this.utilisateur.voitures[index].active = false;
      })
      .catch((err) => { console.log(err) });
  }

}
