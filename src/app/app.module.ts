// ng imports
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';   // Routing
import { HttpClientModule } from '@angular/common/http'; // http client for ng<->express
import { ReactiveFormsModule } from '@angular/forms'; // Reactive Forms
import { NgDragDropModule } from 'ng-drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // ng-bootstrap
import { Ng2PaginationModule } from 'ng2-pagination';   // ng2-pagination

// ng services
import { WindowWrap } from './window-wrapper';
import { SurveyService } from './survey.service';   // survey middleware
import { UserService } from './user.service';       // userdata middleware
import { AuthService } from './auth.service';       // Authentication service
import { MockUserService } from './testing/mockuser.service'; // mock userdata middleware
import { MockSurveyService } from './testing/mocksurvey.service'; // mock surveydata middleware

// ng guards
import { AdminGuard } from './guards/admin.guard';
import { ConfirmDeactivateGuard } from './guards/confirm.guard';

// npm imports
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';  // loading bar

// Components
import { AppComponent } from './app.component';

import { CreateComponent } from './components/create/create.component';
import { AdminComponent, SurveyPipe } from './components/admin/admin.component';
import { QsortComponent } from './components/qsort/qsort.component';
import { EditComponent } from './components/edit/edit.component';
import { InitialSortComponent } from './components/initial-sort/initial-sort.component';
import { EditStatementsComponent } from './components/edit-statements/edit-statements.component';
import { EditGridComponent } from './components/edit-grid/edit-grid.component';
import { AdminLinkComponent } from './components/admin-link/admin-link.component';
import { UserIndexComponent } from './components/user-index/user-index.component';
import { AdminUserListComponent, UserPipe } from './components/admin-user-list/admin-user-list.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { EditFormsComponent } from './components/edit-forms/edit-forms.component';
import { AdminUserViewComponent } from './components/admin-user-view/admin-user-view.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';

// Configuring Routes and linking to components
const routes: Routes = [
  {
    path: 'login',
    component: AdminLoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [ AdminGuard ]
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [ AdminGuard ]
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    canActivate: [ AdminGuard ]
  },
  {
    path: 'results/:id',
    component: AdminUserListComponent,
    canActivate: [ AdminGuard ]
  },
  {
    path: 'results/:id/users/:user_id',
    component: AdminUserViewComponent,
    canActivate: [ AdminGuard ]
  },
  {
    path: 'survey/:id',
    component: UserIndexComponent,
    canActivate: [ 'UserGuard' ]
  },
  {
    path: 'instructions/:id',
    component: InstructionsComponent,
    canActivate: ['UserGuard']
  },
  {
    path: 'registration/:id',
    component: RegistrationComponent,
    canActivate: ['UserGuard']
  },
  {
    path: 'initial-sort/:id',
    component: InitialSortComponent,
    canActivate: ['UserGuard'],
    // canDeactivate: [ ConfirmDeactivateGuard ]  // TODO: Activate when implemented
  },
  {
    path: 'q-sort/:id',
    component: QsortComponent,
    canActivate: ['UserGuard'],
    // canDeactivate: [ ConfirmDeactivateGuard ]
  },
  {
    path: 'questionnaire/:id',
    component: QuestionnaireComponent,
    canActivate: ['UserGuard'],
    // canDeactivate: [ ConfirmDeactivateGuard ]
  }
];
// Declaring vars for ng
@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    QsortComponent,
    AdminComponent,
    EditComponent,
    InitialSortComponent,
    EditStatementsComponent,
    EditGridComponent,
    AdminLinkComponent,
    UserIndexComponent,
    AdminUserListComponent,
    SurveyPipe,
    UserPipe,
    InstructionsComponent,
    RegistrationComponent,
    QuestionnaireComponent,
    EditFormsComponent,
    AdminUserViewComponent,
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SlimLoadingBarModule,
    ReactiveFormsModule,
    NgDragDropModule.forRoot(),
    NgbModule,
    Ng2PaginationModule
  ],
  providers: [
    AdminGuard,
    {
      provide: 'UserGuard',    // placeholder
      useValue: () => {
        return true;
      }
    },
    ConfirmDeactivateGuard,
    AuthService,
    SurveyService,
    UserService,
    MockSurveyService,
    MockUserService,
    WindowWrap
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
