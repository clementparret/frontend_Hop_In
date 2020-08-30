import {Utilisateur} from "./Utilisateur.modele";
import {Trajet} from "./Trajet.modele";
import {Voiture} from "./Voiture.modele";

export class Deplacement {
  date: Date;
  nbPlacesProposees: Number;
  nbPlacesRestantes: Number;
  commentaire: string;
  conducteur: Utilisateur;
  trajets: [Trajet];
  voiture: Voiture;
}
