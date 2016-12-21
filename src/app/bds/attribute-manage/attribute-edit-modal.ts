import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { AttributeService } from './attribute.service';
import { HttpService } from './http.service';
import { Attribute, Block } from './interfaces';
import { bodauTiengViet, SpinnerService } from './../../shared';

export class AttributeModalData extends BSModalContext {
	public attr: Attribute;
    public block: Block;
}

@Component({
    selector: 'attribute-edit-modal',
    templateUrl: './attribute-edit-modal.html',
    styleUrls: ['./attribute-manage.component.css'],
    providers: [HttpService,AttributeService]
})
export class AttributeEditModal implements OnInit, OnDestroy, ModalComponent<AttributeModalData>
{
    private context: AttributeModalData;
    private attr_form: FormGroup;
    private form_title: string = "Add new attribute";

    constructor(
        fb: FormBuilder, 
        private _spinnerService: SpinnerService,
        public dialog: DialogRef<AttributeModalData>,
        private toasterService: ToasterService, 
        private _httpService: HttpService,
        private _attributeService: AttributeService){

        this.context = dialog.context;
        
        this.attr_form = fb.group({
            name: ['', Validators.required],
            label: ['', Validators.required],
            type: ['', Validators.required],
            block_id: ['',[Validators.required]],
            attr_id: [''],
            is_custom: [true],
            allow_null: [false],
            seq: ['']
        });

        if(this.context.attr) {
            const attr = this.context.attr;
            this.attr_form.patchValue({
                name: attr.name,
                label: attr.label,
                type: attr.type,
                block_id: this.context.block.block_id,
                attr_id: attr.attr_id,
                allow_null: attr.allow_null,
                is_custom: attr.is_custom,
                seq: attr.seq
            });
            this.form_title = "Edit attribute";
        }else {
            this.attr_form.reset();
            this.attr_form.patchValue({
                block_id: this.context.block.block_id,
                is_custom: true,
                type: '',
            });
            this.form_title = "Add new attribute";
        }
    }

    ngOnInit()
    {
        this._attributeService.saveAnnounced.subscribe((data: Attribute) => {
            this._spinnerService.start("Saving...");
            this._httpService.saveAttribute(data).subscribe((result: { success: boolean, blocks: Block[], message: string }) => {
                this._spinnerService.stop();
                if (result.success){
                    this.dialog.close({blocks:result.blocks});
                }
                else
                    this.toasterService.pop('error', 'Error', result.message);
            });
        });

        this._attributeService.deleteAnnounced.subscribe(attr_id => {
            if (confirm("Are you sure to delete this attribute?")) {
                this._httpService.deleteAttribute(attr_id).subscribe((result: { success: boolean, blocks: Block[], message: string }) => {
                    if (result.success) {
                        this.dialog.close({blocks:result.blocks});
                        this.toasterService.pop('success', 'Delete successfully', result.message);
                        // this._attributeService.doneAnnounce('attr_deleted');
                    }
                    else
                        this.toasterService.pop('error', 'Error', result.message);
                });
            }
        });
    }

    ngOnDestroy(){
        // this.subscription1.unsubscribe();
        // this.subscription2.unsubscribe();

        // TODO: unsubscribe all subscribers
        console.log("Modal destroyed");
    }

    triggerSave()
    {
        if(!this.attr_form.value.name && this.attr_form.value.label){
            this.attr_form.controls['name'].setValue(this.convertStringToName(this.attr_form.value.label));
            this.attr_form.updateValueAndValidity();
        }
        console.log(this.attr_form.errors);
        if(this.attr_form.valid){
            // console.log("Form valid and prepare to save");
            this._attributeService.saveAnnounce(this.attr_form.value);
        }else{
            console.log("Form invalid", this.attr_form.errors,this.attr_form.value);
        }
    }

    triggerCloseModal() {
        this.dialog.close('Modal closed');
    }

    triggerDeleteAttribute()
    {
        if(this.attr_form.value.attr_id){
            this._attributeService.deleteAnnounce(this.attr_form.value.attr_id);
        }
    }

    private convertStringToName(str: string): string{
        str = bodauTiengViet(str);
        str = str.replace(/ /g, '_');
        return str;
    }
}