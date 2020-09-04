import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Voiture} from "../modele/Voiture.modele";
import {Utilisateur} from "../modele/Utilisateur.modele";
import {Ville} from "../modele/Ville.modele";

@Injectable({
  providedIn: 'root'
})

export class MembreService{

  constructor(private router: Router,
              private http: HttpClient) {}

  inscrireMembreAction(membre: Utilisateur, ville: Ville) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/hopin/membre/inscrire',
        { membre: membre,
                ville: ville })
        .subscribe(
          () => {
            resolve('Ok');
            console.log('Enregistrement terminé !');
          },
          (error) => {
            reject('Echec');
            console.log('Erreur ! : ' + error);
          }
        );
    });
  }

  modifierDescriptionAction(utilisateurId: string, description: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/hopin/membre/modifierMembre/' + utilisateurId,
        { membre:
            { description: description }})
        .subscribe(
          () => {
            resolve();
            console.log('Description modifiée');
          },
          (error) => {
            reject();
            console.log('Erreur ! : ' + error);
          }
        );
    });
  }

  modifierMembreAction(utilisateurId: string, formulaire: any) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/hopin/membre/modifierMembre/' + utilisateurId,
        { membre:
            { adresse: formulaire.adresse,
              codePostal: formulaire.code,
              dateNaissance: formulaire.dateArrivee,
              email: formulaire.email,
              nom: formulaire.nom,
              prenom: formulaire.prenom,
              telephone: formulaire.telephone
            },
                ville: formulaire.commune })
        .subscribe(
          () => {
            resolve();
            console.log('Membre modifiée');
          },
          (error) => {
            reject();
            console.log('Erreur ! : ' + error);
          }
        );
    });
  }

  ajouterVoitureAction(utilisateurId: string, voiture: Voiture) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/hopin/membre/ajouterVoiture/' + utilisateurId,
        { voiture: voiture})
        .subscribe(
          () => {
            resolve();
            console.log('Voiture ajoutée');
          },
          (error) => {
            reject();
            console.log('Erreur ! : ' + error);
          }
        );
    });
  }

  desactiverVoitureAction(voitureId: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/hopin/membre/desactiverVoiture/' + voitureId,
        {})
        .subscribe(
          () => {
            resolve();
            console.log('Voiture désactivée');
          },
          (error) => {
            reject();
            console.log('Erreur ! : ' + error);
          }
        );
    });
  }

}


