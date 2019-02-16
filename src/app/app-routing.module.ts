import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';
import { EoiBusinessComponent } from './eoi-business/eoi-business.component';
import { ProjectGroupsComponent } from './project-groups/project-groups.component';
import { ProjectGroupComponent } from './project-group/project-group.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectGroupEditComponent } from './project-group-edit/project-group-edit.component';

const routes: Routes = [
  { path: 'projects', component: ProjectsComponent },
  { path: 'project/:id', component: ProjectComponent },
  { path: 'projectEdit/:id', component: ProjectEditComponent },
  { path: 'projectGroups', component: ProjectGroupsComponent },
  { path: 'projectGroup/:id', component: ProjectGroupComponent },
  { path: 'projectGroupEdit/:id', component: ProjectGroupEditComponent },
  { path: 'EOI-business/:id', component: EoiBusinessComponent },
  { path: '**', component: ProjectsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
