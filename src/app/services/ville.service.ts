import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Ville} from "../modele/Ville.modele";

@Injectable({
  providedIn: 'root'
})

export class VilleService{

  villeCourante: Ville;
  villes: [Ville];

  constructor(private router: Router,
              private http: HttpClient) {}

  // Liaison avec le backend HopIn



  // Liaison avec API Géo

  rechercherVilleParCodePostalAction(codePostal: string) {
    return new Promise((resolve, reject) => {
      this.http.get(
        'https://geo.api.gouv.fr/communes?' +
        'codePostal=' + codePostal +
        '&format=json&geometry=centre'
      )
        .subscribe(
          (response: [Ville]) => {
            this.villes = response;
            this.trierVilles();
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    })
  }

  rechercherVilleParCodeAction(code: string) {
    return new Promise((resolve, reject) => {
      this.http.get(
        'https://geo.api.gouv.fr/communes?' +
        'code=' + code +
        '&format=json&geometry=centre'
      )
        .subscribe(
          (response: [Ville]) => {
            this.villeCourante = response['0'];
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    })
  }

  rechercherVilleParNomAction(nom: string) {
    return new Promise((resolve, reject) => {
      this.http.get(
        'https://geo.api.gouv.fr/communes?' +
        'nom=' + nom +
        '&format=json&geometry=centre'
      )
        .subscribe(
          (response: [Ville]) => {
            this.villes = response;
            this.trierVilles();
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    })
  }

  trierVilles() {
    this.villes.sort((a, b) => (a.population > b.population) ? -1 : 1);
  }

}


