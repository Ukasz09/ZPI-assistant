import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/layouts/navbar/navbar.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TeamsComponent } from './pages/teams/teams.component';
import { TeamsListPanelComponent } from './pages/teams/teams-list-panel/teams-list-panel.component';
import { ErrorResponseComponent } from './shared/components/error-response/error-response.component';
import { HttpClientModule } from '@angular/common/http';
import { DataLoadingComponent } from './shared/components/data-loading/data-loading.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TypeaheadListComponent } from './shared/components/typeahead-list/typeahead-list.component';
import { StudentsComponent } from './pages/students/students.component';
import { ModalResponseComponent } from './shared/components/modal-response/modal-response.component';
import { YourTeamComponent } from './pages/your-team/your-team.component';
import { MailboxComponent } from './pages/mailbox/mailbox.component';
import { CustomAlertComponent } from './shared/components/custom-alert/custom-alert.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { SigninComponent } from './pages/signin/signin.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TeamsComponent,
    TeamsListPanelComponent,
    ErrorResponseComponent,
    DataLoadingComponent,
    TeachersComponent,
    PageNotFoundComponent,
    TypeaheadListComponent,
    StudentsComponent,
    ModalResponseComponent,
    YourTeamComponent,
    MailboxComponent,
    CustomAlertComponent,
    SigninComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    FormsModule,
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
