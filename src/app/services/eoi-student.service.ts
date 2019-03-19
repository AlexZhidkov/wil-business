import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { EoiBusiness } from '../model/eoi-business';

@Injectable()
export class EoiStudentService extends BaseService<EoiBusiness> {
  eoiStudentPath: string;
  constructor(afs: AngularFirestore) {
    super(afs);
  }

  setEoiStudentPath( eoiStudentPath: string) {
    this.eoiStudentPath = eoiStudentPath;
  }

  getEoiStudentPath(): string {
    return this.eoiStudentPath;
  }
}
