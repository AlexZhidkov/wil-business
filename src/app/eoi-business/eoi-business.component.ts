import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { EoiBusiness } from '../model/eoi-business';
import { EoiBusinessService } from '../services/eoi-business.service';
import { UserProfile } from '../model/user-profile';
import { environment } from 'src/environments/environment';
import { UniversityTodoService } from '../services/university-todo.service';

export interface Semester {
  number: number;
  dates: string;
}

@Component({
  selector: 'app-eoi-business',
  templateUrl: './eoi-business.component.html',
  styleUrls: ['./eoi-business.component.scss']
})
export class EoiBusinessComponent implements OnInit {
  smallScreen: boolean;
  semesters: Semester[];
  jobFormGroup: FormGroup;
  employerFormGroup: FormGroup;
  datesFormGroup: FormGroup;
  supervisorFormGroup: FormGroup;

  user: UserProfile;
  eoiBusinessUrl: string;
  projectId: string;
  eoiId: string;
  isNewProject: boolean;
  eoiDoc: AngularFirestoreDocument<EoiBusiness>;
  eoi: Observable<EoiBusiness>;
  isLoading: boolean;
  previouslySubmittedEois: Observable<EoiBusiness[]>;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private eoiBusinessService: EoiBusinessService,
    private universityTodoService: UniversityTodoService
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
    this.eoiBusinessUrl = '/users/' + this.user.uid + '/eoiBusiness';

    this.projectId = this.route.snapshot.paramMap.get('id');
    this.eoiId = this.route.snapshot.paramMap.get('eoiId');
    this.isNewProject = (this.route.snapshot.paramMap.get('isNewProject') === 'true');

    this.semesters = [
      { number: 1, dates: 'Semester 1. 25 February - 	24 May' },
      { number: 2, dates: 'Semester 2. 29 July - 25 October' },
      { number: 3, dates: 'Semester 3. ' },
      { number: 4, dates: 'Semester 4. ' }
    ];

    this.eoiBusinessService.setCollection(this.eoiBusinessUrl);
    this.previouslySubmittedEois = this.eoiBusinessService.list();

    if (this.isNewProject) {
      this.afs.collection<EoiBusiness>(this.eoiBusinessUrl)
        .add({
          projectGroupId: this.projectId,
          isNew: false,
          title: '',
          description: '',
          skills: '',
          clearance: '',
          name: '',
          website: '',
          primaryContact: '',
          address: '',
          about: '',
          dates: '',
          supervisor: '',
          supervisorRole: '',
          supervisorExperience: '',
          supervisorPhone: '',
          supervisorEmail: '',
        })
        .then(r => {
          this.eoiDoc = this.afs.doc<EoiBusiness>(this.eoiBusinessUrl + '/' + r.id);
          this.bindFormControls();
        });
    } else {
      this.eoiDoc = this.afs.doc<EoiBusiness>(this.eoiBusinessUrl + '/' + this.eoiId);
      this.bindFormControls();
    }
  }

  bindFormControls() {
    this.eoi = this.eoiDoc.valueChanges();
    this.eoi.subscribe(r => {
      this.isLoading = false;
      this.jobFormGroup = this.formBuilder.group({
        jobTitleCtrl: [r.title, Validators.required],
        jobDescriptionCtrl: [r.description, Validators.required],
        skillsCtrl: [r.skills],
        clearanceCtrl: [r.clearance]
      });
      this.employerFormGroup = this.formBuilder.group({
        nameCtrl: [r.name, Validators.required],
        websiteCtrl: [r.website],
        primaryContactCtrl: [r.primaryContact, Validators.required],
        addressCtrl: [r.address],
        aboutCtrl: [r.about, Validators.required]
      });
      this.datesFormGroup = this.formBuilder.group({
        datesCtrl: [r.dates]
      });
      this.supervisorFormGroup = this.formBuilder.group({
        supervisorCtrl: [r.supervisor, Validators.required],
        supervisorRoleCtrl: [r.supervisorRole],
        supervisorExperienceCtrl: [r.supervisorExperience],
        supervisorPhoneCtrl: [r.supervisorPhone, Validators.required],
        supervisorEmailCtrl: [r.supervisorEmail, Validators.required]
      });
    });
  }

  CloneFromEoi(id: any) {
    this.eoiDoc.update(id);
  }

  submitEoi() {
    this.eoiDoc.get()
      .subscribe(eoiBusinessSnapshot => {
        const eoiBusiness = eoiBusinessSnapshot.data() as EoiBusiness;
        this.universityTodoService.setCollection('universities/uwa/todo');
        this.universityTodoService.add({ title: 'Placement request received', eoiBusiness });
      });
    this.router.navigateByUrl('business');
  }

  submitEoiToExperlio() {
    this.eoiDoc.get()
      .subscribe(eoiBusinessSnapshot => {
        const eoiBusiness = eoiBusinessSnapshot.data() as EoiBusiness;
        const formSubmission = {
          fields: [
            { name: 'email', value: this.user.email },
            { name: 'title', value: eoiBusiness.title },
            { name: 'project', value: eoiBusiness.description },
            { name: 'skills', value: eoiBusiness.skills },
            { name: 'clearance', value: eoiBusiness.clearance },
            { name: 'company', value: eoiBusiness.name },
            { name: 'website', value: eoiBusiness.website },
            { name: 'primary_contact', value: eoiBusiness.primaryContact },
            { name: 'address', value: eoiBusiness.address },
            { name: 'about', value: eoiBusiness.about },
            { name: 'semester', value: eoiBusiness.dates },
            { name: 'supervisor_name', value: eoiBusiness.supervisor },
            { name: 'supervisor_title_role', value: eoiBusiness.supervisorRole },
            { name: 'supervisor_expirience', value: eoiBusiness.supervisorExperience },
            { name: 'supervisor_phone', value: eoiBusiness.supervisorPhone },
            { name: 'supervisor_email', value: eoiBusiness.supervisorEmail },
          ]
        };

        this.http.post(
          environment.hubspot.formSubmissionsUrl +
          environment.hubspot.portalId + '/' +
          environment.hubspot.eoiBusinessFormGuid,
          formSubmission)
          .subscribe(response => {
            console.log(response);
          });
      });
  }
}
