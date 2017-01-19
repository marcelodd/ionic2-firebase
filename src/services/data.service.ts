import { Injectable } from '@angular/core';

import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class DataService {

    constructor(
        private af: AngularFire
    ) { }

    getObject(path: string): FirebaseObjectObservable<any>{
        return this.af.database.object(path);
    }
}