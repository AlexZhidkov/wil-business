import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss']
})
export class UniversityComponent implements OnInit {
  todos: Observable<any[]>;
  isLoading: boolean;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.isLoading = true;
    this.todos = this.afs.collection('universities/uwa/todo').valueChanges();
    this.todos.subscribe(() => this.isLoading = false);
  }

}
