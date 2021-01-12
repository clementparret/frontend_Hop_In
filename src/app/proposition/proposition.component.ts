import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Utilisateur} from "../modele/Utilisateur.modele";
import {UtilisateurService} from "../services/utilisateur.service";
import {Ville} from "../modele/Ville.modele";
import {VilleService} from "../services/ville.service";
import {DatePipe} from "@angular/common";
import {TrajetService} from "../services/trajet.service";
import {VilleValidator} from "../validators/ville.validator";

@Component({
  selector: 'app-proposition',
  templateUrl: './proposition.component.html',
  styleUrls: ['./proposition.component.scss']
})
export class PropositionComponent implements OnInit {

  formulaire: FormGroup;
  nbVilles: number = 2;
  partie1: boolean = false;
  utilisateur: Utilisateur;
  villes: Ville[];
  demain: String;

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
    this.initialiserFormulaire();
    let aujourdhui = new Date();
    this.demain = this.datepipe.transform(aujourdhui.setDate(aujourdhui.getDate()+1), 'yyyy-MM-dd');
    this.auth.rechercherUtilisateurParIdAction()
      .then(
        (utilisateur: any) => {
          this.utilisateur = utilisateur;
        })
      .catch((err) => {
        console.log('Erreur lors de l\'initialisation de la page');
      });
  }

  /**
   * Initialise le formulaire de proposition de trajet
   */
  initialiserFormulaire() {
    this.formulaire = this.formBuilder.group({
      nbPlaces: [ 2, [Validators.required, Validators.max(4), Validators.min(1)]],
      date: [null, Validators.required],
      commentaire: '',
      etapes: this.formBuilder.array([]),
      prix: this.formBuilder.array([]),
      voiture: [null, Validators.required],
    });
    const depart = this.formBuilder.group({
      ville: [null, [Validators.required, VilleValidator]],
      lieu: [null],
      heure: [null, Validators.required],
    });
    const arrivee = this.formBuilder.group({
      ville: [null, [Validators.required, VilleValidator]],
      lieu: [null],
      heure: [null, Validators.required],
    });
    this.getEtapes().push(depart);
    this.getEtapes().push(arrivee);
    const controlePrix = this.formBuilder.control(null, Validators.required);
    this.getPrix().push(controlePrix);
  }

  /**
   * Fonction appelée lorsqu'un membre essaie de proposer un déplacement
   */
  onSubmit() {
    const valeurs = this.formulaire.value;
    for (let i = 0; i < valeurs.etapes.length; i++) {
      let heure = valeurs.etapes[i].heure.slice(0, 2);
      let minutes = valeurs.etapes[i].heure.slice(3);
      let date = new Date(valeurs.date);
      date.setHours(heure);
      date.setMinutes(minutes);
      valeurs.etapes[i].heure = date;
    }
    //TODO Vérifier si il faut créer une voiture
    this.trajetService.proposerDeplacement(valeurs, this.auth.utilisateurId)
      .then((res) => {
        this.router.navigate(['/espace/informations']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Fonction appelée lorsque le membre souhaite passer à la deuxième partie du formulaire
   */
  onSuivant() {
    this.partie1 = true;
  }

  /**
   * Fonction appelée lorsqu'un membre souhaite ajouter une étape à son déplacement
   */
  onAjouterEtape() {
    const etape = this.formBuilder.group({
      ville: [null, [Validators.required, VilleValidator]],
      lieu: [null],
      heure: [null, Validators.required],
    });
    this.getEtapes().insert(this.nbVilles-1, etape);
    for (let i = 0; i < this.nbVilles; i++) {
      const controlePrix = this.formBuilder.control(null);
      this.getPrix().insert(i, controlePrix); // CHANGER INDEX
    }
    this.nbVilles++;
  }

  /**
   * Méthode appelée lorsqu'un membre modifie un champ de saisie de la ville, modifie les propositions d'autocomplétion
   * @param index indique dans quel champ aller chercher la chaine de caractère rentrée par l'utilisateur
   */
  onChangementVille(index) {
    let value = this.formulaire.value.etapes[index].ville;
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

  getEtapes(): FormArray {
    return this.formulaire.get('etapes') as FormArray;
  }

  getDate(): FormControl {
    return this.formulaire.get('date') as FormControl;
  }

  getNbPlaces(): FormControl {
    return this.formulaire.get('nbPlaces') as FormControl;
  }

  getPrix(): FormArray {
    return this.formulaire.get('prix') as FormArray;
  }

}
