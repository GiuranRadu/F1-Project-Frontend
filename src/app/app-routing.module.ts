import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { RegisterComponent } from './Components/register/register.component';
import { MainComponent } from './Components/main/main.component';
import { AvailableCircuitsComponent } from './Components/available-circuits/available-circuits.component';
import { SelectCircuitsComponent } from './Components/select-circuits/select-circuits.component';
import { CommentsComponent } from './Components/comments/comments.component';
import { DriversComponent } from './Components/drivers/drivers.component';
import { DriverInfoComponent } from './Components/driver-info/driver-info.component';
import { CircuitsStatsComponent } from './Components/circuits-stats/circuits-stats.component';
import { CircuitComponent } from './Components/circuit/circuit.component';
import { SeeYourProfileComponent } from './Components/see-your-profile/see-your-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/forgotPassword', component: ForgotPasswordComponent },
  { path: 'login/resetPassword', component: ResetPasswordComponent },
  { path: 'main', component: MainComponent },
  { path: 'main/availableCircuits', component: AvailableCircuitsComponent },
  { path: 'main/selectCircuits', component: SelectCircuitsComponent },
  { path: 'main/comments', component : CommentsComponent },
  { path: 'main/drivers', component: DriversComponent },
  { path: 'main/drivers/:id', component: DriverInfoComponent },
  { path: 'main/circuitsStats', component: CircuitsStatsComponent },
  { path: 'main/circuitsStats/:id', component: CircuitComponent },
  { path: 'main/seeYourProfile', component: SeeYourProfileComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
