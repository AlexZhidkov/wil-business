import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.semesters = [
      { number: 1, dates: 'Semester 1. 25 February - 	24 May' },
      { number: 2, dates: 'Semester 2. 29 July - 25 October' },
      { number: 3, dates: 'Semester 3. ' },
      { number: 4, dates: 'Semester 4. ' }
    ];

    this.jobFormGroup = this.formBuilder.group({
      jobTitleCtrl: ['', Validators.required],
      jobDescriptionCtrl: ['', Validators.required],
      skillsCtrl: [''],
      clearanceCtrl: ['']
    });
    this.employerFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.required],
      websiteCtrl: [''],
      primaryContactCtrl: ['', Validators.required],
      addressCtrl: [''],
      aboutCtrl: ['', Validators.required]
    });
    this.datesFormGroup = this.formBuilder.group({
      jobCtrl: ['', Validators.required],
      skillsCtrl: [''],
      clearanceCtrl: ['']
    });
    this.supervisorFormGroup = this.formBuilder.group({
      supervisorCtrl: ['', Validators.required],
      supervisorRoleCtrl: [''],
      supervisorExperienceCtrl: [''],
      supervisorPhoneCtrl: ['', Validators.required],
      supervisorEmailCtrl: ['', Validators.required]
    });
  }
}
