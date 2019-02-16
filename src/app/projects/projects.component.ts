import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { Project } from '../model/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Observable<Project[]>;
  isLoading: boolean;

  constructor(private router: Router, private projectService: ProjectService) { }

  ngOnInit() {
    this.isLoading = true;
    this.projectService.setCollection('projects');
    this.projects = this.projectService.list();
    this.projects.subscribe(e => {
      this.isLoading = false;
    });
  }

  addNewProject(): void {
    this.projectService.add({ title: '', description: '' })
      .then(r => this.router.navigate(['/projectEdit/' + r.id]));
  }
}
