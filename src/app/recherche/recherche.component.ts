import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Ville} from "../modele/Ville.modele";
import {UtilisateurService} from "../services/utilisateur.service";
import {VilleService} from "../services/ville.service";
import {TrajetService} from "../services/trajet.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {Trajet} from "../modele/Trajet.modele";
import {VilleValidator} from "../validators/ville.validator";

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {

  formulaire: FormGroup;
  villes: Ville[];
  resultats: Trajet[];
  selectionne: Trajet;
  demain: String;
  nbPlaces: number;
  isAuth: boolean;
  utilisateurId: string;

  constructor(private formBuilder: FormBuilder,
              private auth: UtilisateurService,
              private villeService: VilleService,
              private trajetService: TrajetService,
              private router: Router,
              private datepipe: DatePipe) { }

  /**
   * Initialise le component
   */
  ngOnInit(): void {
    this.isAuth = this.auth.isAuth;
    this.utilisateurId = this.auth.utilisateurId;
    this.initialiserFormulaire();
    let aujourdhui = new Date();
    this.demain = this.datepipe.transform(aujourdhui.setDate(aujourdhui.getDate()+1), 'yyyy-MM-dd');
  }

  /**
   * Initialise le formulaire de recherche de trajet
   */
  initialiserFormulaire() {
    this.formulaire = this.formBuilder.group({
      villeDepart: [null, [Validators.required, VilleValidator]],
      villeArrivee: [null, [Validators.required, VilleValidator]],
      nbPlaces: [1, [Validators.required, Validators.max(4), Validators.min(1)]],
      date: [null, Validators.required],
    });
  }

  /**
   * Fonction appelée lors de la modification d'un champ de saisie d'un nom de ville
   * @param depart indique si le changement a lieu dans le champ dédié à la ville de départ
   */
  onChangementVille(depart: boolean) {
    let value;
    if (depart) {
      value = this.formulaire.value.villeDepart;
    } else {
      value = this.formulaire.value.villeArrivee;
    }
    this.villeService.rechercherVilleParNomAction(value)
      .then((res) => {
        this.villes = this.villeService.villes.slice(0,20);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Renvoie un texte de la forme "nomVille (codeDepartement)" pour une ville donnée
   * @param ville la ville à afficher
   */
  affichageVille(ville) {
    let texte = '';
    if (ville) {
      texte = ville.nom + ' (' + ville.codeDepartement + ')';
    }
    return texte;
  }

  /**
   * Fonction appelée lorsqu'un membre valide sa recherche de trajet
   */
  onSubmit() {
    const valeurs = this.formulaire.value;
    this.trajetService.rechercherTrajets(valeurs)
      .then((res) => {
        this.resultats = this.trajetService.trajets;
        this.selectionne = this.resultats[0];
        this.nbPlaces = valeurs.nbPlaces;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Fonction appelée lors du clic sur un trajet, affiche les informations détaillées
   * @param i index du trajet cliqué
   */
  onClickTrajet(i) {
    this.selectionne = this.resultats[i];
    console.log(this.selectionne)
  }

  /**
   * Fonction appelée lorsqu'un membre candidate à un trajet
   */
  onCandidater() {
    this.trajetService.candidater(this.auth.utilisateurId, this.selectionne._id, this.nbPlaces)
      .then((res) => {
        this.router.navigate(['/espace/informations']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
