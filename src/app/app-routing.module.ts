import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';
import { EoiBusinessComponent } from './eoi-business/eoi-business.component';
import { ProjectGroupsComponent } from './project-groups/project-groups.component';
import { ProjectGroupComponent } from './project-group/project-group.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectGroupEditComponent } from './project-group-edit/project-group-edit.component';
import { ProfileBusinessComponent } from './profile-business/profile-business.component';

const routes: Routes = [
  { path: 'projects', component: ProjectsComponent },
  { path: 'project/:id', component: ProjectComponent },
  { path: 'projectEdit/:id', component: ProjectEditComponent },
  { path: 'projectGroups', component: ProjectGroupsComponent },
  { path: 'projectGroup/:id', component: ProjectGroupComponent },
  { path: 'projectGroupEdit/:id', component: ProjectGroupEditComponent },
  { path: 'EOI-business/:id/:isNewProject', component: EoiBusinessComponent, canActivate: [AuthService] },
  { path: 'EOI-business/:eoiId', component: EoiBusinessComponent, canActivate: [AuthService] },
  { path: 'business/profile', component: ProfileBusinessComponent, canActivate: [AuthService] },
  { path: '**', component: ProjectsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
