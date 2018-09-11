// ng imports
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';   // Routing
import { HttpClientModule } from '@angular/common/http'; // http client for ng<->express
import { ReactiveFormsModule } from '@angular/forms'; // Reactive Forms
import { NgDragDropModule } from 'ng-drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // ng-bootstrap

// ng services
import { SurveyService } from './survey.service';   // survey creation http requests

// npm imports
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';  // loading bar

// Components
import { AppComponent } from './app.component';
import { CreateComponent } from './components/create/create.component'; // Create Survey page
import { AdminComponent } from './components/admin/admin.component';    // List of all Survey Pages
import { EditComponent } from './components/edit/edit.component';
import { InitialSortComponent } from './components/initial-sort/initial-sort.component';
import { EditStatementsComponent } from './components/edit-statements/edit-statements.component';
import { EditGridComponent } from './components/edit-grid/edit-grid.component';
import { AdminLinkComponent } from './components/admin-link/admin-link.component';
import { UserIndexComponent } from './components/user-index/user-index.component';       // Edit Survey

// Configuring Routes and linking to components
const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'survey/:id/start',
    component: UserIndexComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'initial-sort',
    component: InitialSortComponent
  },
];
// Declaring vars for ng
@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    AdminComponent,
    EditComponent,
    InitialSortComponent,
    EditStatementsComponent,
    EditGridComponent,
    AdminLinkComponent,
    UserIndexComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SlimLoadingBarModule,
    ReactiveFormsModule,
    NgDragDropModule.forRoot(),
    NgbModule
  ],
  providers: [SurveyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
