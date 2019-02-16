import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ProjectEditDialogComponent } from '../project-edit-dialog/project-edit-dialog.component';
import { ProjectService } from '../services/project.service';
import { ProjectGroup } from '../model/project-group';

@Component({
  selector: 'app-project-groups',
  templateUrl: './project-groups.component.html',
  styleUrls: ['./project-groups.component.scss']
})
export class ProjectGroupsComponent implements OnInit {
  projectGroups: Observable<ProjectGroup[]>;
  isLoading: boolean;

  constructor(public dialog: MatDialog, private projectService: ProjectService) { }

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
      .then(r => this.openEditDialog(r.id));
  }

  openEditDialog(id: string): void {
    this.dialog.open(ProjectEditDialogComponent, {
      width: '1200px', data: id
    });
  }
}
