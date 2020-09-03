import {Voiture} from "./Voiture.modele";
import {Ville} from "./Ville.modele";
import {Trajet} from "./Trajet.modele";
import {Deplacement} from "./Deplacement.modele";

export class Utilisateur {
  _id: string;
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
  trajetsCandidat: [Trajet];
  trajetsParticipant: [Trajet];
  deplacements: [Deplacement];
}
