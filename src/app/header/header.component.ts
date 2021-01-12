import { Component, OnInit } from '@angular/core';
import {UtilisateurService} from "../services/utilisateur.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  url: string;

  constructor(private auth: UtilisateurService,
              private router: Router) { }

  /**
   * Initialise le component
   */
  ngOnInit(): void {
    this.isAuth = this.auth.isAuth;
    this.url = this.router.url;
  }

  /**
   * Fonction appelée lors d'une tentative de déconnexion
   */
  onDeconnexion() {
    this.auth.deconnecter();
    this.router.navigate(['']);
  }

}
