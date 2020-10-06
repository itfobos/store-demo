import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { GenericStoreModule } from './generic-store/generic-store.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxsAppStoreModule } from './ngxs-store/ngxs-app-store.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,

    GenericStoreModule,
    NgxsAppStoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
