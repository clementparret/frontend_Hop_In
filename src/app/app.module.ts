import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { AngularMaterialModule } from './angular-material.module';
import {DatePipe} from "@angular/common";
import { RechercheComponent } from './recherche/recherche.component';
import { TrajetsFutursComponent } from './trajets-futurs/trajets-futurs.component';
import {NbOccurencesPipe} from "./pipes/nbOccurences.pipe";

const appRoutes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'proposition', canActivate: [AuthGuard], component: PropositionComponent },
  { path: 'recherche', component: RechercheComponent },
  { path: 'espace', canActivate: [AuthGuard], component: EspaceComponent,
    children: [
      { path: 'informations', canActivate: [AuthGuard], component: InformationsComponent },
      { path: 'trajets', canActivate: [AuthGuard], component: TrajetsFutursComponent },
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
    PropositionComponent,
    RechercheComponent,
    TrajetsFutursComponent,
    NbOccurencesPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
  providers: [
    AuthGuard,
    MembreService,
    UtilisateurService,
    VilleService,
    DatePipe,
    NbOccurencesPipe,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
