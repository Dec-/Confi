import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { 
  MatToolbar, MatDialogModule, MatListModule, MatIconModule, MatInputModule, 
  MatSnackBarModule, MatCardModule, MatButtonModule, MatExpansionModule 
} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CheckInDialogComponent } from './check-in-dialog/check-in-dialog.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    MatToolbar,
    AppComponent,
    HomeComponent,
    CheckInDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule
  ],
  entryComponents: [CheckInDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
