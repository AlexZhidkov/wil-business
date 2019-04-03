import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProjectEditDialogComponent } from '../project-edit-dialog/project-edit-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ProjectGroup } from '../model/project-group';
import { EoiBusinessService } from '../services/eoi-business.service';
import { AuthService } from '../services/auth.service';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-project-group',
  templateUrl: './project-group.component.html',
  styleUrls: ['./project-group.component.scss']
})
export class ProjectGroupComponent implements OnInit {
  projectGroupId: string;
  isLoading: boolean;
  private projectGroupDoc: AngularFirestoreDocument<ProjectGroup>;
  projectGroup: Observable<ProjectGroup>;
  isAdmin: boolean;

  constructor(private route: ActivatedRoute,
              public afs: AngularFirestore,
              public eoiBusinessService: EoiBusinessService,
              public authService: AuthService,
              private dialog: DialogService) { }

  ngOnInit() {
    this.isLoading = true;
    this.isAdmin = this.authService.isAdmin;
    this.projectGroupId = this.route.snapshot.paramMap.get('id');
    this.projectGroupDoc = this.afs.doc<ProjectGroup>('projectGroups/' + this.projectGroupId);
    this.projectGroup = this.projectGroupDoc.valueChanges();
    this.projectGroup.subscribe(() => this.isLoading = false);
  }

  storeProjectGroupId(projectGroupId: string) {
    this.eoiBusinessService.setEoiBusinessPath('/business/eoi/' + projectGroupId + '/true');
  }

  deleteProject(projectGroupId: string) {
    const docRef = this.afs.collection('projectGroups').doc(projectGroupId);
    docRef.delete();
  }

  confirmDelete(projectGroupId: string) {
    const message = 'Are you sure to delete this project group?';
    this.dialog.openConfirmDialog(message)
    .afterClosed().subscribe( res => {
      if (res) {
        this.deleteProject(projectGroupId);
      }
    });
  }
}
