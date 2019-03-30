import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-university-todo',
  templateUrl: './university-todo.component.html',
  styleUrls: ['./university-todo.component.scss']
})
export class UniversityTodoComponent implements OnInit {
  todoId: string;
  isLoading: boolean;
  private todoDoc: AngularFirestoreDocument<any>;
  todo: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.paramMap.get('id');
    this.todoDoc = this.afs.doc<any>('universities/uwa/todo/' + this.todoId);
    this.todoDoc.valueChanges().subscribe(doc => {
      this.todo = doc;
      this.isLoading = false;
    });
  }

  approveEoiBusiness() {
    this.todo.eoiBusiness.approvedByUniOn = new Date();
    this.afs.collection<any>('projects')
      .add(this.todo.eoiBusiness);
    this.router.navigateByUrl('/university');
  }

  rejectEoiBusiness() {
    this.todo.rejectedOn = new Date();
    this.afs.collection<any>('universities/uwa/rejectedEoiBusiness')
      .add(this.todo)
      .then(() => this.todoDoc.delete());
    this.router.navigateByUrl('/university');
  }
}
