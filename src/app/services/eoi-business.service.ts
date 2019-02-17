import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { EoiBusiness } from '../model/eoi-business';

@Injectable()
export class EoiBusinessService extends BaseService<EoiBusiness> {
  firestorePath: string;
  constructor(afs: AngularFirestore) {
    super(afs);
  }

  assignCollection(path: string) {
    this.firestorePath = path;
    this.setCollection(this.firestorePath);
  }
}
