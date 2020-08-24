import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { InscriptionComponent } from './inscription/inscription.component';
import {MembreService} from "./services/membre.service";
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { ConnexionComponent } from './connexion/connexion.component';
import {UtilisateurService} from "./services/utilisateur.service";
import { AccueilComponent } from './accueil/accueil.component';
import { HeaderComponent } from './header/header.component';
import {AuthGuard} from "./services/auth-guard.service";
import { EspaceComponent } from './espace/espace.component';
import { InformationsComponent } from './informations/informations.component';
import { PropositionComponent } from './proposition/proposition.component';
import {VilleService} from "./services/ville.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'proposition', /*canActivate: [AuthGuard],*/ component: PropositionComponent },
  { path: 'espace', canActivate: [AuthGuard], component: EspaceComponent,
    children: [
      { path: 'informations', canActivate: [AuthGuard], component: InformationsComponent },
    ]},
]

@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    ConnexionComponent,
    AccueilComponent,
    HeaderComponent,
    EspaceComponent,
    InformationsComponent,
    PropositionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
  ],
  providers: [
    AuthGuard,
    MembreService,
    UtilisateurService,
    VilleService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
