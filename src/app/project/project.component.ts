import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../model/project';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { EoiStudentService } from '../services/eoi-student.service';
import { AuthService } from '../services/auth.service';
import { DialogService } from '../services/dialog.service';

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
  isAdmin: boolean;

  constructor(private route: ActivatedRoute,
              public afs: AngularFirestore,
              public eoiStudentService: EoiStudentService,
              public authService: AuthService,
              private dialog: DialogService) { }

  ngOnInit() {
    this.isLoading = true;
    this.isAdmin = this.authService.isAdmin;
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.projectDoc = this.afs.doc<Project>('projects/' + this.projectId);
    this.project = this.projectDoc.valueChanges();
    this.project.subscribe(() => this.isLoading = false);
  }

  storeProjectUrl(projectId: string) {
    this.eoiStudentService.setEoiStudentPath('/student/eoi/' + projectId + '/true');
  }

  deleteProject(projectId: string) {
    const docRef = this.afs.collection('projects').doc(projectId);
    docRef.delete();
  }

  confirmDelete(projectId: string) {
    const message = 'Are you sure to delete this project?';
    this.dialog.openConfirmDialog(message)
    .afterClosed().subscribe( res => {
      if (res) {
        this.deleteProject(projectId);
      }
    });
  }

}
