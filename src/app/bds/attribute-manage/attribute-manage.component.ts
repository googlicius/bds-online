import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import { Overlay, overlayConfigFactory, DialogRef } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { HttpService } from './http.service';
import { AttributeService } from './attribute.service';
import { Attribute, Block } from './interfaces';
import { AuthHttp, urlEncode, SpinnerService } from './../../shared';
import { AttributeEditModal } from './attribute-edit-modal';

@Component({
    selector: 'app-attribute-manage',
    templateUrl: './attribute-manage.component.html',
    styleUrls: ['./attribute-manage.component.css'],
    providers: [HttpService,AttributeService]
})
export class AttributeManageComponent implements OnInit, OnDestroy {

    blocks: Block[];
    attr_to_edit: Attribute;
    block_form: FormGroup;
    private block_form_open: boolean = false;

    constructor(
        private _httpService: HttpService,
        private _attributeService: AttributeService,
        private _activatedRoute: ActivatedRoute,
        private _fb: FormBuilder,
        private http: AuthHttp,
        private _spinnerService: SpinnerService,
        private _dragulaService: DragulaService,
        private toasterService: ToasterService,
        private _modal: Modal,
        overlay: Overlay,
        vcRef: ViewContainerRef) {

        overlay.defaultViewContainer = vcRef;

        _dragulaService.setOptions('bag-block', {
            moves: function (el, source, handle, sibling) {
                let classes: string[] = handle.className.split(' ');
                let fa_arrows = classes.filter(class_name => {
                    return class_name == 'fa-arrows';
                });
                return fa_arrows[0] == 'fa-arrows';
            },
        });

        this.block_form = _fb.group({
            name: ['', Validators.required],
            seq: [],
            block_id: [],
        });
    }

    ngOnInit() 
    {
        // Getting data resolved from router
        let blocks_res = this._activatedRoute.snapshot.data['blocks'];
        this.blocks = blocks_res.blocks;

        // Subscribe to delete event
        this._attributeService.deleteAnnounced.subscribe(block_id => {
            if (confirm("Are you sure to delete this block?")) {
                this._httpService.deleteBlock(block_id).subscribe((result: { success: boolean, blocks: Block[], message: string }) => {
                    if (result.success) {
                        this.blocks = result.blocks;
                    } else {
                        this.toasterService.pop('error', 'Error', result.message);
                    }
                });
            }
        });

        // Subscribe to save event
        this._attributeService.saveAnnounced.subscribe(data => {
            this._spinnerService.start("Saving...");
            this._httpService.saveBlock(data).subscribe((result: { success: boolean, blocks: Block[], message: string }) => {
                if (result.success) {
                    this.blocks = result.blocks;
                }
                else {
                    this.toasterService.pop('error', 'Error', result.message);
                }
                this.block_form_open = false;
                this._spinnerService.stop();
            });
        })
    }

    ngOnDestroy(){
        this._dragulaService.destroy('bag-block');
        this._dragulaService.destroy('bag-attribute');
    }

    triggerOpenEditAttributeModal(block: Block, attr: Attribute) {
        console.log(attr);
        this._attributeService.editAnnounce(block, attr);
        this.attr_to_edit = attr;

        this._modal.open(AttributeEditModal, overlayConfigFactory({ block, attr }, BSModalContext))
            .then(resultPromise => resultPromise.result)
            .then((result: {blocks: Block[]}) => {
                if(result && result.blocks)
                    this.blocks = result.blocks;
            });
    }

    triggerAddNewAttribute(block) {
        this._attributeService.editAnnounce(block);
    }

    triggerAddNewBlock() {
        this.block_form_open = true;
        this.block_form.reset();
    }

    triggerSaveBlock() {
        if (this.block_form.valid) {
            console.log(this.block_form.value);
            this._attributeService.saveAnnounce(this.block_form.value)
        } else {
            console.log("Could not save", this.block_form.errors);
        }
    }

    triggerOpenEditBlock(block: Block) {
        block.edit = true;
        this.block_form.patchValue({
            name: block.name,
            seq: block.seq,
            block_id: block.block_id,
        });
    }

    triggerCancelEditBlock(block: Block) {
        block.edit = false;
    }

    triggerDeleteBlock(block: Block) {
        this._attributeService.deleteAnnounce(block.block_id);
    }
}
