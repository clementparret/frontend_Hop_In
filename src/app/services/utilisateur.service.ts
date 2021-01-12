import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class UtilisateurService {

  isAuth = false;
  isAdmin = false;
  utilisateurId: string;

  constructor(private router: Router,
              private http: HttpClient) {}

  /**
   * Envoie une requête HTTP pour authentifier un utilisateur
   * @param email
   * @param motDePasse
   */
  authentifierUtilisateurAction(email: string, motDePasse: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/hopin/utilisateur/authentifier',
        { email: email,
                motDePasse: motDePasse })
        .subscribe(
          (authData: { utilisateurId: string, isAdmin: boolean }) => {
            this.isAuth = true;
            this.isAdmin = authData.isAdmin;
            this.utilisateurId = authData.utilisateurId;
            resolve('Ok');
            console.log('Utilisateur authentifié');
          },
          (error) => {
            reject('Echec');
            console.log('Erreur ! : ' + error);
          }
        );
    });
  }

  /**
   * Envoie une requête HTTP pour récupérer les informations d'un utilisateur donné
   */
  rechercherUtilisateurParIdAction() {
    return new Promise((resolve, reject) => {
      this.http.get(
        'http://localhost:3000/hopin/utilisateur/rechercherParId/' + this.utilisateurId )
        .subscribe(
          (response: any) => {
            resolve(response.utilisateur);
          },
          (error) => {
            reject(error);
          }
        );
    })
  }

  /**
   * gère la déconnexion d'un utilisateur
   */
  deconnecter() {
    this.isAuth = false;
    this.isAdmin = false;
    this.utilisateurId = null;
  }

  /**
   * Envoie une requête HTTP pour vérifeir que le mot de passe saisi correspond à un utilisateur donné
   * @param motDePasse
   */
  verifierMotDePasseAction(motDePasse: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/hopin/utilisateur/verifierMotDePasse/' + this.utilisateurId,
        { motDePasse: motDePasse })
        .subscribe(
          (response: any) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    })
  }

  /**
   * Envoie une requête HTTP pour modifier le mot de passe d'un utilisateur donné
   * @param motDePasse le nouveau mot de passe
   */
  changerMotDePasseAction(motDePasse: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/hopin/utilisateur/changerMotDePasse/' + this.utilisateurId,
        {motDePasse: motDePasse})
        .subscribe((response: any) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    })
  }


}
