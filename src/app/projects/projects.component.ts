import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ProjectEditDialogComponent } from '../project-edit-dialog/project-edit-dialog.component';
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

  constructor(public dialog: MatDialog, private projectService: ProjectService) { }

  ngOnInit() {
    this.isLoading = true;
    this.projectService.setCollection('projects');
    this.projects = this.projectService.list();
    this.projects.subscribe(e => {
      this.isLoading = false;
    });
  }

  openEditDialog(id: string): void {
    this.dialog.open(ProjectEditDialogComponent, {
      width: '1200px', data: id
    });
  }
}
