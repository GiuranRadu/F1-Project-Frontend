import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; //! manually injected
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //! manually injected,
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //! manually injected,
import { HeaderComponent } from './Components/header/header.component';
import { Header2Component } from './Components/header2/header2.component'; 
import { CookieService } from 'ngx-cookie-service'; //! manually injected,
import { FooterComponent } from './Components/footer/footer.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { AvailableCircuitsComponent } from './Components/available-circuits/available-circuits.component';
import { CircuitComponent } from './Components/circuit/circuit.component';
import { CircuitsStatsComponent } from './Components/circuits-stats/circuits-stats.component';
import { CommentsComponent } from './Components/comments/comments.component';
import { DriverInfoComponent } from './Components/driver-info/driver-info.component';
import { DriversComponent } from './Components/drivers/drivers.component';
import { MainComponent } from './Components/main/main.component';
import { RegisterComponent } from './Components/register/register.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { SeeYourProfileComponent } from './Components/see-your-profile/see-your-profile.component';
import { SelectCircuitsComponent } from './Components/select-circuits/select-circuits.component';
import { DatePipe } from '@angular/common';
import { ConfirmationDialogComponent } from './Components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog'; //! manually injected,
import { NgxSpinnerModule } from 'ngx-spinner';
import { FilterPipe } from './Pipes/filter.pipe';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Header2Component,
    FooterComponent,
    ForgotPasswordComponent,
    HomeComponent,
    LoginComponent,
    AvailableCircuitsComponent,
    CircuitComponent,
    CircuitsStatsComponent,
    CommentsComponent,
    DriverInfoComponent,
    DriversComponent,
    MainComponent,
    RegisterComponent,
    ResetPasswordComponent,
    SeeYourProfileComponent,
    SelectCircuitsComponent,
    ConfirmationDialogComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, //! manually injected
    FormsModule, //! manually injected,
    BrowserAnimationsModule, //! manually injected,
    MatDialogModule,
    NgxSpinnerModule
    
  ],
  providers: [CookieService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
