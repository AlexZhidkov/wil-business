import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProjectEditDialogComponent } from '../project-edit-dialog/project-edit-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../model/project';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projectId: string;
  isLoading: boolean;
  private projectDoc: AngularFirestoreDocument<Project>;
  project: Observable<Project>;

  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              public afs: AngularFirestore) { }

  ngOnInit() {
    this.isLoading = true;
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.projectDoc = this.afs.doc<Project>('projects/' + this.projectId);
    this.project = this.projectDoc.valueChanges();
    this.project.subscribe(() => this.isLoading = false);
  }

  openEditDialog(): void {
    this.dialog.open(ProjectEditDialogComponent, {
      width: '1200px', data: this.projectId
    });
  }
}
