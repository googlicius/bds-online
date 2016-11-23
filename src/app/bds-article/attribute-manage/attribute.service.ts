import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Attribute, Block } from './interfaces';

Injectable()
export class AttributeService{
    private saveSource: Subject<any> = new Subject<any>();
    private editSource: Subject<any> = new Subject<any>();

    saveAnnounced = this.saveSource.asObservable();
    editAnnounced = this.editSource.asObservable();

    saveAnnounce(data: Attribute){
        this.saveSource.next(data);
    }

    editAnnounce(block: Block, attr?: Attribute){
        this.editSource.next({block: block, attr: attr});
    }
}