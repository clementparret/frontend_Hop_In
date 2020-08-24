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
        { description: description})
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

}


