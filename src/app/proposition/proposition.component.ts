import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Utilisateur} from "../modele/Utilisateur.modele";
import {UtilisateurService} from "../services/utilisateur.service";
import {Ville} from "../modele/Ville.modele";
import {VilleService} from "../services/ville.service";

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
  villesSelectionnees: Ville[];

  constructor(private formBuilder: FormBuilder,
              private auth: UtilisateurService,
              private villeService: VilleService,
              private router: Router) { }

  ngOnInit(): void {
    this.initialiserFormulaire();
    this.auth.rechercherUtilisateurParIdAction()
      .then(
        (utilisateur: any) => {
          this.utilisateur = utilisateur;
        })
      .catch((err) => {
        console.log('Erreur lors de l\'initialisation de la page');
      });
  }

  initialiserFormulaire() {
    this.formulaire = this.formBuilder.group({
      nbPlaces: [ 2, [Validators.required, Validators.max(4), Validators.min(1)]],
      date: [new Date(), Validators.required],
      commentaire: '',
      etapes: this.formBuilder.array([]),
      prix: this.formBuilder.array([]),
      voiture: [null, Validators.required],
    });
    const depart = this.formBuilder.group({
      ville: [null, Validators.required],
      lieu: [null],
      heure: [null, Validators.required],
    });
    const arrivee = this.formBuilder.group({
      ville: [null, Validators.required],
      lieu: [null],
      heure: [null, Validators.required],
    });
    this.getEtapes().push(depart);
    this.getEtapes().push(arrivee);
    const controlePrix = this.formBuilder.control(null, Validators.required);
    this.getPrix().push(controlePrix);
  }

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
    console.log(valeurs);
    console.log(this.villesSelectionnees);

    //Vérifier si il faut créer une voiture
    //this.router.navigate(['/espace/informations']);
  }

  onSuivant() {
    console.log(this.formulaire.value)
    this.partie1 = true;
  }

  onAjouterEtape() {
    const etape = this.formBuilder.group({
      ville: [null, Validators.required],
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

  onChangementVille(index) {
    let value = this.formulaire.value.etapes[index].ville;
    console.log(value);
    this.villeService.rechercherVilleParNomAction(value)
      .then((res) => {
        this.villes = this.villeService.villes.slice(0,20);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onClicOption(ville: Ville) {
    console.log(ville);
  }

  getEtapes(): FormArray {
    return this.formulaire.get('etapes') as FormArray;
  }

  getPrix(): FormArray {
    return this.formulaire.get('prix') as FormArray;
  }

}
