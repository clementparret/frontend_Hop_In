import {Voiture} from "./Voiture.modele";
import {Ville} from "./Ville.modele";

export class Utilisateur {
  nom: string;
  prenom: string;
  dateNaissance: Date;
  motDePasse: string;
  email: string;
  adresse: string;
  codePostal: string;
  ville: Ville;
  telephone: string;
  description: string;
  dateInscription: Date;
  voitures: [Voiture];
}
