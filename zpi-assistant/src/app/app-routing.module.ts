import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailboxComponent } from './pages/mailbox/mailbox.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SigninComponent } from './pages/signin/signin.component';
import { StudentsComponent } from './pages/students/students.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { YourTeamComponent } from './pages/your-team/your-team.component';

const routes: Routes = [
  { path: '', redirectTo: 'teams', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'teams/your-team', component: YourTeamComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'mailbox', component: MailboxComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
