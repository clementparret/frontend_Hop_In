import {Ville} from "./Ville.modele";
import {Utilisateur} from "./Utilisateur.modele";
import {Deplacement} from "./Deplacement.modele";

export class Trajet {
  _id: string;
  lieuDepart: string;
  lieuArrivee: string;
  villeDepart: Ville;
  villeArrivee: Ville;
  dateDepart: Date;
  dateArrivee: Date;
  prix: Number;
  deplacement: Deplacement;
  candidats: [Utilisateur];
  participants: [Utilisateur];
  refuses: [Utilisateur];
}
