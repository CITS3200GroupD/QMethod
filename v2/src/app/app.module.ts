// ng imports
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';   // Routing
import { HttpClientModule } from '@angular/common/http'; // http client for ng<->express 
import { ReactiveFormsModule } from '@angular/forms'; // Reactive Forms

// ng services
import { SurveyService } from './survey.service';   // survey creation http requests

// npm imports
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';  // loading bar

// Components
import { AppComponent } from './app.component';
import { CreateComponent } from './components/create/create.component'; // Create Survey page
import { IndexComponent } from './components/index/index.component';    // List of all Survey Pages
import { EditComponent } from './components/edit/edit.component';       // Edit Survey

// Configuring Routes and linking to components
const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  {
    path: 'index',
    component: IndexComponent
  },
];
// Declaring vars for ng
@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    IndexComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SlimLoadingBarModule,
    ReactiveFormsModule
  ],
  providers: [SurveyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
