import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Observable<any[]>;
  isLoading: boolean;

  constructor(private afs: AngularFirestore) {
    this.projects = afs.collection('projects').valueChanges();
  }

  ngOnInit() {
    this.isLoading = true;
    this.projects.subscribe(e => {
      this.isLoading = false;
    });
  }
}
