import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UtilisateurService } from './utilisateur.service';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private utilisateurService: UtilisateurService,
              private router: Router) { }

  /**
   * Restreint l'accès à certaines pages aux utilisateurs connectés
   * @param route
   * @param state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.utilisateurService.isAuth) {
      return true;
    } else {
      this.router.navigate(['/connexion']);
    }
  }
}
