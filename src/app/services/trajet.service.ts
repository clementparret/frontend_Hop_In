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

  /**
   * Envoie une requête HTTP pour enregistrer un nouveau déplacement
   * @param formulaire le formulaire contenant les informations sur le déplacement
   * @param utilisateurId id de l'utilisateur qui propose le déplacement
   */
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

  /**
   * Envoie une requête HTTP pour annuler un déplacement
   * @param deplacementId id du déplacement à annuler
   */
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

  /**
   * Envoie une requête HTTP pour rechercher les trajets correspondant aux paramètres
   * @param formulaire formulaire contenant les paramètres de recherche
   */
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

  /**
   * Envoie une requête HTTP pour candidater à un trajet
   * @param utilisateurId id du membre candidat
   * @param trajetId id du trajet sur lequel le membre candidate
   * @param nbPlaces le nombre de places que le candidat souhaite réserver
   */
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

  /**
   * Envoie une requête HTTP pour accepter un candidat
   * @param trajetId id du trajet
   * @param utilisateurId id du candidat
   * @param nbPlaces nombre de places attribuées au candidat
   */
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

  /**
   * Envoie une requête HTTP pour refuser un candidat
   * @param trajetId id du trajet
   * @param utilisateurId id du candidat
   * @param nbPlaces nombre de places que le candidat souhaitait réserver
   */
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

  /**
   * Renvoie la liste des trajets d'un membre triés par ordre chronologique ou anti-chronologique
   * @param utilisateur
   * @param futur détermine si la liste est triée par ordre chronologique ou non
   */
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

  /**
   * Trie les trajets dans l'ordre chronologique
   */
  trierTrajets() {
    this.trajets.sort((a, b) => (a.dateDepart > b.dateDepart) ? -1 : 1);
  }

}
