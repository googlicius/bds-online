import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Attribute, Block } from './interfaces';

Injectable()
export class AttributeService
{
    private saveSource: Subject<any> = new Subject<any>();
    private editSource: Subject<any> = new Subject<any>();
    private deleteSource: Subject<any> = new Subject<any>();
    private doneSource: Subject<any> = new Subject<any>();

    saveAnnounced = this.saveSource.asObservable();
    editAnnounced = this.editSource.asObservable();
    deleteAnnounced = this.deleteSource.asObservable();
    doneAnnounced = this.doneSource.asObservable();

    saveAnnounce(data: any){
        this.saveSource.next(data);
    }

    editAnnounce(block: Block, attr?: Attribute){
        this.editSource.next({block: block, attr: attr});
    }

    deleteAnnounce(id: number){
        this.deleteSource.next(id);
    }

    doneAnnounce(type: string){
        this.doneSource.next(type);
    }
}