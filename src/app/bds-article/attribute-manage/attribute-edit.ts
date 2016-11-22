import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'attribute-edit',
    templateUrl: './attribute-edit.html',
    styleUrls: ['./attribute-manage.component.css']
})
export class AttributeEdit{

    attr_form: FormGroup;

    constructor(fb: FormBuilder){
        this.attr_form = fb.group({
            name: ['', [<any>Validators.required]],
            label: ['', [<any>Validators.required]],
            type: ['', [<any>Validators.required]],
            block_id: ['',[<any>Validators.required]],
            allow_null: [false],
            seq: ['', [<any>Validators.required]]
        })
    }
}