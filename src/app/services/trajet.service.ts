import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class TrajetService {

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

}
