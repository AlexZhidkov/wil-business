import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';
import { EoiBusinessComponent } from './eoi-business/eoi-business.component';
import { ProjectGroupsComponent } from './project-groups/project-groups.component';

const routes: Routes = [
  { path: 'project/:id', component: ProjectComponent },
  { path: 'eoi-business', component: EoiBusinessComponent },
  { path: 'projectGroups', component: ProjectGroupsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: '**', component: ProjectsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
