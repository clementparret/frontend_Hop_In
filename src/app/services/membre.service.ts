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

  /**
   * Envoie une requête HTTP pour inscrire un membre
   * @param membre le membre à inscrire
   * @param ville la ville de résidence du membre
   */
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

  /**
   * Envoie une requête HTTP pour modifier la description d'un membre donné
   * @param utilisateurId id de l'utilisateur concerné
   * @param description nouvelle description
   */
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

  /**
   * Envoie une requête HTTP pour modifier les informations d'un membre donné
   * @param utilisateurId id de l'utilisateur concerné
   * @param formulaire formulaire contenant les nouvelles informations
   */
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

  /**
   * Envoie une requête HTTP pour ajouter une voiture à la liste de véhicule d'un membre donné
   * @param utilisateurId id du membre concerné
   * @param voiture voiture à enregistrer
   */
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

  /**
   * Envoie une requête HTTP pour désactiver une voiture donnée
   * @param voitureId id de la voiture concernée
   */
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


