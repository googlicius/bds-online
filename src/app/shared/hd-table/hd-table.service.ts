import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class HdTableService{

    private requestedSource = new Subject<any>();
    private handledSource = new Subject<any>();
    private checkListSource = new Subject<any>();

    requestDataAnnounced$ = this.requestedSource.asObservable();
    returnDataAnnounced$ = this.handledSource.asObservable();
    checkListChangeAnnounced$ = this.checkListSource.asObservable();

    // Children component request data table from parent
    announceRequestData(query: any){
        this.requestedSource.next(query);
    }

    // Parent load data from server and send it back to Children
    announceReturnData(data: any){
        this.handledSource.next(data);
    }

    // Change check list
    announceCheckListChange(check_list:any){
        this.checkListSource.next(check_list);
    }
}