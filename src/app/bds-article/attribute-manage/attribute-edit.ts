import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { AttributeService } from './attribute.service';
import { Attribute, Block } from './interfaces';
import { bodauTiengViet } from './../../shared';

@Component({
    selector: 'attribute-edit',
    templateUrl: './attribute-edit.html',
    styleUrls: ['./attribute-manage.component.css']
})
export class AttributeEdit implements OnInit, OnDestroy
{
    private attr_form: FormGroup;
    private attr_form_active: boolean = false;
    private form_title = "Add new attribute";
    private subscription: Subscription;

    constructor(fb: FormBuilder, private _attributeService: AttributeService){
        this.attr_form = fb.group({
            name: ['', Validators.required],
            label: ['', Validators.required],
            type: ['', Validators.required],
            block_id: ['',[Validators.required]],
            attr_id: [''],
            is_custom: [true],
            allow_null: [false],
            seq: ['']
        })

        this.subscription = _attributeService.editAnnounced.subscribe((data: {block: Block, attr: Attribute}) => {
            this.attr_form_active = true;
            if(typeof data.attr != 'undefined'){
                let attr = data.attr;
                this.attr_form.patchValue({
                    name: attr.name,
                    label: attr.label,
                    type: attr.type,
                    block_id: data.block.block_id,
                    attr_id: attr.attr_id,
                    allow_null: attr.allow_null,
                    is_custom: attr.is_custom,
                    seq: attr.seq
                });
                console.log("Edit attribute");
                this.form_title = "Edit attribute";
            }else{
                this.attr_form.reset();
                this.attr_form.patchValue({
                    block_id: data.block.block_id,
                    is_custom: true,
                });
                this.form_title = "Add new attribute";
            }
        });
    }

    ngOnInit(){

    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

    triggerSave()
    {
        if(!this.attr_form.value.name && this.attr_form.value.label){
            this.attr_form.controls['name'].setValue(this.convertStringToName(this.attr_form.value.label));
            this.attr_form.updateValueAndValidity();
        }
        console.log(this.attr_form.errors);
        if(this.attr_form.valid){
            console.log("Form valid and prepare to save");
            this._attributeService.saveAnnounce(this.attr_form.value);
        }else{
            console.log("Form invalid", this.attr_form.errors,this.attr_form.value);
        }
    }

    private convertStringToName(str: string): string{
        str = bodauTiengViet(str);
        str = str.replace(/ /g, '_');
        return str;
    }
}