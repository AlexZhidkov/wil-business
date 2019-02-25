import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { EoiStudent } from '../model/eoi-student';
import { UserProfile } from '../model/user-profile';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-eoi-student',
  templateUrl: './eoi-student.component.html',
  styleUrls: ['./eoi-student.component.scss']
})
export class EoiStudentComponent implements OnInit {
  smallScreen: boolean;
  user: UserProfile;
  eoiStudentUrl: string;
  projectId: string;
  eoiId: string;
  isNewProject: boolean;
  eoiDoc: AngularFirestoreDocument<EoiStudent>;
  eoi: Observable<EoiStudent>;
  isLoading: boolean;

  studyAreaFormGroup: FormGroup;
  whyFormGroup: FormGroup;
  commitmentFormGroup: FormGroup;
  attachmentsFormGroup: FormGroup;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
    this.user = JSON.parse(localStorage.getItem('user'));
    this.eoiStudentUrl = '/users/' + this.user.uid + '/eoiStudent';

    this.projectId = this.route.snapshot.paramMap.get('id');
    this.eoiId = this.route.snapshot.paramMap.get('eoiId');
    this.isNewProject = (this.route.snapshot.paramMap.get('isNewProject') === 'true');

    if (this.isNewProject) {
      this.afs.collection<EoiStudent>(this.eoiStudentUrl)
        .add({
          projectId: this.projectId,
          isNew: false,
          studyArea: '',
          why: '',
          commitment: '',
          resumeUrl: '',
          transcriptUrl: ''
        })
        .then(r => {
          this.eoiDoc = this.afs.doc<EoiStudent>(this.eoiStudentUrl + '/' + r.id);
          this.bindFormControls();
        });
    } else {
      this.eoiDoc = this.afs.doc<EoiStudent>(this.eoiStudentUrl + '/' + this.eoiId);
      this.bindFormControls();
    }
  }

  bindFormControls() {
    this.eoi = this.eoiDoc.valueChanges();
    this.eoi.subscribe(r => {
      this.isLoading = false;
      this.studyAreaFormGroup = this.formBuilder.group({
        studyAreaCtrl: [r.studyArea, Validators.required]
      });
      this.whyFormGroup = this.formBuilder.group({
        whyCtrl: [r.why, Validators.required]
      });
      this.commitmentFormGroup = this.formBuilder.group({
        commitmentCtrl: [r.commitment, Validators.required]
      });
      this.attachmentsFormGroup = this.formBuilder.group({
        resumeUrlCtrl: [r.resumeUrl, Validators.required],
        transcriptUrlCtrl: [r.transcriptUrl, Validators.required]
      });
    });
  }

  submitEoi() {
    this.eoiDoc.get()
      .subscribe(eoiBusinessSnapshot => {
        const eoiStudent = eoiBusinessSnapshot.data() as EoiStudent;
        const formSubmission = {
          fields: [
            { name: 'email', value: this.user.email },
            { name: 'area_of_study', value: eoiStudent.studyArea },
            { name: 'why', value: eoiStudent.why },
            { name: 'commitment', value: eoiStudent.commitment },
            { name: 'resume_url', value: eoiStudent.resumeUrl },
            { name: 'transcript_url', value: eoiStudent.transcriptUrl }
          ]
        };

        this.http.post(
          environment.hubspot.formSubmissionsUrl +
          environment.hubspot.portalId + '/' +
          environment.hubspot.eoiStudentFormGuid,
          formSubmission)
          .subscribe(response => {
            console.log(response);
          });
      });
  }
}
