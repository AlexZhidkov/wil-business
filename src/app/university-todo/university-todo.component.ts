import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-university-todo',
  templateUrl: './university-todo.component.html',
  styleUrls: ['./university-todo.component.scss']
})
export class UniversityTodoComponent implements OnInit {
  todoId: string;
  isLoading: boolean;
  private todoDoc: AngularFirestoreDocument<any>;
  todo: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    public afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.paramMap.get('id');
    this.todoDoc = this.afs.doc<any>('universities/uwa/todo/' + this.todoId);
    this.todo = this.todoDoc.valueChanges();
    this.todo.subscribe(() => this.isLoading = false);
  }

}
