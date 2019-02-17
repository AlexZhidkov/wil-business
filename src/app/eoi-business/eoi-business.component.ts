import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { EoiBusiness } from '../model/eoi-business';
import { EoiBusinessService } from '../services/eoi-business.service';

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
  semesters: Semester[];
  jobFormGroup: FormGroup;
  employerFormGroup: FormGroup;
  datesFormGroup: FormGroup;
  supervisorFormGroup: FormGroup;

  projectId: string;
  isNewProject: boolean;
  eoiDoc: AngularFirestoreDocument<EoiBusiness>;
  eoi: Observable<EoiBusiness>;
  isLoading: boolean;
  previouslySubmittedEois: Observable<EoiBusiness[]>;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private eoiBusinessService: EoiBusinessService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.isNewProject = (this.route.snapshot.paramMap.get('isNewProject') === 'true');
    this.semesters = [
      { number: 1, dates: 'Semester 1. 25 February - 	24 May' },
      { number: 2, dates: 'Semester 2. 29 July - 25 October' },
      { number: 3, dates: 'Semester 3. ' },
      { number: 4, dates: 'Semester 4. ' }
    ];

    this.eoiBusinessService.setCollection('/users/GOXQ9lHQgCWKtSPJJIzWVavzLmO2/eoiBusiness');
    this.previouslySubmittedEois = this.eoiBusinessService.list();

    if (this.isNewProject) {
      this.afs.collection<EoiBusiness>('/users/GOXQ9lHQgCWKtSPJJIzWVavzLmO2/eoiBusiness')
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
          this.eoiDoc = this.afs.doc<EoiBusiness>('/users/GOXQ9lHQgCWKtSPJJIzWVavzLmO2/eoiBusiness/' + r.id);
          this.bindFormControls();
        });
    } else {
      this.eoiDoc = this.afs.doc<EoiBusiness>('/users/GOXQ9lHQgCWKtSPJJIzWVavzLmO2/eoiBusiness/UftNbaUVO8okK26VZOhi/');
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
}
