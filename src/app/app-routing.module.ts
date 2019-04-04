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
import { EoiStudentComponent } from './eoi-student/eoi-student.component';
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { LoginComponent } from './login/login.component';
import { UniversityComponent } from './university/university.component';
import { UniversityTodoComponent } from './university-todo/university-todo.component';

const routes: Routes = [
  { path: 'university', component: UniversityComponent },
  { path: 'university/todo/:id', component: UniversityTodoComponent },
  { path: 'student', component: ProjectsComponent },
  { path: 'student/profile', component: ProfileStudentComponent }, // canActivate: [AuthService] },
  { path: 'student/eoi/:id/:isNewProject', component: EoiStudentComponent }, // canActivate: [AuthService] },
  { path: 'student/eoi/:eoiId', component: EoiStudentComponent }, // canActivate: [AuthService] },
  { path: 'student/:id', component: ProjectComponent },
  { path: 'projectEdit/:id', component: ProjectEditComponent },
  { path: 'business', component: ProjectGroupsComponent },
  { path: 'business/profile', component: ProfileBusinessComponent }, // canActivate: [AuthService] },
  { path: 'business/eoi/:id/:isNewProject', component: EoiBusinessComponent }, // canActivate: [AuthService] },
  { path: 'business/eoi/:eoiId', component: EoiBusinessComponent }, // canActivate: [AuthService] },
  { path: 'business/:id', component: ProjectGroupComponent },
  { path: 'projectGroupEdit/:id', component: ProjectGroupEditComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: ProjectsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
