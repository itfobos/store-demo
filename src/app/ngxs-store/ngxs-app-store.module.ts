import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxsGmtTimeComponent } from './component/ngxs-gmt-time.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsDateTimeStore } from './ngxs-date-time-store';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    NgxsGmtTimeComponent,
  ],

  imports: [
    CommonModule,

    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,

    NgxsModule.forRoot([NgxsDateTimeStore], {developmentMode: !environment.production}),
  ]
})
export class NgxsAppStoreModule {
}
