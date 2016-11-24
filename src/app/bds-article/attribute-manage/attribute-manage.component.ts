import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import { AttributeService } from './attribute.service';
import { Attribute, Block } from './interfaces';
import { AuthHttp, urlEncode, SpinnerService } from './../../shared';

@Component({
    selector: 'app-attribute-manage',
    templateUrl: './attribute-manage.component.html',
    styleUrls: ['./attribute-manage.component.css'],
    providers: [AttributeService]
})
export class AttributeManageComponent implements OnInit {

    blocks: Block[];
    attr_to_edit: Attribute;
    block_form: FormGroup;
    private block_form_open: boolean = false;

    constructor(
        private _attributeService: AttributeService,
        private _activatedRoute: ActivatedRoute, 
        private _fb: FormBuilder, 
        private http: AuthHttp, 
        private _spinnerService: SpinnerService,
        private toasterService: ToasterService) {

        _attributeService.saveAnnounced.subscribe((data: Attribute) => {
            _spinnerService.start("Saving...");
            this.saveAttribute(data).subscribe((result: {success: boolean, blocks: Block[],message: string}) => {
                _spinnerService.stop();
                if(result.success)
                    this.blocks = result.blocks;
                else
                    this.toasterService.pop('error', 'Error', result.message);
            });
        });

        _attributeService.deleteAnnounced.subscribe(attr_id => {
            if(confirm("Are you sure to delete this attribute?")){
                this.deleteAttribute(attr_id).subscribe((result: {success: boolean, blocks: Block[], message: string}) => {
                    if(result.success){
                        this.blocks = result.blocks;
                        this.toasterService.pop('success', 'Delete successfully', result.message);
                        _attributeService.doneAnnounce('attr_deleted');
                    }
                    else
                        this.toasterService.pop('error', 'Error', result.message);
                });
            }
        });

        this.block_form = _fb.group({
            name: ['',Validators.required],
            seq: [],
            block_id: [],
        });
    }

    ngOnInit() {

        let blocks_res = this._activatedRoute.snapshot.data['blocks'];

        this.blocks = blocks_res.blocks;

        this.toasterService.pop('success', 'Title', 'Popup content');
    }

    triggerEditAttribute(block: Block, attr: Attribute){
        console.log(attr);
        this._attributeService.editAnnounce(block,attr);
        this.attr_to_edit = attr;
    }

    triggerAddNewAttribute(block){
        this._attributeService.editAnnounce(block);
    }

    triggerAddNewBlock(){
        this.block_form_open = true;
        this.block_form.reset();
    }

    triggerSaveBlock(){
        if(this.block_form.valid){
            console.log(this.block_form.value);
            this._spinnerService.start("Saving...");

            this.saveBlock(this.block_form.value).subscribe((result: {success: boolean, blocks: Block[], message: string}) => {
                if(result.success){
                    this.blocks = result.blocks;
                }
                else{
                    this.toasterService.pop('error', 'Error', result.message);
                }
                this.block_form_open = false;
                this._spinnerService.stop();
            });
        }else{
            console.log("Could not save", this.block_form.errors);
        }
    }

    triggerEditBlock(block: Block){
        block.edit = true;
        this.block_form.patchValue({
            name: block.name,
            seq: block.seq,
            block_id: block.block_id,
        });
    }

    triggerCancelEditBlock(block: Block){
        block.edit = false;
    }

    triggerDeleteBlock(block: Block){
        if(confirm("Are you sure to delete this block?")){
            this.deleteBlock(block.block_id).subscribe((result: {success: boolean, blocks: Block[], message: string}) => {
                if(result.success){
                    this.blocks = result.blocks;
                }else{
                    this.toasterService.pop('error', 'Error', result.message);
                }
            });
        }
    }

    saveBlock(value): Observable<any>{
		return this.http.post('/block/save-block', value).map((response: Response) => {
			return response.json();
		});
	}

    saveAttribute(attr: Attribute): Observable<any>
    {
        return this.http.post('/attribute/save-attribute', attr).map((response: Response) => {
            return response.json();
        });
    }

    deleteBlock(block_id): Observable<any>{
        return this.http.post('/block/delete-block', {block_id: block_id}).map((response: Response) => {
            return response.json();
        });
	}

    deleteAttribute(attr_id): Observable<any>{
        return this.http.post('/attribute/delete-attribute', {attr_id: attr_id}).map((response: Response) => {
            return response.json();
        });
	}
}
