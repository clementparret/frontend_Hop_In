import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Trajet} from "../modele/Trajet.modele";

@Injectable({
  providedIn: 'root'
})

export class TrajetService {

  trajets: [Trajet];

  constructor(private router: Router,
              private http: HttpClient) {}

  proposerDeplacement(formulaire: any, utilisateurId: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/hopin/trajet/proposerDeplacement/' + utilisateurId,
        { formulaire: formulaire })
        .subscribe(
          () => {
            resolve();
            console.log('Déplacement proposé');
          },
          (error) => {
            reject();
            console.log('Erreur ! : ' + error);
          }
        );
    });
  }

  rechercherTrajets(formulaire: any) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/hopin/trajet/rechercherTrajets',
        { formulaire: formulaire })
        .subscribe(
          (response: [Trajet]) => {
            this.trajets = response;
            this.trierTrajets;
            resolve();
            console.log('Recherche terminée');
          },
          (error) => {
            reject();
            console.log('Erreur ! : ' + error);
          }
        );
    });
  }

  trierTrajets() {
    this.trajets.sort((a, b) => (a.dateDepart < b.dateDepart) ? -1 : 1);
  }

}
