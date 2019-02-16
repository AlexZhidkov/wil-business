import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MarkdownModule } from 'ngx-markdown';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectEditDialogComponent } from './project-edit-dialog/project-edit-dialog.component';
import { ProjectService } from './services/project.service';
import { SidenavProfileComponent } from './sidenav-profile/sidenav-profile.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ProjectComponent } from './project/project.component';
import { EoiBusinessComponent } from './eoi-business/eoi-business.component';
import { ProjectGroupsComponent } from './project-groups/project-groups.component';
import { ProjectGroupComponent } from './project-group/project-group.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectGroupEditComponent } from './project-group-edit/project-group-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectEditDialogComponent,
    SidenavProfileComponent,
    ProjectComponent,
    EoiBusinessComponent,
    ProjectGroupsComponent,
    ProjectGroupComponent,
    ProjectEditComponent,
    ProjectGroupEditComponent
  ],
  entryComponents: [
    ProjectEditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot(),
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatListModule,
    MatStepperModule,
    MatSelectModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ProjectService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
