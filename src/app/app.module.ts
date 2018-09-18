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

import { MockUserService } from './mockuser.service' // mock userdata middleware

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

// Configuring Routes and linking to components
const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'survey/:id',
    component: UserIndexComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  {
    path: 'results/:id',
    component: AdminUserListComponent
  },
  {
    path: 'results/:id/users/:user_id',
    component: AdminUserListComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'initial-sort/:id',
    component: InitialSortComponent
  },
  {
    path: 'q-sort',
    component: QsortComponent
  },
  // Temporary Paths for v1 files
  {
    path: 'v1/registration',
    component: RegistrationComponent
  },
  {
    path: 'v1/questionnaire',
    component: QuestionnaireComponent
  },
  {
    path: 'v1/instructions',
    component: InstructionsComponent
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
    EditFormsComponent
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
  providers: [SurveyService, UserService, MockUserService, WindowWrap],
  bootstrap: [AppComponent],
})
export class AppModule { }
