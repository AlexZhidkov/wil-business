import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { ProjectGroup } from '../model/project-group';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-project-groups',
  templateUrl: './project-groups.component.html',
  styleUrls: ['./project-groups.component.scss']
})
export class ProjectGroupsComponent implements OnInit {
  projectGroups: Observable<ProjectGroup[]>;
  isLoading: boolean;

  constructor(private router: Router,
    private projectService: ProjectService,
    private auth: AuthService) {
    this.auth.isBusiness = true;
  }

  ngOnInit() {
    this.isLoading = true;
    this.projectService.setCollection('projectGroups');
    this.projectGroups = this.projectService.list();
    this.projectGroups.subscribe(e => {
      this.isLoading = false;
    });
  }

  addNewProjectGroup(): void {
    this.projectService.add({ title: '', description: '' })
      .then(r => this.router.navigate(['/projectGroupEdit/' + r.id]));
  }
}
