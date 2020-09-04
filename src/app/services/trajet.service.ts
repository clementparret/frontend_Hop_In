import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Trajet} from "../modele/Trajet.modele";
import {Utilisateur} from "../modele/Utilisateur.modele";

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

  annulerDeplacement(deplacementId: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/hopin/trajet/annulerDeplacement/' + deplacementId,
        {})
        .subscribe(
          () => {
            resolve();
            console.log('Déplacement annulé');
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

  candidater(utilisateurId: string, trajetId: string, nbPlaces: number) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/hopin/trajet/candidater',
        { utilisateurId: utilisateurId,
                trajetId: trajetId,
                nbPlaces: nbPlaces })
        .subscribe(
          (response) => {
            resolve();
            console.log('Candidature soumise');
          },
          (error) => {
            reject();
            console.log('Erreur ! : ' + error);
          }
        );
    });
  }

  accepterCandidat(trajetId: string, utilisateurId: string, nbPlaces: number) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/hopin/trajet/accepterCandidat',
        { utilisateurId: utilisateurId,
                trajetId: trajetId,
                nbPlaces: nbPlaces })
        .subscribe(
          (response) => {
            resolve();
            console.log('Candidat accepté');
          },
          (error) => {
            reject();
            console.log('Erreur ! : ' + error);
          }
        );
    });
  }

  refuserCandidat(trajetId: string, utilisateurId: string, nbPlaces: number) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/hopin/trajet/refuserCandidat',
        { utilisateurId: utilisateurId,
                trajetId: trajetId,
                nbPlaces: nbPlaces })
        .subscribe(
          (response) => {
            resolve();
            console.log('Candidat refusé');
          },
          (error) => {
            reject();
            console.log('Erreur ! : ' + error);
          }
        );
    });
  }

  trierListe(utilisateur: Utilisateur, futur: boolean): any {
    let liste;
    liste = utilisateur.trajetsParticipant.concat(utilisateur.trajetsCandidat);
    liste = liste.concat(utilisateur.deplacements);
    liste = liste.filter(item => {
      if (item.date) {
        return !item.annule;
      } else {
        return true;
      }
    });
    liste = liste.filter(item => {
      if (!futur && !item.date && (item.refuses.includes(utilisateur._id) || item.candidats.includes(utilisateur._id))) {
        return false;
      } else {
        return true;
      }
    })
    const maintenant = new Date()
    liste = liste.filter(item => {
      if (item.hasOwnProperty('dateArrivee')) {
        let itemDate = new Date(item.dateArrivee);
        if (itemDate.getTime() > maintenant.getTime()) {
          if (futur) {
            return true;
          } else {
            return false;
          }
        } else {
          if (futur) {
            return false;
          } else {
            return true;
          }
        }
      } else {
        let itemDate = new Date(item.trajets[item.trajets.length-1].dateArrivee);
        if (itemDate.getTime() > maintenant.getTime()) {
          if (futur) {
            return true;
          } else {
            return false;
          }
        } else {
          if (futur) {
            return false;
          } else {
            return true;
          }
        }
      }
    })
    liste.sort((a,b) => {
      if (futur) {
        if (a.hasOwnProperty('dateDepart')) {
          if (b.hasOwnProperty('dateDepart')) {
            return (a.dateDepart < b.dateDepart) ? -1 : 1;
          } else {
            return (a.dateDepart < b.trajets[0].dateDepart) ? -1 : 1;
          }
        } else {
          if (b.hasOwnProperty('dateDepart')) {
            return (a.trajets[0].dateDepart < b.dateDepart) ? -1 : 1;
          } else {
            return (a.trajets[0].dateDepart < b.trajets[0].dateDepart) ? -1 : 1;
          }
        }
      } else {
        if (a.hasOwnProperty('dateDepart')) {
          if (b.hasOwnProperty('dateDepart')) {
            return (a.dateDepart > b.dateDepart) ? -1 : 1;
          } else {
            return (a.dateDepart > b.trajets[0].dateDepart) ? -1 : 1;
          }
        } else {
          if (b.hasOwnProperty('dateDepart')) {
            return (a.trajets[0].dateDepart > b.dateDepart) ? -1 : 1;
          } else {
            return (a.trajets[0].dateDepart > b.trajets[0].dateDepart) ? -1 : 1;
          }
        }
      }
    })
    return liste;
  }

  trierTrajets() {
    this.trajets.sort((a, b) => (a.dateDepart > b.dateDepart) ? -1 : 1);
  }

}
